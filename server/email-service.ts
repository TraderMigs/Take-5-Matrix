import sgMail from '@sendgrid/mail';
import crypto from 'crypto';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export async function sendVerificationEmail(
  to: string,
  username: string,
  token: string,
  baseUrl: string
): Promise<boolean> {
  const verificationUrl = `${baseUrl}/verify-email?token=${token}`;
  
  const msg = {
    to,
    from: 'tradermigs@gmail.com', // Use your verified sender
    subject: 'Verify Your Email - Take 5 Mental Wellness',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email - Take 5</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Take 5</h1>
          <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Mental Wellness Support</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
          <h2 style="color: #333; margin-top: 0;">Welcome to Take 5, ${username}!</h2>
          
          <p>Thank you for joining our mental wellness community. To get started with all features including:</p>
          
          <ul style="margin: 20px 0; padding-left: 20px;">
            <li><strong>AI Chat Support</strong> - Compassionate conversations when you need them</li>
            <li><strong>Private Journaling</strong> - Secure space for your thoughts and feelings</li>
            <li><strong>Emergency Features</strong> - Quick access to crisis support</li>
            <li><strong>Personalized Tools</strong> - Breathing exercises and wellness resources</li>
          </ul>
          
          <p>Please verify your email address by clicking the button below:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background: #28a745; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              Verify My Email Address
            </a>
          </div>
          
          <p style="font-size: 14px; color: #666;">
            If the button doesn't work, you can copy and paste this link into your browser:<br>
            <a href="${verificationUrl}" style="color: #667eea; word-break: break-all;">${verificationUrl}</a>
          </p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e9ecef;">
          
          <p style="font-size: 12px; color: #666; margin: 0;">
            This verification link will expire in 24 hours. If you didn't create an account with Take 5, you can safely ignore this email.
          </p>
          
          <p style="font-size: 12px; color: #666; margin: 10px 0 0 0;">
            Take 5 Mental Wellness | Support: tradermigs@gmail.com
          </p>
        </div>
      </body>
      </html>
    `,
    text: `
      Welcome to Take 5, ${username}!
      
      Thank you for joining our mental wellness community. To get started with all features, please verify your email address.
      
      Click this link to verify: ${verificationUrl}
      
      This link will expire in 24 hours. If you didn't create an account with Take 5, you can safely ignore this email.
      
      Take 5 Mental Wellness
      Support: tradermigs@gmail.com
    `
  };

  try {
    await sgMail.send(msg);
    console.log(`Verification email sent to ${to}`);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    if (error.response) {
      console.error('SendGrid response body:', error.response.body);
    }
    return false;
  }
}

export async function sendSignupReportEmail(
  email: string,
  subject: string,
  excelBuffer: Buffer
): Promise<boolean> {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SENDGRID_API_KEY not found - email service not configured');
      return false;
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const currentDate = new Date().toLocaleDateString();
    const emailContent = `
Take 5 App - Weekly Signup Report

Report Generated: ${currentDate}

This Excel spreadsheet contains:
- All Users: Complete list of all registered users
- New This Week: Users who signed up in the past 7 days  
- Summary: Key metrics and statistics

The spreadsheet includes:
- User ID
- Email address
- First and last name
- Username
- Country of origin
- Signup date and time

This report is automatically generated every Monday at 9:00 AM.

Best regards,
Take 5 App System
    `;

    const msg = {
      to: email,
      from: 'tradermigs@gmail.com',
      subject: subject,
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>'),
      attachments: [
        {
          content: excelBuffer.toString('base64'),
          filename: `Take5_Weekly_Signup_Report_${currentDate.replace(/\//g, '-')}.xlsx`,
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          disposition: 'attachment'
        }
      ]
    };

    await sgMail.send(msg);
    console.log('Weekly signup report email sent successfully');
    return true;
  } catch (error) {
    console.error('SendGrid signup report email error:', error);
    if (error.response) {
      console.error('SendGrid response body:', error.response.body);
    }
    return false;
  }
}

export async function sendWelcomeEmail(
  to: string,
  username: string
): Promise<boolean> {
  const msg = {
    to,
    from: 'tradermigs@gmail.com',
    subject: 'Welcome to Take 5 - Your Mental Wellness Journey Begins',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Take 5</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🌟 Welcome to Take 5!</h1>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
          <h2 style="color: #333; margin-top: 0;">You're all set, ${username}! 🎉</h2>
          
          <p>Your email has been verified and you now have full access to all Take 5 features. We're here to support you on your mental wellness journey.</p>
          
          <div style="background: white; padding: 20px; border-left: 4px solid #28a745; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold; color: #28a745;">Remember: Take 5 is for support and wellness, not medical treatment. In a crisis, please contact emergency services immediately.</p>
          </div>
          
          <p>Take care of yourself, and remember - you're not alone.</p>
          
          <p style="font-size: 12px; color: #666; margin-top: 30px;">
            Take 5 Mental Wellness | Support: tradermigs@gmail.com
          </p>
        </div>
      </body>
      </html>
    `
  };

  try {
    await sgMail.send(msg);
    console.log(`Welcome email sent to ${to}`);
    return true;
  } catch (error) {
    console.error('SendGrid welcome email error:', error);
    return false;
  }
}

export async function sendTokenUsageEmail(
  email: string,
  subject: string,
  htmlContent: string
): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('SENDGRID_API_KEY not found, skipping token usage email');
    return false;
  }

  const msg = {
    to: email,
    from: 'reports@take5.app',
    subject,
    html: htmlContent,
  };

  try {
    await sgMail.send(msg);
    console.log(`Token usage report sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Error sending token usage report:', error);
    return false;
  }
}