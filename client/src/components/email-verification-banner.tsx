import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, X } from "lucide-react";

interface EmailVerificationBannerProps {
  userEmail: string;
  onDismiss?: () => void;
}

export default function EmailVerificationBanner({ userEmail, onDismiss }: EmailVerificationBannerProps) {
  const [isResending, setIsResending] = useState(false);
  const { toast } = useToast();

  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail }),
      });

      if (response.ok) {
        toast({
          title: "Verification Email Sent",
          description: "Please check your email for the verification link.",
          className: "bg-green-800 border-green-700 text-white",
        });
      } else {
        const error = await response.json();
        toast({
          title: "Failed to Send Email",
          description: error.error || "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not send verification email. Please try again.",
        variant: "destructive",
      });
    }
    setIsResending(false);
  };

  return (
    <div className="bg-amber-100 dark:bg-amber-900/30 border-l-4 border-amber-500 p-4 mx-4 mt-4 rounded-r-lg">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <Mail className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-200">
              Verify your email to unlock full access to Take 5
            </h3>
            <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
              We sent a verification link to <strong>{userEmail}</strong>. 
              Click the link in your email to access AI chat, journaling, and all features.
            </p>
            <div className="mt-3 flex items-center space-x-3">
              <Button
                onClick={handleResendEmail}
                disabled={isResending}
                size="sm"
                className="bg-amber-600 hover:bg-amber-700 text-white text-xs"
              >
                {isResending ? "Sending..." : "Resend Email"}
              </Button>
              <span className="text-xs text-amber-600 dark:text-amber-400">
                Check your spam folder if you don't see it
              </span>
            </div>
          </div>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-200"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}