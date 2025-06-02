import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings, LogOut, Camera, BookOpen, PlusCircle, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserAccountProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: any;
  onLogin: (user: any) => void;
  onLogout: () => void;
}

export default function UserAccount({ isOpen, onClose, currentUser, onLogin, onLogout }: UserAccountProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState(currentUser?.displayName || "");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const user = await response.json();
        onLogin(user);
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        });
        onClose();
      } else {
        toast({
          title: "Login failed",
          description: "Invalid username or password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, displayName }),
      });

      if (response.ok) {
        const user = await response.json();
        onLogin(user);
        toast({
          title: "Account created!",
          description: "Welcome to Take 5. Your account is ready.",
        });
        onClose();
      } else {
        const error = await response.text();
        toast({
          title: "Signup failed",
          description: error || "Username might already exist.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        onLogin(updatedUser);
        setIsEditing(false);
        toast({
          title: "Profile updated",
          description: "Your profile has been saved.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      onLogout();
      toast({
        title: "Logged out",
        description: "You've been safely logged out.",
      });
      onClose();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (currentUser) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              My Profile
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={currentUser.profileImage} />
                  <AvatarFallback className="text-2xl">
                    {currentUser.displayName?.charAt(0) || currentUser.username?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 rounded-full p-2"
                  onClick={() => {
                    toast({
                      title: "Photo upload",
                      description: "Photo upload feature coming soon!",
                    });
                  }}
                >
                  <Camera className="w-3 h-3" />
                </Button>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-500">@{currentUser.username}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Display Name</label>
                {isEditing ? (
                  <Input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter your display name"
                  />
                ) : (
                  <p className="text-lg">{currentUser.displayName || currentUser.username}</p>
                )}
              </div>

              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button onClick={handleUpdateProfile} disabled={isLoading} className="flex-1">
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)} variant="outline" className="flex-1">
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>

              <Button variant="destructive" onClick={handleLogout} className="w-full">
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isLogin ? 'Welcome Back' : 'Create Account'}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            {isLogin 
              ? 'Sign in to save your contacts and personalize your experience.' 
              : 'Create an account to save your emergency contacts and customize your profile.'}
          </p>
          
          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            {!isLogin && (
              <Input
                type="text"
                placeholder="Display Name (optional)"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            )}
          </div>

          <Button 
            onClick={isLogin ? handleLogin : handleSignup}
            disabled={isLoading || !username || !password}
            className="w-full"
          >
            {isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
          </Button>

          <Button
            variant="ghost"
            onClick={() => setIsLogin(!isLogin)}
            className="w-full"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}