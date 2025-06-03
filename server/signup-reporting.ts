import { storage } from "./storage";
import { sendSignupReportEmail } from "./email-service";
import * as XLSX from 'xlsx';
import { users } from "@shared/schema";
import { db } from "./db";
import { gte, and, desc } from "drizzle-orm";
import fs from 'fs';
import path from 'path';

// Helper function to get week start date (Sunday)
function getWeekStart(date: Date): Date {
  const weekStart = new Date(date);
  weekStart.setDate(date.getDate() - date.getDay());
  weekStart.setHours(0, 0, 0, 0);
  return weekStart;
}

interface UserSignupData {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  username: string;
  country: string | null;
  createdAt: Date;
}

export async function generateWeeklySignupReport(): Promise<{ buffer: Buffer; filename: string }> {
  try {
    // Get all users ordered by signup date
    const allUsers = await db
      .select({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        username: users.username,
        country: users.country,
        createdAt: users.createdAt,
        signupTimestamp: users.signupTimestamp,
      })
      .from(users)
      .orderBy(desc(users.signupTimestamp));

    // Prepare data for Excel with detailed timestamp information
    const excelData = allUsers.map((user, index) => {
      const signupDate = user.signupTimestamp || user.createdAt;
      return {
        'Row #': index + 1,
        'User ID': user.id,
        'Email': user.email,
        'First Name': user.firstName || 'Not provided',
        'Last Name': user.lastName || 'Not provided',
        'Username': user.username,
        'Country': user.country || 'Not provided',
        'Signup Date': signupDate.toLocaleDateString('en-US'),
        'Signup Time': signupDate.toLocaleTimeString('en-US'),
        'Full Timestamp': signupDate.toISOString(),
        'Signup Week': `Week of ${getWeekStart(signupDate).toLocaleDateString('en-US')}`,
        'Day of Week': signupDate.toLocaleDateString('en-US', { weekday: 'long' }),
        'UTC Timestamp': signupDate.toUTCString(),
      };
    });

    // Get new signups from the past week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const newSignups = allUsers.filter(user => {
      const signupDate = user.signupTimestamp || user.createdAt;
      return signupDate >= oneWeekAgo;
    });

    // Create workbook with multiple sheets
    const workbook = XLSX.utils.book_new();

    // All Users sheet
    const allUsersSheet = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.book_append_sheet(workbook, allUsersSheet, 'All Users');

    // New Signups This Week sheet with detailed timestamp information
    const newSignupsData = newSignups.map((user, index) => {
      const signupDate = user.signupTimestamp || user.createdAt;
      return {
        'Row #': index + 1,
        'User ID': user.id,
        'Email': user.email,
        'First Name': user.firstName || 'Not provided',
        'Last Name': user.lastName || 'Not provided',
        'Username': user.username,
        'Country': user.country || 'Not provided',
        'Signup Date': signupDate.toLocaleDateString('en-US'),
        'Signup Time': signupDate.toLocaleTimeString('en-US'),
        'Full Timestamp': signupDate.toISOString(),
        'Signup Week': `Week of ${getWeekStart(signupDate).toLocaleDateString('en-US')}`,
        'Day of Week': signupDate.toLocaleDateString('en-US', { weekday: 'long' }),
        'UTC Timestamp': signupDate.toUTCString(),
        'Days Ago': Math.floor((new Date().getTime() - signupDate.getTime()) / (1000 * 60 * 60 * 24)),
      };
    });

    const newSignupsSheet = XLSX.utils.json_to_sheet(newSignupsData);
    XLSX.utils.book_append_sheet(workbook, newSignupsSheet, 'New This Week');

    // Summary sheet
    const summaryData = [
      { 'Metric': 'Total Users', 'Count': allUsers.length },
      { 'Metric': 'New Signups This Week', 'Count': newSignups.length },
      { 'Metric': 'Report Generated', 'Count': new Date().toLocaleString() },
      { 'Metric': 'Countries Represented', 'Count': new Set(allUsers.map(u => u.country).filter(Boolean)).size },
    ];

    const summarySheet = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');

    // Generate Excel buffer
    const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    
    // Generate filename with timestamp
    const now = new Date();
    const filename = `Take5_Weekly_Signup_Report_${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}.xlsx`;
    
    console.log(`📊 Weekly signup report generated: ${allUsers.length} total users, ${newSignups.length} new this week`);
    
    return { buffer: excelBuffer, filename };
  } catch (error) {
    console.error('Failed to generate weekly signup report:', error);
    throw error;
  }
}

export async function sendWeeklySignupReport(): Promise<{ success: boolean; filePath?: string; downloadUrl?: string }> {
  const timestamp = new Date().toISOString();
  
  try {
    const { buffer: excelBuffer, filename } = await generateWeeklySignupReport();
    
    // Create backup directory if it doesn't exist
    const backupDir = path.join(process.cwd(), 'server', 'backup-reports');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    // Save file locally as backup
    const filePath = path.join(backupDir, filename);
    fs.writeFileSync(filePath, excelBuffer);
    console.log(`📁 [${timestamp}] Backup file saved: ${filePath}`);
    
    // Get current week info for email subject
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay()); // Start of week (Sunday)
    
    const subject = `Take 5 App - Weekly Signup Report - Week of ${weekStart.toLocaleDateString()}`;
    
    try {
      const emailSuccess = await sendSignupReportEmail(
        'tradermigs@gmail.com',
        subject,
        excelBuffer
      );
      
      if (emailSuccess) {
        console.log(`✅ [${timestamp}] Weekly signup report sent successfully to tradermigs@gmail.com`);
        return { success: true, filePath };
      } else {
        throw new Error('Email sending failed - unknown error');
      }
    } catch (emailError: any) {
      console.error(`❌ [${timestamp}] Email sending failed:`, emailError.message || emailError);
      
      // Create download URL for manual access
      const downloadUrl = `/api/download-signup-report/${encodeURIComponent(filename)}`;
      
      console.log(`📄 [${timestamp}] Report available for download at: ${downloadUrl}`);
      console.log(`📁 [${timestamp}] Local backup saved: ${filePath}`);
      
      return { 
        success: false, 
        filePath, 
        downloadUrl 
      };
    }
  } catch (error: any) {
    console.error(`❌ [${timestamp}] Failed to generate/send weekly signup report:`, error.message || error);
    return { success: false };
  }
}

export function setupWeeklySignupReportScheduler(): void {
  // Schedule for every Monday at 9:00 AM
  const scheduleWeeklyReport = () => {
    const now = new Date();
    const nextMonday = new Date();
    
    // Calculate next Monday at 9:00 AM
    const daysUntilMonday = (1 + 7 - now.getDay()) % 7;
    if (daysUntilMonday === 0 && now.getHours() >= 9) {
      // If it's Monday and past 9 AM, schedule for next Monday
      nextMonday.setDate(now.getDate() + 7);
    } else {
      nextMonday.setDate(now.getDate() + daysUntilMonday);
    }
    
    nextMonday.setHours(9, 0, 0, 0);
    
    const timeUntilNext = nextMonday.getTime() - now.getTime();
    
    setTimeout(async () => {
      await sendWeeklySignupReport();
      // Schedule next week's report
      scheduleWeeklyReport();
    }, timeUntilNext);
    
    console.log(`📅 Weekly signup report scheduled for ${nextMonday.toLocaleString()}`);
  };
  
  scheduleWeeklyReport();
  console.log('📊 Weekly signup report scheduler initialized (every Monday at 9 AM)');
}