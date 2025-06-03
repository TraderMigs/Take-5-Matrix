import { OAuth2Client } from 'google-auth-library';
import type { Express } from 'express';
import { storage } from './storage';

// Initialize Google OAuth client
let googleClient: OAuth2Client | null = null;

function initializeGoogleAuth() {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.log('Google OAuth not configured - missing CLIENT_ID or CLIENT_SECRET');
    return null;
  }

  // Determine the correct redirect URI based on environment
  let redirectUri;
  if (process.env.REPLIT_DOMAINS) {
    // Production: use the current domain
    const domains = process.env.REPLIT_DOMAINS.split(',');
    // Use the first domain that ends with .replit.app
    const replitDomain = domains.find(d => d.includes('.replit.app')) || domains[0];
    redirectUri = `https://${replitDomain}/api/auth/google/callback`;
  } else {
    // Development
    redirectUri = 'http://localhost:5000/api/auth/google/callback';
  }

  console.log('Google OAuth redirect URI:', redirectUri);

  googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    redirectUri
  );

  return googleClient;
}

export function setupGoogleAuth(app: Express) {
  const client = initializeGoogleAuth();
  
  if (!client) {
    // Set up placeholder routes when OAuth is not configured
    app.get('/api/auth/google', (req, res) => {
      res.status(500).json({ 
        error: 'Google OAuth not configured. Please add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables.' 
      });
    });
    
    app.get('/api/auth/google/callback', (req, res) => {
      res.status(500).json({ 
        error: 'Google OAuth not configured.' 
      });
    });
    return;
  }

  // Start OAuth flow
  app.get('/api/auth/google', (req, res) => {
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ];

    const authUrl = client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'select_account',
      include_granted_scopes: true,
      state: Math.random().toString(36).substring(2, 15)
    });

    console.log('Generated OAuth URL:', authUrl);
    res.redirect(authUrl);
  });

  // Handle OAuth callback
  app.get('/api/auth/google/callback', async (req, res) => {
    try {
      console.log('OAuth callback received:', req.query);
      const { code, error, error_description, state } = req.query;
      
      // Handle OAuth errors from Google
      if (error) {
        console.error('OAuth error from Google:', error, error_description);
        const errorMsg = typeof error_description === 'string' ? error_description : 
                        typeof error === 'string' ? error : 'unknown_error';
        return res.redirect(`/?auth=error&details=${encodeURIComponent(errorMsg)}`);
      }
      
      if (!code || typeof code !== 'string') {
        console.error('Authorization code missing from callback');
        return res.redirect('/?auth=error&details=no_code');
      }

      console.log('Exchanging code for tokens...');
      // Exchange code for tokens
      const { tokens } = await client.getToken(code);
      client.setCredentials(tokens);

      console.log('Verifying ID token...');
      // Get user info
      const ticket = await client.verifyIdToken({
        idToken: tokens.id_token!,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload) {
        console.error('Invalid token payload');
        return res.redirect('/?auth=error&details=invalid_payload');
      }

      console.log('Creating user from Google data...');
      console.log('Google payload:', payload);
      
      // Extract user information
      const googleUser = {
        email: payload.email!,
        username: payload.email!.split('@')[0], // Use email prefix as username
        displayName: payload.name || payload.email!.split('@')[0],
        profileImage: payload.picture,
        dateOfBirth: new Date().toISOString().split('T')[0], // Default date, user can update later
      };

      console.log('Generated user data:', googleUser);

      // Check if user already exists by email first
      let user = await storage.getUserByEmail(googleUser.email);
      console.log('Existing user by email:', user);
      
      if (!user) {
        // Check by username
        const existingByUsername = await storage.getUserByUsername(googleUser.username);
        console.log('Existing user by username:', existingByUsername);
        
        if (existingByUsername) {
          // Username conflict - append random suffix
          googleUser.username = googleUser.username + '_' + Math.random().toString(36).substring(2, 8);
          console.log('Username conflict resolved, new username:', googleUser.username);
        }
        
        // Create new user with email already verified (Google verified it)
        console.log('Creating new user with data:', googleUser);
        user = await storage.createUser({
          email: googleUser.email,
          username: googleUser.username,
          password: 'oauth_google_' + Math.random().toString(36), // Random password for OAuth users
          dateOfBirth: googleUser.dateOfBirth,
          displayName: googleUser.displayName,
          profileImage: googleUser.profileImage,
          emailVerified: true, // Google OAuth users are pre-verified
        });
        console.log('Created user:', user);
        
        // Send welcome email for new Google OAuth users
        try {
          const { sendWelcomeEmail } = await import('./email-service');
          await sendWelcomeEmail(user.email, user.displayName || user.username);
          console.log('Welcome email sent to new Google OAuth user');
        } catch (error) {
          console.error('Failed to send welcome email:', error);
        }
      } else {
        console.log('User already exists, using existing user');
        // Mark existing Google OAuth users as email verified if not already
        if (!user.emailVerified) {
          await storage.updateUserProfile(user.id, { emailVerified: true });
          user.emailVerified = true;
        }
      }

      console.log('OAuth success, creating session and redirecting...');
      
      // Create server-side session instead of passing user data via URL
      const session = await storage.createSession(user.id);
      
      // Set session data and save it
      req.session = req.session || {};
      (req.session as any).sessionId = session.id;
      (req.session as any).userId = user.id;
      (req.session as any).userData = user;
      
      console.log('Setting session data:', { sessionId: session.id, userId: user.id });
      
      // Force session save before redirect
      req.session.save((err) => {
        if (err) {
          console.error('Session save error:', err);
          return res.redirect('/?auth=error&details=session_error');
        }
        console.log('Session saved successfully, redirecting...');
        res.redirect('/?auth=success');
      });
    } catch (error) {
      console.error('Google OAuth error:', error);
      const errorMsg = error instanceof Error ? error.message : 'unknown_error';
      res.redirect(`/?auth=error&details=${encodeURIComponent(errorMsg)}`);
    }
  });
}