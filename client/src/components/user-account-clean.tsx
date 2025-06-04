import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import googleIcon from "@assets/goolge-icon.png";

interface UserAccountProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: any;
  onLogin: (user: any) => void;
  onLogout: () => void;
}

export default function UserAccountClean({ isOpen, onClose, currentUser, onLogin, onLogout }: UserAccountProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showProfileCompletion, setShowProfileCompletion] = useState(false);
  const [fullName, setFullName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const { toast } = useToast();

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        title: "Missing information",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email.split('@')[0], password }),
      });

      if (response.ok) {
        const user = await response.json();
        onLogin(user);
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
          className: "bg-green-800 border-green-700 text-white",
        });
        onClose();
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Could not connect to server.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          username: email.split('@')[0],
          password,
          dateOfBirth: new Date().toISOString().split('T')[0], // Temporary
        }),
      });

      if (response.ok) {
        const user = await response.json();
        setShowProfileCompletion(true);
        toast({
          title: "Account created!",
          description: "Please complete your profile.",
          className: "bg-green-800 border-green-700 text-white",
        });
      } else {
        const error = await response.text();
        toast({
          title: "Registration failed",
          description: error || "Could not create account.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Could not connect to server.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google';
  };

  const completeProfile = async () => {
    if (!fullName || !displayName || !dateOfBirth) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/complete-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 1, // Will be set properly by backend
          fullName,
          displayName,
          dateOfBirth,
        }),
      });

      if (response.ok) {
        const user = await response.json();
        onLogin(user);
        toast({
          title: "Profile completed!",
          description: "Welcome to Take 5.",
          className: "bg-green-800 border-green-700 text-white",
        });
        onClose();
        setShowProfileCompletion(false);
      }
    } catch (error) {
      toast({
        title: "Profile completion failed",
        description: "Could not save profile.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  // Profile completion screen
  if (showProfileCompletion) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md bg-purple-200 dark:bg-purple-900 border-2 border-purple-300 dark:border-purple-700">
          <DialogHeader>
            <DialogTitle className="text-black dark:text-white font-bold text-center">
              Complete Your Profile
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Full Name (required)"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-white dark:bg-black border-2 border-teal-400 text-black dark:text-white"
            />
            <Input
              type="text"
              placeholder="Display Name (required)"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="bg-white dark:bg-black border-2 border-teal-400 text-black dark:text-white"
            />
            <Input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="bg-white dark:bg-black border-2 border-teal-400 text-black dark:text-white"
            />
            <Button
              onClick={completeProfile}
              disabled={isLoading}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold"
            >
              {isLoading ? "Completing..." : "Complete Profile"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Login/Signup screen
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-black border-2 border-black dark:border-white">
        <DialogHeader>
          <DialogTitle className="text-black dark:text-white font-bold text-center">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white"
          />
          {!isLogin && (
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white"
            />
          )}
          
          <Button
            onClick={isLogin ? handleLogin : handleSignup}
            disabled={isLoading}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold"
          >
            {isLoading ? (isLogin ? "Signing in..." : "Creating account...") : (isLogin ? "Sign In" : "Create Account")}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-black dark:border-white" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-black px-2 text-black dark:text-white">Or</span>
            </div>
          </div>

          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full border-2 border-black dark:border-white text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white"
          >
            <img src={googleIcon} alt="Google" className="w-4 h-4 mr-2" />
            Continue with Google
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-teal-600 dark:text-teal-400 hover:underline"
            >
              {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}