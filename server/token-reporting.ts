import { storage } from './storage';
import { sendTokenUsageEmail } from './email-service';

interface UserTokenUsage {
  userId: number | null;
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
  totalTokens: number;
  sessionCount: number;
  messageCount: number;
}

// Generate comprehensive daily token usage report
export async function generateDailyTokenReport(date: Date): Promise<string> {
  try {
    const dailyUsage = await storage.getDailyTokenUsage(date);
    
    // Group usage by user
    const userUsageMap = new Map<string, UserTokenUsage>();
    
    dailyUsage.forEach(usage => {
      const userKey = usage.userId ? usage.userId.toString() : 'anonymous';
      const existingUsage = userUsageMap.get(userKey);
      
      if (existingUsage) {
        existingUsage.totalTokens += usage.tokensUsed;
        existingUsage.messageCount += usage.messageCount;
        existingUsage.sessionCount += 1;
      } else {
        userUsageMap.set(userKey, {
          userId: usage.userId,
          firstName: usage.user?.displayName?.split(' ')[0] || '',
          lastName: usage.user?.displayName?.split(' ')[1] || '',
          username: usage.user?.username || 'anonymous',
          email: usage.user?.email || 'anonymous@take5.app',
          totalTokens: usage.tokensUsed,
          sessionCount: 1,
          messageCount: usage.messageCount
        });
      }
    });

    const userUsages = Array.from(userUsageMap.values());
    const totalTokens = userUsages.reduce((sum, user) => sum + user.totalTokens, 0);
    const totalUsers = userUsages.length;
    const totalSessions = userUsages.reduce((sum, user) => sum + user.sessionCount, 0);

    // Generate HTML report
    const reportDate = date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: linear-gradient(135deg, #2D5934, #4A7C59); color: white; padding: 20px; text-align: center; }
        .summary { background: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .stat-box { display: inline-block; background: white; padding: 15px; margin: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; min-width: 150px; }
        .stat-number { font-size: 24px; font-weight: bold; color: #2D5934; }
        .stat-label { color: #666; font-size: 14px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background: #2D5934; color: white; }
        tr:nth-child(even) { background: #f8f9fa; }
        .total-row { background: #2D5934 !important; color: white; font-weight: bold; }
        .footer { text-align: center; color: #666; margin-top: 30px; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Take 5 AI Usage Report</h1>
        <h2>${reportDate}</h2>
      </div>

      <div class="summary">
        <h3>Daily Summary</h3>
        <div class="stat-box">
          <div class="stat-number">${totalUsers}</div>
          <div class="stat-label">Total Users</div>
        </div>
        <div class="stat-box">
          <div class="stat-number">${totalSessions}</div>
          <div class="stat-label">AI Sessions</div>
        </div>
        <div class="stat-box">
          <div class="stat-number">${totalTokens.toLocaleString()}</div>
          <div class="stat-label">Total Tokens</div>
        </div>
        <div class="stat-box">
          <div class="stat-number">$${(totalTokens * 0.00001).toFixed(4)}</div>
          <div class="stat-label">Estimated Cost</div>
        </div>
      </div>

      <h3>User Token Usage Details</h3>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Sessions</th>
            <th>Messages</th>
            <th>Tokens Used</th>
            <th>Est. Cost</th>
          </tr>
        </thead>
        <tbody>
    `;

    // Sort users by token usage (highest first)
    userUsages.sort((a, b) => b.totalTokens - a.totalTokens);

    userUsages.forEach(user => {
      const estimatedCost = (user.totalTokens * 0.00001).toFixed(4);
      html += `
          <tr>
            <td>${user.firstName || '-'}</td>
            <td>${user.lastName || '-'}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.sessionCount}</td>
            <td>${user.messageCount}</td>
            <td>${user.totalTokens.toLocaleString()}</td>
            <td>$${estimatedCost}</td>
          </tr>
      `;
    });

    html += `
          <tr class="total-row">
            <td colspan="6"><strong>TOTAL</strong></td>
            <td><strong>${totalTokens.toLocaleString()}</strong></td>
            <td><strong>$${(totalTokens * 0.00001).toFixed(4)}</strong></td>
          </tr>
        </tbody>
      </table>

      <div class="footer">
        <p>Generated automatically by Take 5 AI Usage Monitoring System</p>
        <p>Report generated at: ${new Date().toLocaleString()}</p>
      </div>
    </body>
    </html>
    `;

    return html;
  } catch (error) {
    console.error('Error generating token report:', error);
    return `<html><body><h1>Error generating report</h1><p>${error.message}</p></body></html>`;
  }
}

// Send daily token usage report
export async function sendDailyTokenReport(date: Date = new Date()): Promise<boolean> {
  try {
    const reportHtml = await generateDailyTokenReport(date);
    const reportDate = date.toLocaleDateString('en-US');
    
    const success = await sendTokenUsageEmail(
      'tradermigs@gmail.com',
      `Take 5 AI Usage Report - ${reportDate}`,
      reportHtml
    );

    if (success) {
      console.log(`✅ Token usage report sent successfully for ${reportDate}`);
    } else {
      console.error(`❌ Failed to send token usage report for ${reportDate}`);
    }

    return success;
  } catch (error) {
    console.error('Error sending daily token report:', error);
    return false;
  }
}

// Schedule twice-daily reports (8 AM and 8 PM)
export function setupTokenReportScheduler(): void {
  const checkTime = () => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    
    // Send report at 8:00 AM and 8:00 PM
    if ((hour === 8 || hour === 20) && minute === 0) {
      const reportDate = hour === 8 ? 
        new Date(now.getTime() - 24 * 60 * 60 * 1000) : // Yesterday for morning report
        now; // Today for evening report
      
      sendDailyTokenReport(reportDate);
    }
  };

  // Check every minute
  setInterval(checkTime, 60 * 1000);
  
  console.log('📊 Token usage report scheduler initialized (8 AM & 8 PM daily)');
}