import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, BookOpen, PlusCircle, X, ChevronDown, ChevronUp, Save, Edit, Download, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";
import DiaryExportModal from "@/components/diary-export-modal";
import ImageCropModal from "@/components/image-crop-modal";

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
  onLogout: () => void;
}

export default function UserProfileFullscreen({ isOpen, onClose, currentUser, onLogout }: UserProfileProps) {
  const [profileQuote, setProfileQuote] = useState(currentUser?.bio || "");
  const [profileImage, setProfileImage] = useState(currentUser?.profileImage || "");
  const [username, setUsername] = useState(currentUser?.username || "");
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [diaryEntries, setDiaryEntries] = useState<any[]>([]);
  const [newEntryTitle, setNewEntryTitle] = useState("");
  const [newEntryContent, setNewEntryContent] = useState("");
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [expandedEntries, setExpandedEntries] = useState<Set<number>>(new Set());
  const [editingEntries, setEditingEntries] = useState<Set<number>>(new Set());
  const [editedContent, setEditedContent] = useState<{[key: number]: {title: string, content: string}}>({});
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImageCropModal, setShowImageCropModal] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState("");
  const { toast } = useToast();
  const { t } = useLanguage();

  const toggleEntryExpansion = (entryId: number) => {
    const newExpanded = new Set(expandedEntries);
    if (newExpanded.has(entryId)) {
      newExpanded.delete(entryId);
    } else {
      newExpanded.add(entryId);
    }
    setExpandedEntries(newExpanded);
  };

  const startEditingEntry = (entry: any) => {
    const entryId = entry.id;
    setEditingEntries(prev => new Set(prev).add(entryId));
    setEditedContent(prev => ({
      ...prev,
      [entryId]: {
        title: entry.title,
        content: entry.content
      }
    }));
  };

  const cancelEditingEntry = (entryId: number) => {
    setEditingEntries(prev => {
      const newSet = new Set(prev);
      newSet.delete(entryId);
      return newSet;
    });
    setEditedContent(prev => {
      const newContent = { ...prev };
      delete newContent[entryId];
      return newContent;
    });
  };

  const saveEditedEntry = async (entryId: number) => {
    try {
      const editedData = editedContent[entryId];
      if (!editedData) return;

      const response = await fetch(`/api/diary/${entryId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editedData.title,
          content: editedData.content
        }),
      });

      if (response.ok) {
        const updatedEntry = await response.json();
        setDiaryEntries(prev => prev.map(entry => 
          entry.id === entryId ? updatedEntry : entry
        ));
        cancelEditingEntry(entryId);
        toast({
          title: "Entry updated",
          description: "Your diary entry has been saved successfully.",
        });
      } else {
        throw new Error('Failed to update entry');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    }
  };

  const exportEntry = (entry: any) => {
    const exportData = `Title: ${entry.title}\nDate: ${new Date(entry.createdAt).toLocaleDateString()}\n\n${entry.content}`;
    const blob = new Blob([exportData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diary-entry-${entry.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Entry exported",
      description: "Your diary entry has been downloaded as a text file.",
    });
  };

  const deleteEntry = async (entryId: number) => {
    if (!confirm('Are you sure you want to delete this diary entry? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/diary/${entryId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDiaryEntries(prev => prev.filter(entry => entry.id !== entryId));
        toast({
          title: "Entry deleted",
          description: "Your diary entry has been permanently removed.",
        });
      } else {
        throw new Error('Failed to delete entry');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete entry. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Load user profile and diary entries when profile opens
  useEffect(() => {
    if (currentUser && isOpen) {
      loadUserProfile();
      loadDiaryEntries();
    }
  }, [currentUser, isOpen]);

  const loadUserProfile = async () => {
    try {
      const response = await fetch(`/api/auth/profile?userId=${currentUser.id}`);
      if (response.ok) {
        const profileData = await response.json();
        const bioFromDB = profileData.bio || currentUser.bio || "";
        const imageFromDB = profileData.profileImage || currentUser.profileImage || "";
        const usernameFromDB = profileData.username || currentUser.username || "";
        
        setProfileQuote(bioFromDB);
        setUsername(usernameFromDB);
        setProfileImage(imageFromDB);
        
        // Sync localStorage with database data to ensure persistence
        const updatedUser = { 
          ...currentUser, 
          bio: bioFromDB,
          profileImage: imageFromDB,
          username: usernameFromDB
        };
        localStorage.setItem('take5_current_user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Failed to load user profile:', error);
      // If server fails, fall back to localStorage data
      const savedUser = JSON.parse(localStorage.getItem('take5_current_user') || '{}');
      setProfileQuote(savedUser.bio || currentUser.bio || "");
      setProfileImage(savedUser.profileImage || currentUser.profileImage || "");
      setUsername(savedUser.username || currentUser.username || "");
    }
  };

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

  const handleQuoteChange = (value: string) => {
    const trimmedValue = value.slice(0, 40);
    setProfileQuote(trimmedValue);
  };

  const saveProfileQuote = async () => {
    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: currentUser.id, 
          bio: profileQuote 
        }),
      });

      if (response.ok) {
        // Update localStorage for persistence across sessions
        const updatedUser = { ...currentUser, bio: profileQuote };
        localStorage.setItem('take5_current_user', JSON.stringify(updatedUser));
        
        toast({
          title: "Quote Saved",
          description: "Your profile quote has been saved successfully.",
          className: "bg-green-800 border-green-700 text-white",
        });
      } else {
        throw new Error('Failed to save quote');
      }
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Could not save your profile quote. Please try again.",
        variant: "destructive",
      });
    }
  };

  const saveUsername = async () => {
    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: currentUser.id, 
          username: username 
        }),
      });

      if (response.ok) {
        setIsEditingUsername(false);
        
        // Update localStorage for persistence across sessions
        const updatedUser = { ...currentUser, username: username };
        localStorage.setItem('take5_current_user', JSON.stringify(updatedUser));
        
        toast({
          title: "Username Saved",
          description: "Your username has been updated successfully.",
          className: "bg-green-800 border-green-700 text-white",
        });
        // Update the current user object
        currentUser.username = username;
      } else {
        throw new Error('Failed to save username');
      }
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Could not save your username. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePhotoUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageSrc = e.target?.result as string;
          setTempImageSrc(imageSrc);
          setShowImageCropModal(true);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleSaveCroppedPhoto = async (croppedImageSrc: string) => {
    try {
      setProfileImage(croppedImageSrc);
      
      // Save to server
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: currentUser.id, 
          profileImage: croppedImageSrc 
        }),
      });

      if (response.ok) {
        // Update localStorage for persistence
        const updatedUser = { ...currentUser, profileImage: croppedImageSrc };
        localStorage.setItem('take5_current_user', JSON.stringify(updatedUser));
        
        toast({
          title: "Photo saved",
          description: "Your profile photo has been updated successfully.",
          className: "bg-green-800 border-green-700 text-white",
        });
      } else {
        throw new Error('Failed to save photo');
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Could not save your photo. Please try again.",
        variant: "destructive",
      });
    }
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
          <h1 className="text-2xl font-bold text-black dark:text-white">{t('yourProfile')}</h1>
          <Button 
            variant="outline" 
            onClick={onClose}
            className="bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="w-4 h-4 mr-2" />
            {t('close')}
          </Button>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-teal-200 dark:bg-teal-800">
            <TabsTrigger 
              value="profile" 
              className="text-black dark:text-white data-[state=active]:bg-green-800 data-[state=active]:text-white"
            >
              {t('profile')}
            </TabsTrigger>
            <TabsTrigger 
              value="diary" 
              className="text-black dark:text-white data-[state=active]:bg-green-800 data-[state=active]:text-white"
            >
              {t('privateDiary')}
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
                  {currentUser.displayName || username}
                </h2>
                
                {/* Username Section */}
                <div className="mb-4">
                  {isEditingUsername ? (
                    <div className="flex items-center space-x-2 justify-center">
                      <span className="text-lg text-black dark:text-white">@</span>
                      <Input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="bg-white dark:bg-black border-2 border-teal-400 text-black dark:text-white text-center w-40"
                        maxLength={20}
                      />
                      <Button
                        onClick={saveUsername}
                        size="sm"
                        className="bg-teal-500 hover:bg-teal-600 text-white px-2"
                      >
                        <Save className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => {
                          setUsername(currentUser.username);
                          setIsEditingUsername(false);
                        }}
                        size="sm"
                        variant="outline"
                        className="px-2"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 justify-center">
                      <p className="text-lg text-black dark:text-white">@{username}</p>
                      <Button
                        onClick={() => setIsEditingUsername(true)}
                        size="sm"
                        variant="ghost"
                        className="p-1"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Input
                      type="text"
                      placeholder={t('addQuotePlaceholder')}
                      value={profileQuote}
                      onChange={(e) => handleQuoteChange(e.target.value)}
                      className="bg-white dark:bg-black border-2 border-teal-400 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 flex-1"
                      maxLength={40}
                    />
                    <Button
                      onClick={saveProfileQuote}
                      size="sm"
                      className="bg-teal-500 hover:bg-teal-600 text-white px-3"
                    >
                      <Save className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-black dark:text-white">{profileQuote.length}/40</p>
                </div>
              </div>

              <Button 
                onClick={onLogout}
                className="mt-8 bg-red-600 hover:bg-red-700 text-white"
              >
                {t('logout')}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="diary" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-black dark:text-white">{t('yourPrivateDiary')}</h3>
              <div className="flex gap-2">
                <Button 
                  onClick={() => setShowExportModal(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  disabled={diaryEntries.length === 0}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button 
                  onClick={() => setShowNewEntry(true)}
                  className="bg-teal-500 hover:bg-teal-600 text-white"
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  {t('newEntry')}
                </Button>
              </div>
            </div>

            {showNewEntry && (
              <div className="p-4 bg-white dark:bg-black rounded-lg border-2 border-teal-400 space-y-4">
                <Input
                  type="text"
                  placeholder={t('entryTitlePlaceholder')}
                  value={newEntryTitle}
                  onChange={(e) => setNewEntryTitle(e.target.value)}
                  className="bg-white dark:bg-black border-2 border-teal-400 text-black dark:text-white"
                />
                <Textarea
                  placeholder={t('writeThoughtsPlaceholder')}
                  value={newEntryContent}
                  onChange={(e) => setNewEntryContent(e.target.value)}
                  rows={4}
                  className="bg-white dark:bg-black border-2 border-teal-400 text-black dark:text-white"
                />
                <div className="flex gap-2">
                  <Button onClick={saveDiaryEntry} className="bg-teal-500 hover:bg-teal-600 text-white">
                    {t('saveEntry')}
                  </Button>
                  <Button 
                    onClick={() => setShowNewEntry(false)} 
                    className="bg-stone-200 hover:bg-stone-300 text-white"
                  >
                    {t('cancel')}
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {diaryEntries.map((entry, index) => {
                const entryId = entry.id || index;
                const isExpanded = expandedEntries.has(entryId);
                const isEditing = editingEntries.has(entryId);
                const editData = editedContent[entryId];
                
                return (
                  <div key={entryId} className="bg-white dark:bg-black rounded-lg border-2 border-teal-400 overflow-hidden">
                    <div 
                      className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                      onClick={() => !isEditing && toggleEntryExpansion(entryId)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3 flex-1">
                          {isEditing ? (
                            <Input
                              value={editData?.title || entry.title}
                              onChange={(e) => setEditedContent(prev => ({
                                ...prev,
                                [entryId]: { ...prev[entryId], title: e.target.value }
                              }))}
                              className="font-medium bg-white dark:bg-black border border-teal-400 text-black dark:text-white"
                              onClick={(e) => e.stopPropagation()}
                            />
                          ) : (
                            <h4 className="font-medium text-black dark:text-white">{entry.title}</h4>
                          )}
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(entry.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!isEditing && (
                            <>
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  startEditingEntry(entry);
                                }}
                                className="bg-stone-200 hover:bg-stone-300 p-1 min-w-0 h-4 w-4"
                              >
                                <Edit className="w-2 h-2 text-black" />
                              </Button>
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  exportEntry(entry);
                                }}
                                className="bg-stone-200 hover:bg-stone-300 p-1 min-w-0 h-4 w-4"
                              >
                                <Download className="w-2 h-2 text-black" />
                              </Button>
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteEntry(entryId);
                                }}
                                className="bg-stone-200 hover:bg-stone-300 p-1 min-w-0 h-4 w-4"
                              >
                                <Trash2 className="w-2 h-2 text-black" />
                              </Button>
                            </>
                          )}
                          {isEditing && (
                            <>
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  saveEditedEntry(entryId);
                                }}
                                className="bg-green-800 hover:bg-green-900 text-white"
                              >
                                <Save className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  cancelEditingEntry(entryId);
                                }}
                                className="border-gray-400 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          <div className="flex-shrink-0">
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-teal-500" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-teal-500" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700">
                        {isEditing ? (
                          <Textarea
                            value={editData?.content || entry.content}
                            onChange={(e) => setEditedContent(prev => ({
                              ...prev,
                              [entryId]: { ...prev[entryId], content: e.target.value }
                            }))}
                            rows={6}
                            className="mt-3 bg-white dark:bg-black border border-teal-400 text-black dark:text-white"
                          />
                        ) : (
                          <p className="text-black dark:text-white mt-3 leading-relaxed">{entry.content}</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
              
              {diaryEntries.length === 0 && !showNewEntry && (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-teal-400 mx-auto mb-4" />
                  <p className="text-black dark:text-white text-lg">{t('startWriting')}</p>
                  <p className="text-black dark:text-white text-sm mt-2">{t('entriesSaved')}</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Export Modal */}
      <DiaryExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        entries={diaryEntries}
        userName={currentUser?.displayName || currentUser?.username}
      />

      {/* Image Crop Modal */}
      <ImageCropModal
        isOpen={showImageCropModal}
        onClose={() => setShowImageCropModal(false)}
        imageSrc={tempImageSrc}
        onSave={handleSaveCroppedPhoto}
      />
    </div>
  );
}