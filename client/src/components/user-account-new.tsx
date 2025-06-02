import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings, LogOut, Camera, BookOpen, PlusCircle, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import googleIcon from "@assets/goolge-icon.png";

interface UserAccountProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: any;
  onLogin: (user: any) => void;
  onLogout: () => void;
}

export default function UserAccount({ isOpen, onClose, currentUser, onLogin, onLogout }: UserAccountProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showProfileCompletion, setShowProfileCompletion] = useState(false);
  const [fullName, setFullName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [profileQuote, setProfileQuote] = useState("");
  const [diaryEntries, setDiaryEntries] = useState<any[]>([]);
  const [newEntryTitle, setNewEntryTitle] = useState("");
  const [newEntryContent, setNewEntryContent] = useState("");
  const [showNewEntry, setShowNewEntry] = useState(false);
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
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      toast({
        title: "Missing information",
        description: "Please fill in email, password, and confirm password.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          username: email.split('@')[0],
          password, 
          dateOfBirth: "1990-01-01",
          displayName: ""
        }),
      });

      if (response.ok) {
        const user = await response.json();
        onLogin(user);
        setShowProfileCompletion(true);
        toast({
          title: "Account created!",
          description: "Please complete your profile to continue.",
          className: "bg-green-800 border-green-700 text-white",
        });
      } else {
        const error = await response.text();
        toast({
          title: "Signup failed",
          description: error || "Email might already exist.",
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

  const handleGoogleSignup = () => {
    window.location.href = '/api/auth/google';
  };

  const completeProfile = async () => {
    if (!fullName || !displayName || !dateOfBirth) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields: Full Name, Display Name, and Date of Birth.",
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
          userId: currentUser?.id,
          fullName,
          displayName, 
          dateOfBirth,
          profileQuote
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        onLogin(updatedUser);
        setShowProfileCompletion(false);
        toast({
          title: "Profile completed!",
          description: "Welcome to Take 5. Your profile is ready.",
          className: "bg-green-800 border-green-700 text-white",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to complete profile.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handlePhotoUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        toast({
          title: "Photo selected",
          description: "Photo upload functionality will be implemented with cloud storage.",
          className: "bg-green-800 border-green-700 text-white",
        });
      }
    };
    input.click();
  };

  const saveDiaryEntry = async () => {
    if (!newEntryContent.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/diary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          title: newEntryTitle || `Entry for ${new Date().toLocaleDateString()}`,
          content: newEntryContent,
        }),
      });

      if (response.ok) {
        setNewEntryTitle("");
        setNewEntryContent("");
        setShowNewEntry(false);
        loadDiaryEntries();
        toast({
          title: "Entry saved",
          description: "Your diary entry has been saved.",
          className: "bg-green-800 border-green-700 text-white",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save diary entry.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const loadDiaryEntries = async () => {
    try {
      const response = await fetch(`/api/diary/${currentUser.id}`);
      if (response.ok) {
        const entries = await response.json();
        setDiaryEntries(entries);
      }
    } catch (error) {
      console.error('Failed to load diary entries:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      onLogout();
      onClose();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Profile completion screen
  if (showProfileCompletion) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md bg-purple-200 dark:bg-purple-900 border-2 border-purple-300 dark:border-purple-700">
          <DialogHeader>
            <DialogTitle className="text-black dark:text-white font-bold text-center">Complete Your Profile</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Full Name *"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-white dark:bg-black border-2 border-teal-400 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-semibold"
            />
            
            <Input
              type="text"
              placeholder="Display Name *"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="bg-white dark:bg-black border-2 border-teal-400 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-semibold"
            />
            
            <Input
              type="date"
              placeholder="Date of Birth *"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="bg-white dark:bg-black border-2 border-teal-400 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-semibold"
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

  // Main profile screen for logged in users
  if (currentUser) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl bg-purple-200 dark:bg-purple-900 border-2 border-purple-300 dark:border-purple-700">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-teal-200 dark:bg-teal-800">
              <TabsTrigger value="profile" className="text-black dark:text-white data-[state=active]:bg-green-800 data-[state=active]:text-white">Profile</TabsTrigger>
              <TabsTrigger value="diary" className="text-black dark:text-white data-[state=active]:bg-green-800 data-[state=active]:text-white">Private Diary</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-6 mt-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={currentUser.profileImage} />
                    <AvatarFallback className="text-2xl bg-teal-400 text-black">
                      {currentUser.displayName?.charAt(0) || currentUser.username?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 rounded-full p-2 bg-teal-400 hover:bg-teal-500 border-teal-500"
                    onClick={handlePhotoUpload}
                  >
                    <Camera className="w-3 h-3 text-black" />
                  </Button>
                </div>
                
                <div className="text-center">
                  <h2 className="text-xl font-bold text-black dark:text-white">{currentUser.displayName || currentUser.username}</h2>
                  <p className="text-sm text-black dark:text-white">@{currentUser.username}</p>
                  <Input
                    type="text"
                    placeholder="Add a quote (40 chars max)"
                    value={profileQuote}
                    onChange={(e) => setProfileQuote(e.target.value.slice(0, 40))}
                    className="mt-2 bg-white dark:bg-black border-2 border-teal-400 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-semibold"
                    maxLength={40}
                  />
                  <p className="text-xs text-black dark:text-white mt-1">{profileQuote.length}/40</p>
                </div>
              </div>

              <div className="flex justify-center">
                <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="diary" className="space-y-4 mt-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-black dark:text-white">My Private Diary</h3>
                <Button 
                  onClick={() => setShowNewEntry(true)}
                  className="bg-teal-500 hover:bg-teal-600 text-white"
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  New Entry
                </Button>
              </div>

              {showNewEntry && (
                <div className="space-y-3 p-4 bg-white dark:bg-black rounded-lg border-2 border-teal-400">
                  <Input
                    type="text"
                    placeholder="Entry title (optional)"
                    value={newEntryTitle}
                    onChange={(e) => setNewEntryTitle(e.target.value)}
                    className="bg-white dark:bg-black border-2 border-teal-400 text-black dark:text-white"
                  />
                  <Textarea
                    placeholder="Write your thoughts here..."
                    value={newEntryContent}
                    onChange={(e) => setNewEntryContent(e.target.value)}
                    rows={4}
                    className="bg-white dark:bg-black border-2 border-teal-400 text-black dark:text-white"
                  />
                  <div className="flex gap-2">
                    <Button onClick={saveDiaryEntry} className="bg-teal-500 hover:bg-teal-600 text-white">
                      Save Entry
                    </Button>
                    <Button 
                      onClick={() => setShowNewEntry(false)} 
                      variant="outline"
                      className="border-teal-400 text-black dark:text-white hover:bg-teal-50 dark:hover:bg-teal-900"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {diaryEntries.map((entry, index) => (
                  <div key={entry.id || index} className="p-4 bg-white dark:bg-black rounded-lg border-2 border-teal-400">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-black dark:text-white">{entry.title}</h4>
                      <span className="text-xs text-black dark:text-white">
                        {new Date(entry.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-black dark:text-white">{entry.content}</p>
                  </div>
                ))}
                {diaryEntries.length === 0 && !showNewEntry && (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-teal-400 mx-auto mb-4" />
                    <p className="text-black dark:text-white">Start writing to track your thoughts and feelings.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
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
          <div className="space-y-3">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-semibold"
            />
            
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-semibold"
            />

            {!isLogin && (
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-semibold"
              />
            )}
            
            <Button
              onClick={isLogin ? handleLogin : handleSignup}
              disabled={isLoading}
              className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 font-semibold"
            >
              {isLoading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
            </Button>

            <div className="text-center text-xs text-gray-500 dark:text-gray-400">or</div>

            <Button
              onClick={handleGoogleSignup}
              variant="outline"
              className="w-full bg-white dark:bg-black text-black dark:text-white border-2 border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-green-700 dark:hover:text-green-400 font-semibold flex items-center justify-center"
            >
              <img src={googleIcon} alt="Google" className="mr-2 w-4 h-4" />
              Sign {isLogin ? "in" : "up"} with Gmail
            </Button>
            
            <div className="text-center">
              <Button
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 underline"
              >
                {isLogin ? "Need an account? Sign up" : "Have an account? Sign in"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}