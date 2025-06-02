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
    // Production: use the first domain from REPLIT_DOMAINS
    const domain = process.env.REPLIT_DOMAINS.split(',')[0];
    redirectUri = `https://${domain}/api/auth/google/callback`;
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
      state: 'state_parameter_passthrough_value'
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
        return res.redirect(`/?auth=error&details=${encodeURIComponent(error_description || error)}`);
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
      // Extract user information
      const googleUser = {
        email: payload.email!,
        username: payload.email!.split('@')[0], // Use email prefix as username
        displayName: payload.name || payload.email!.split('@')[0],
        profileImage: payload.picture,
        dateOfBirth: new Date().toISOString().split('T')[0], // Default date, user can update later
      };

      // Check if user already exists
      let user = await storage.getUserByUsername(googleUser.username);
      
      if (!user) {
        // Create new user
        user = await storage.createUser({
          email: googleUser.email,
          username: googleUser.username,
          password: 'oauth_google_' + Math.random().toString(36), // Random password for OAuth users
          dateOfBirth: googleUser.dateOfBirth,
          displayName: googleUser.displayName,
          profileImage: googleUser.profileImage,
        });
      }

      console.log('OAuth success, redirecting to frontend...');
      // Redirect to frontend with success
      res.redirect(`/?auth=success&user=${encodeURIComponent(JSON.stringify(user))}`);
    } catch (error) {
      console.error('Google OAuth error:', error);
      res.redirect(`/?auth=error&details=${encodeURIComponent(error.message)}`);
    }
  });
}