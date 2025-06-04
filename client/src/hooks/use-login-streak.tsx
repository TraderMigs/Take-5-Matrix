import { useState, useEffect } from 'react';

interface LoginStreakData {
  currentStreak: number;
  lastLoginDate: string;
  totalDays: number;
  lastCelebrationDate?: string;
}

export function useLoginStreak() {
  const [streakData, setStreakData] = useState<LoginStreakData>({
    currentStreak: 1,
    lastLoginDate: '',
    totalDays: 1
  });

  const [showCelebration, setShowCelebration] = useState(false);

  // Load streak data from localStorage
  useEffect(() => {
    const savedStreak = localStorage.getItem('take5_login_streak');
    if (savedStreak) {
      try {
        const parsed = JSON.parse(savedStreak);
        setStreakData(parsed);
      } catch (error) {
        console.error('Error parsing streak data:', error);
      }
    }
  }, []);

  // Check if it's a new day
  const isNewDay = (lastDate: string): boolean => {
    if (!lastDate) return true;
    
    const today = new Date().toDateString();
    const lastLoginDay = new Date(lastDate).toDateString();
    
    return today !== lastLoginDay;
  };

  // Check if celebration should be shown (once per day)
  const shouldShowCelebration = (lastCelebrationDate?: string): boolean => {
    if (!lastCelebrationDate) return true;
    
    const today = new Date().toDateString();
    const lastCelebrationDay = new Date(lastCelebrationDate).toDateString();
    
    return today !== lastCelebrationDay;
  };

  // Check if streak should continue (within 24-48 hours)
  const shouldContinueStreak = (lastDate: string): boolean => {
    if (!lastDate) return false;
    
    const now = new Date();
    const lastLogin = new Date(lastDate);
    const hoursDiff = (now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60);
    
    // Continue streak if login is within 48 hours
    return hoursDiff <= 48;
  };

  const updateLoginStreak = () => {
    const today = new Date().toISOString();
    
    if (isNewDay(streakData.lastLoginDate)) {
      let newStreak = 1;
      
      // If last login was recent enough, continue the streak
      if (streakData.lastLoginDate && shouldContinueStreak(streakData.lastLoginDate)) {
        newStreak = streakData.currentStreak + 1;
      }
      
      const newStreakData: LoginStreakData = {
        currentStreak: newStreak,
        lastLoginDate: today,
        totalDays: streakData.totalDays + 1,
        lastCelebrationDate: streakData.lastCelebrationDate
      };
      
      setStreakData(newStreakData);
      localStorage.setItem('take5_login_streak', JSON.stringify(newStreakData));
      
      // Only show celebration if we haven't shown it today
      if (shouldShowCelebration(streakData.lastCelebrationDate)) {
        setShowCelebration(true);
        // Update the celebration date
        const updatedStreakData = {
          ...newStreakData,
          lastCelebrationDate: today
        };
        setStreakData(updatedStreakData);
        localStorage.setItem('take5_login_streak', JSON.stringify(updatedStreakData));
      }
      
      return newStreak;
    }
    
    return streakData.currentStreak;
  };

  const resetStreak = () => {
    const resetData: LoginStreakData = {
      currentStreak: 1,
      lastLoginDate: new Date().toISOString(),
      totalDays: 1,
      lastCelebrationDate: undefined
    };
    
    setStreakData(resetData);
    localStorage.setItem('take5_login_streak', JSON.stringify(resetData));
  };

  return {
    streakData,
    updateLoginStreak,
    resetStreak,
    showCelebration,
    setShowCelebration
  };
}