import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, BookOpen, PlusCircle, X, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
  onLogout: () => void;
}

export default function UserProfileFullscreen({ isOpen, onClose, currentUser, onLogout }: UserProfileProps) {
  const [profileQuote, setProfileQuote] = useState(currentUser?.bio || "");
  const [profileImage, setProfileImage] = useState(currentUser?.profileImage || "");
  const [diaryEntries, setDiaryEntries] = useState<any[]>([]);
  const [newEntryTitle, setNewEntryTitle] = useState("");
  const [newEntryContent, setNewEntryContent] = useState("");
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [expandedEntries, setExpandedEntries] = useState<Set<number>>(new Set());
  const { toast } = useToast();

  const toggleEntryExpansion = (entryId: number) => {
    const newExpanded = new Set(expandedEntries);
    if (newExpanded.has(entryId)) {
      newExpanded.delete(entryId);
    } else {
      newExpanded.add(entryId);
    }
    setExpandedEntries(newExpanded);
  };

  // Load diary entries when profile opens
  useEffect(() => {
    if (currentUser && isOpen) {
      loadDiaryEntries();
    }
  }, [currentUser, isOpen]);

  const loadDiaryEntries = async () => {
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

  const handleQuoteChange = async (value: string) => {
    const trimmedValue = value.slice(0, 40);
    setProfileQuote(trimmedValue);
    
    // Auto-save immediately
    try {
      await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: currentUser.id, 
          bio: trimmedValue 
        }),
      });
    } catch (error) {
      console.error('Failed to save quote:', error);
    }
  };

  const handlePhotoUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const base64 = e.target?.result as string;
          setProfileImage(base64);
          
          try {
            await fetch('/api/auth/profile', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                userId: currentUser.id, 
                profileImage: base64 
              }),
            });
            toast({
              title: "Photo saved",
              description: "Your profile photo has been updated.",
              className: "bg-green-800 border-green-700 text-white",
            });
          } catch (error) {
            toast({
              title: "Upload failed",
              description: "Could not save your photo.",
              variant: "destructive",
            });
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const saveDiaryEntry = async () => {
    if (!newEntryTitle.trim() || !newEntryContent.trim()) return;
    
    try {
      const response = await fetch('/api/diary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          title: newEntryTitle,
          content: newEntryContent,
        }),
      });
      
      if (response.ok) {
        const newEntry = await response.json();
        setDiaryEntries([newEntry, ...diaryEntries]);
        setNewEntryTitle("");
        setNewEntryContent("");
        setShowNewEntry(false);
        toast({
          title: "Entry saved",
          description: "Your diary entry has been saved permanently.",
          className: "bg-green-800 border-green-700 text-white",
        });
      }
    } catch (error) {
      toast({
        title: "Save failed",
        description: "Could not save your diary entry.",
        variant: "destructive",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-purple-200 dark:bg-purple-900 overflow-y-auto">
      <div className="min-h-screen p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black dark:text-white">Your Profile</h1>
          <Button 
            variant="outline" 
            onClick={onClose}
            className="bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="w-4 h-4 mr-2" />
            Close
          </Button>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-teal-200 dark:bg-teal-800">
            <TabsTrigger 
              value="profile" 
              className="text-black dark:text-white data-[state=active]:bg-green-800 data-[state=active]:text-white"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger 
              value="diary" 
              className="text-black dark:text-white data-[state=active]:bg-green-800 data-[state=active]:text-white"
            >
              Private Diary
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6 mt-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={profileImage} />
                  <AvatarFallback className="text-4xl bg-teal-400 text-black">
                    {currentUser.displayName?.charAt(0) || currentUser.username?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 rounded-full p-3 bg-teal-400 hover:bg-teal-500 border-teal-500"
                  onClick={handlePhotoUpload}
                >
                  <Camera className="w-4 h-4 text-black" />
                </Button>
              </div>
              
              <div className="text-center w-full max-w-md">
                <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
                  {currentUser.displayName || currentUser.username}
                </h2>
                <p className="text-lg text-black dark:text-white mb-4">@{currentUser.username}</p>
                
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Add a quote (40 chars max)"
                    value={profileQuote}
                    onChange={(e) => handleQuoteChange(e.target.value)}
                    className="bg-white dark:bg-black border-2 border-teal-400 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                    maxLength={40}
                  />
                  <p className="text-sm text-black dark:text-white">{profileQuote.length}/40</p>
                </div>
              </div>

              <Button 
                onClick={onLogout}
                className="mt-8 bg-red-600 hover:bg-red-700 text-white"
              >
                Logout
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="diary" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-black dark:text-white">Your Private Diary</h3>
              <Button 
                onClick={() => setShowNewEntry(true)}
                className="bg-teal-500 hover:bg-teal-600 text-white"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                New Entry
              </Button>
            </div>

            {showNewEntry && (
              <div className="p-4 bg-white dark:bg-black rounded-lg border-2 border-teal-400 space-y-4">
                <Input
                  type="text"
                  placeholder="Entry title..."
                  value={newEntryTitle}
                  onChange={(e) => setNewEntryTitle(e.target.value)}
                  className="bg-white dark:bg-black border-2 border-teal-400 text-black dark:text-white"
                />
                <Textarea
                  placeholder="Write your thoughts..."
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

            <div className="space-y-4">
              {diaryEntries.map((entry, index) => {
                const entryId = entry.id || index;
                const isExpanded = expandedEntries.has(entryId);
                
                return (
                  <div key={entryId} className="bg-white dark:bg-black rounded-lg border-2 border-teal-400 overflow-hidden">
                    <div 
                      className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                      onClick={() => toggleEntryExpansion(entryId)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3 flex-1">
                          <h4 className="font-medium text-black dark:text-white">{entry.title}</h4>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(entry.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex-shrink-0">
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-teal-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-teal-500" />
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-black dark:text-white mt-3 leading-relaxed">{entry.content}</p>
                      </div>
                    )}
                  </div>
                );
              })}
              
              {diaryEntries.length === 0 && !showNewEntry && (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-teal-400 mx-auto mb-4" />
                  <p className="text-black dark:text-white text-lg">Start writing to track your thoughts and feelings.</p>
                  <p className="text-black dark:text-white text-sm mt-2">Your entries are saved permanently and only visible to you.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}