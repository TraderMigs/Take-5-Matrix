import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface CelebrationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  dayStreak: number;
  userName?: string;
}

export default function CelebrationPopup({ isOpen, onClose, dayStreak, userName }: CelebrationPopupProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      // Auto-close after 5 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  const createConfettiPiece = (index: number) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98FB98'];
    const color = colors[index % colors.length];
    const delay = Math.random() * 2;
    const duration = 3 + Math.random() * 2;
    const startX = Math.random() * 100;
    
    return (
      <div
        key={index}
        className="absolute w-3 h-3 rounded-full opacity-90 animate-bounce"
        style={{
          backgroundColor: color,
          left: `${startX}%`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
        }}
      />
    );
  };

  if (!isOpen) return null;

  return (
    <>

      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        {/* Confetti */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 50 }, (_, i) => createConfettiPiece(i))}
          </div>
        )}

        {/* Celebration Modal */}
        <div 
          className="relative backdrop-blur-lg rounded-2xl p-8 max-w-sm w-full text-center border-2 border-white/30 shadow-2xl animate-bounce"
          style={{
            background: 'linear-gradient(135deg, rgba(152, 251, 152, 0.9) 0%, rgba(102, 205, 170, 0.9) 50%, rgba(64, 224, 208, 0.9) 100%)',
            boxShadow: '0 0 30px rgba(152, 251, 152, 0.6)'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Celebration Message */}
          <div className="space-y-4">
            <div className="text-3xl">🎉</div>
            
            <h2 
              className="text-2xl font-bold leading-tight"
              style={{ 
                color: '#9370DB',
                textShadow: '1px 1px 0px rgba(255,255,255,0.5)'
              }}
            >
              Yay! I love that<br />
              you're here today!
            </h2>

            {userName && (
              <p className="text-lg font-semibold text-purple-700 opacity-90">
                Welcome back, {userName}!
              </p>
            )}

            {/* Day Streak Counter */}
            <div className="mt-6">
              <div 
                className="inline-block px-6 py-3 rounded-xl font-bold text-white text-lg"
                style={{
                  backgroundColor: '#9370DB',
                  boxShadow: '0 4px 15px rgba(147, 112, 219, 0.4)'
                }}
              >
                Day {dayStreak}
              </div>
              <p className="text-sm font-medium text-purple-700 mt-2 opacity-80">
                Keep up the amazing streak!
              </p>
            </div>

            {/* Auto-close indicator */}
            <div className="flex justify-center mt-4">
              <div className="w-16 h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}