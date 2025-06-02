import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings, LogOut, Camera, BookOpen, PlusCircle, Calendar, Mail } from "lucide-react";
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [displayName, setDisplayName] = useState(currentUser?.displayName || "");
  const [bio, setBio] = useState(currentUser?.bio || "");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [diaryEntries, setDiaryEntries] = useState<any[]>([]);
  const [newEntryTitle, setNewEntryTitle] = useState("");
  const [newEntryContent, setNewEntryContent] = useState("");
  const [newEntryMood, setNewEntryMood] = useState("");
  const [showNewEntry, setShowNewEntry] = useState(false);
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
    if (!email || !username || !password || !dateOfBirth) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields: email, username, password, and date of birth.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password, dateOfBirth, displayName }),
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

  const handleGoogleSignup = () => {
    // Redirect to Google OAuth flow
    window.location.href = '/api/auth/google';
  };

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName, bio, userId: currentUser.id }),
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

  const handlePhotoUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          // In a real app, you'd upload to a service like Cloudinary or AWS S3
          toast({
            title: "Photo selected",
            description: "Photo upload functionality will be implemented with cloud storage.",
          });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const loadDiaryEntries = async () => {
    if (!currentUser) return;
    try {
      const response = await fetch(`/api/diary?userId=${currentUser.id}`);
      if (response.ok) {
        const entries = await response.json();
        setDiaryEntries(entries);
      }
    } catch (error) {
      console.error('Failed to load diary entries:', error);
    }
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
          mood: newEntryMood,
        }),
      });

      if (response.ok) {
        setNewEntryTitle("");
        setNewEntryContent("");
        setNewEntryMood("");
        setShowNewEntry(false);
        loadDiaryEntries();
        toast({
          title: "Entry saved",
          description: "Your diary entry has been saved.",
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
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              My Account
            </DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="diary" onClick={loadDiaryEntries}>My Diary</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-6">
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
                    onClick={handlePhotoUpload}
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

                <div>
                  <label className="text-sm font-medium">About Me</label>
                  {isEditing ? (
                    <Textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us a bit about yourself..."
                      rows={3}
                    />
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400 min-h-[3rem] p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      {currentUser.bio || "No bio added yet."}
                    </p>
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
            </TabsContent>

            <TabsContent value="diary" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  My Private Diary
                </h3>
                <Button onClick={() => setShowNewEntry(true)} size="sm">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  New Entry
                </Button>
              </div>

              {showNewEntry && (
                <div className="space-y-3 p-4 border rounded-lg bg-purple-600 border-purple-700">
                  <Input
                    value={newEntryTitle}
                    onChange={(e) => setNewEntryTitle(e.target.value)}
                    placeholder="Entry title (optional)"
                    className="bg-white/20 border-purple-400 text-white placeholder:text-purple-100 font-semibold"
                  />
                  <Input
                    value={newEntryMood}
                    onChange={(e) => setNewEntryMood(e.target.value)}
                    placeholder="How are you feeling? (optional)"
                    className="bg-white/20 border-purple-400 text-white placeholder:text-purple-100 font-semibold"
                  />
                  <Textarea
                    value={newEntryContent}
                    onChange={(e) => setNewEntryContent(e.target.value)}
                    placeholder="Share your thoughts, feelings, or what happened today..."
                    rows={4}
                    className="bg-white/20 border-purple-400 text-white placeholder:text-purple-100 font-semibold"
                  />
                  <div className="flex gap-2">
                    <Button onClick={saveDiaryEntry} disabled={isLoading || !newEntryContent.trim()} className="flex-1 bg-purple-800 hover:bg-purple-900 text-white font-bold">
                      Save Entry
                    </Button>
                    <Button variant="outline" onClick={() => setShowNewEntry(false)} className="flex-1 border-purple-300 text-white hover:bg-purple-700 font-bold">
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {diaryEntries.length > 0 ? (
                  diaryEntries.map((entry, index) => (
                    <div key={entry.id || index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">
                          {entry.title || `Entry ${index + 1}`}
                        </h4>
                        <div className="flex items-center text-xs text-gray-500 gap-2">
                          <Calendar className="w-3 h-3" />
                          {new Date(entry.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      {entry.mood && (
                        <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                          Mood: {entry.mood}
                        </p>
                      )}
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {entry.content}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No diary entries yet.</p>
                    <p className="text-sm">Start writing to track your thoughts and feelings.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-black border-2 border-black dark:border-white">
        <DialogHeader>
          <DialogTitle className="text-black dark:text-white font-bold">{isLogin ? 'Welcome Back' : 'Create Account'}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-black dark:text-white font-medium">
            {isLogin 
              ? 'Sign in to save your contacts and personalize your experience.' 
              : 'Create an account to save your emergency contacts and customize your profile.'}
          </p>
          
          <div className="space-y-3">
            {!isLogin && (
              <>
                <Input
                  type="email"
                  placeholder="Email *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-semibold"
                />
                
                <Button
                  onClick={handleGoogleSignup}
                  variant="outline"
                  className="w-full bg-white dark:bg-black text-black dark:text-white border-2 border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-green-700 dark:hover:text-green-400 font-semibold flex items-center justify-center"
                >
                  <img src={googleIcon} alt="Google" className="mr-2 w-4 h-4" />
                  Sign up with Gmail
                </Button>
                
                <div className="text-center text-xs text-gray-500 dark:text-gray-400">or</div>
              </>
            )}
            
            <Input
              type="text"
              placeholder={isLogin ? "Username" : "Username *"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-semibold"
            />
            
            <Input
              type="password"
              placeholder={isLogin ? "Password" : "Password *"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-semibold"
            />
            
            {!isLogin && (
              <>
                <Input
                  type="date"
                  placeholder="Date of Birth *"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-semibold"
                />
                
                <Input
                  type="text"
                  placeholder="Display Name (optional)"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-semibold"
                />
              </>
            )}
          </div>

          <Button 
            onClick={isLogin ? handleLogin : handleSignup}
            disabled={isLoading || !username || !password || (!isLogin && (!email || !dateOfBirth))}
            className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 border-2 border-black dark:border-white font-bold"
          >
            {isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
          </Button>

          <Button
            variant="outline"
            onClick={() => setIsLogin(!isLogin)}
            className="w-full bg-white dark:bg-black text-black dark:text-white border-2 border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-black dark:hover:text-white font-semibold"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}