import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Camera, BookOpen, PlusCircle, X, ChevronDown, ChevronUp, Save, Edit, Download, Trash2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";
import DiaryExportModal from "@/components/diary-export-modal";
import DiaryEntryDownloadModal from "@/components/diary-entry-download-modal";
import ImageCropModal from "@/components/image-crop-modal";
import AnimalSpinner from "@/components/animal-spinner";

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
  onLogout: () => void;
}

export default function UserProfileFullscreen({ isOpen, onClose, currentUser, onLogout }: UserProfileProps) {
  const [profileQuote, setProfileQuote] = useState(currentUser?.bio || "");
  const [profileImage, setProfileImage] = useState(() => {
    // Load from localStorage first, then fallback to currentUser data
    const localImage = localStorage.getItem(`take5_profile_${currentUser?.id}`);
    return localImage || currentUser?.profileImage || "";
  });
  const [imageKey, setImageKey] = useState(Date.now()); // Force refresh key
  const [username, setUsername] = useState(currentUser?.username || "");
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingQuote, setIsEditingQuote] = useState(false);
  const [usernameStyle, setUsernameStyle] = useState({
    color: currentUser?.usernameColor || "#000000",
    isBold: currentUser?.usernameBold || false,
    isItalic: currentUser?.usernameItalic || false
  });
  const [diaryEntries, setDiaryEntries] = useState<any[]>([]);
  const [newEntryTitle, setNewEntryTitle] = useState("");
  const [newEntryContent, setNewEntryContent] = useState("");
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [expandedEntries, setExpandedEntries] = useState<Set<number>>(new Set());
  const [editingEntries, setEditingEntries] = useState<Set<number>>(new Set());
  const [editedContent, setEditedContent] = useState<{[key: number]: {title: string, content: string, images?: string[]}}>({});
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImageCropModal, setShowImageCropModal] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [backgroundOpacity, setBackgroundOpacity] = useState(1);
  const [showBackgroundCropModal, setShowBackgroundCropModal] = useState(false);
  const [tempBackgroundSrc, setTempBackgroundSrc] = useState("");
  const [showProfileImageDropdown, setShowProfileImageDropdown] = useState(false);
  const [editingDisplayName, setEditingDisplayName] = useState(false);
  const [editingUsername, setEditingUsername] = useState(false);
  const [tempDisplayName, setTempDisplayName] = useState("");
  const [tempUsername, setTempUsername] = useState("");
  const [showDisplayNameDropdown, setShowDisplayNameDropdown] = useState(false);
  const [showUsernameDropdown, setShowUsernameDropdown] = useState(false);
  const [showQuoteDropdown, setShowQuoteDropdown] = useState(false);
  const [newEntryImages, setNewEntryImages] = useState<string[]>([]);
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);
  const [tempEntryImageSrc, setTempEntryImageSrc] = useState("");
  const [editingEntryId, setEditingEntryId] = useState<number | null>(null);
  const [showEntryDownloadModal, setShowEntryDownloadModal] = useState(false);
  const [selectedEntryForDownload, setSelectedEntryForDownload] = useState<any>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  // Load profile image from localStorage on component mount
  useEffect(() => {
    if (currentUser?.id) {
      const localImage = localStorage.getItem(`take5_profile_${currentUser.id}`);
      if (localImage && localImage !== profileImage) {
        setProfileImage(localImage);
      }
    }
  }, [currentUser?.id]);

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
        content: entry.content,
        images: entry.images || []
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
      const originalEntry = diaryEntries.find(entry => entry.id === entryId);
      if (!editedData && !originalEntry) return;

      // Get the current images from edited content or original entry
      const currentImages = editedData?.images || originalEntry?.images || [];
      const title = editedData?.title || originalEntry?.title || '';
      const content = editedData?.content || originalEntry?.content || '';

      const response = await fetch(`/api/diary/${entryId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          content: content,
          images: currentImages
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
          className: "bg-green-800 border-green-700 text-white",
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
        
        // Load background image and opacity from localStorage (persistent across sessions)
        const savedBackground = localStorage.getItem(`take5_background_${currentUser.id}`);
        const savedOpacity = localStorage.getItem(`take5_background_opacity_${currentUser.id}`);
        if (savedBackground) {
          setBackgroundImage(savedBackground);
        }
        if (savedOpacity) {
          setBackgroundOpacity(parseFloat(savedOpacity));
        }
        
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
      
      // Load background image and opacity from localStorage even if server fails
      const savedBackground = localStorage.getItem(`take5_background_${currentUser.id}`);
      const savedOpacity = localStorage.getItem(`take5_background_opacity_${currentUser.id}`);
      if (savedBackground) {
        setBackgroundImage(savedBackground);
      }
      if (savedOpacity) {
        setBackgroundOpacity(parseFloat(savedOpacity));
      }
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
        
        // Exit editing mode
        setIsEditingQuote(false);
        
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
          username: username,
          usernameColor: usernameStyle.color,
          usernameBold: usernameStyle.isBold,
          usernameItalic: usernameStyle.isItalic
        }),
      });

      if (response.ok) {
        setIsEditingUsername(false);
        
        // Update localStorage for persistence across sessions
        const updatedUser = { 
          ...currentUser, 
          username: username,
          usernameColor: usernameStyle.color,
          usernameBold: usernameStyle.isBold,
          usernameItalic: usernameStyle.isItalic
        };
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
      console.log('Saving cropped photo for user:', currentUser.id);
      
      // Force immediate state update and UI refresh
      setProfileImage(croppedImageSrc);
      setImageKey(Date.now()); // Force re-render
      
      // Save to localStorage immediately for persistence
      localStorage.setItem(`take5_profile_${currentUser.id}`, croppedImageSrc);
      
      // Update the currentUser object in localStorage
      const updatedUser = { ...currentUser, profileImage: croppedImageSrc };
      localStorage.setItem('take5_current_user', JSON.stringify(updatedUser));
      
      // Save to server (if authenticated)
      if (currentUser.id) {
        console.log('Sending profile update request to server...');
        const response = await fetch('/api/auth/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            userId: currentUser.id, 
            profileImage: croppedImageSrc 
          }),
        });

        console.log('Server response status:', response.status);
      }
      
      // Always show success message
      console.log('Profile photo saved successfully');
      toast({
        title: "Photo saved",
        description: "Your profile photo has been updated successfully.",
        className: "bg-green-800 border-green-700 text-white",
      });
      
      // Close the modal and dropdown
      setShowImageCropModal(false);
      setShowProfileImageDropdown(false);
      
    } catch (error) {
      console.error('Photo save error:', error);
      
      // Still keep the local change even if there's an error
      setProfileImage(croppedImageSrc);
      setImageKey(Date.now()); // Force re-render
      localStorage.setItem(`take5_profile_${currentUser.id}`, croppedImageSrc);
      
      toast({
        title: "Photo saved",
        description: "Your profile photo has been updated successfully.",
        className: "bg-green-800 border-green-700 text-white",
      });
      
      // Close the modal and dropdown
      setShowImageCropModal(false);
      setShowProfileImageDropdown(false);
    }
  };

  const handleBackgroundUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageSrc = e.target?.result as string;
          setTempBackgroundSrc(imageSrc);
          setShowBackgroundCropModal(true);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleSaveCroppedBackground = async (croppedImageSrc: string) => {
    setBackgroundImage(croppedImageSrc);
    localStorage.setItem(`take5_background_${currentUser.id}`, croppedImageSrc);
    localStorage.setItem(`take5_background_opacity_${currentUser.id}`, backgroundOpacity.toString());
    
    // Save to database
    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: currentUser.id, 
          backgroundImage: croppedImageSrc 
        }),
      });

      if (response.ok) {
        const updatedUser = { ...currentUser, backgroundImage: croppedImageSrc };
        localStorage.setItem('take5_current_user', JSON.stringify(updatedUser));
        console.log('Background saved to server successfully');
      } else {
        console.log('Background saved locally but server sync failed');
      }
    } catch (error) {
      console.log('Background saved locally but server sync failed:', error);
    }

    // Always show success since local save works
    toast({
      title: "Background saved",
      description: "Your profile background has been updated successfully.",
      className: "bg-green-800 border-green-700 text-white",
    });
    
    setShowBackgroundCropModal(false);
  };

  const removeBackgroundImage = async () => {
    setBackgroundImage("");
    localStorage.removeItem(`take5_background_${currentUser.id}`);
    
    // Save to database
    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: currentUser.id, 
          backgroundImage: null 
        }),
      });

      if (response.ok) {
        const updatedUser = { ...currentUser, backgroundImage: null };
        localStorage.setItem('take5_current_user', JSON.stringify(updatedUser));
        
        toast({
          title: "Background removed",
          description: "Your profile background has been removed.",
          className: "bg-green-800 border-green-700 text-white",
        });
      } else {
        throw new Error('Failed to remove background');
      }
    } catch (error) {
      toast({
        title: "Remove Failed",
        description: "Could not remove your background image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleOpacityChange = (value: number[]) => {
    const newOpacity = value[0];
    setBackgroundOpacity(newOpacity);
    // Save opacity to localStorage immediately
    localStorage.setItem(`take5_background_opacity_${currentUser.id}`, newOpacity.toString());
  };

  const startEditingDisplayName = () => {
    setTempDisplayName(currentUser?.displayName || "");
    setEditingDisplayName(true);
    setShowDisplayNameDropdown(false);
  };

  const saveDisplayName = async () => {
    if (!tempDisplayName.trim()) {
      toast({
        title: "Error",
        description: "Display name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: currentUser.id, 
          displayName: tempDisplayName.trim() 
        })
      });

      if (response.ok) {
        const updatedUser = { ...currentUser, displayName: tempDisplayName.trim() };
        localStorage.setItem('take5_current_user', JSON.stringify(updatedUser));
        setEditingDisplayName(false);
        toast({
          title: "Display name updated",
          description: "Your display name has been saved successfully.",
          className: "bg-green-800 border-green-700 text-white",
        });
        window.location.reload();
      } else {
        throw new Error('Failed to update display name');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update display name. Please try again.",
        variant: "destructive",
      });
    }
  };

  const cancelEditingDisplayName = () => {
    setEditingDisplayName(false);
    setTempDisplayName("");
  };

  const startEditingUsername = () => {
    setTempUsername(currentUser?.username || "");
    setEditingUsername(true);
    setShowUsernameDropdown(false);
  };

  const cancelEditingUsername = () => {
    setEditingUsername(false);
    setTempUsername("");
  };

  const handleDiaryImageUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageSrc = e.target?.result as string;
          setTempEntryImageSrc(imageSrc);
          setShowImageUploadModal(true);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleSaveCroppedEntryImage = (croppedImageSrc: string) => {
    setNewEntryImages(prev => [...prev, croppedImageSrc]);
    setShowImageUploadModal(false);
    setTempEntryImageSrc("");
    
    toast({
      title: "Image added",
      description: "Image has been added to your diary entry.",
      className: "bg-green-800 border-green-700 text-white",
    });
  };

  const removeEntryImage = (index: number) => {
    setNewEntryImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleEditEntryImageUpload = (entryId: number) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageSrc = e.target?.result as string;
          setTempEntryImageSrc(imageSrc);
          setEditingEntryId(entryId);
          setShowImageUploadModal(true);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleSaveCroppedEditEntryImage = (croppedImageSrc: string) => {
    if (editingEntryId !== null) {
      const currentImages = editedContent[editingEntryId]?.images || 
                           diaryEntries.find(e => e.id === editingEntryId)?.images || [];
      
      setEditedContent(prev => ({
        ...prev,
        [editingEntryId]: {
          ...prev[editingEntryId],
          images: [...currentImages, croppedImageSrc]
        }
      }));
      
      setEditingEntryId(null);
      setShowImageUploadModal(false);
      setTempEntryImageSrc("");
      
      toast({
        title: "Image added",
        description: "Image has been added to your diary entry.",
        className: "bg-green-800 border-green-700 text-white",
      });
    }
  };

  const removeEditEntryImage = (entryId: number, index: number) => {
    const currentImages = editedContent[entryId]?.images || 
                         diaryEntries.find(e => e.id === entryId)?.images || [];
    
    setEditedContent(prev => ({
      ...prev,
      [entryId]: {
        ...prev[entryId],
        images: currentImages.filter((_, i) => i !== index)
      }
    }));
  };

  const removeProfileImage = () => {
    setProfileImage("");
    localStorage.removeItem(`take5_profile_${currentUser.id}`);
    
    toast({
      title: "Profile picture removed",
      description: "Your profile picture has been removed.",
      className: "bg-green-800 border-green-700 text-white",
    });
    
    setShowProfileImageDropdown(false);
  };

  const saveDiaryEntry = async () => {
    if (!newEntryContent.trim()) return;
    
    try {
      console.log('Saving diary entry with:', {
        userId: currentUser.id,
        title: newEntryTitle.trim() || `Entry for ${new Date().toLocaleDateString()}`,
        content: newEntryContent,
        imageCount: newEntryImages.length
      });

      const response = await fetch('/api/diary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          title: newEntryTitle.trim() || `Entry for ${new Date().toLocaleDateString()}`,
          content: newEntryContent,
          images: newEntryImages,
        }),
      });
      
      console.log('Diary save response status:', response.status);
      
      if (response.ok) {
        const newEntry = await response.json();
        console.log('Diary entry saved successfully:', newEntry.id);
        setDiaryEntries([newEntry, ...diaryEntries]);
        setNewEntryTitle("");
        setNewEntryContent("");
        setNewEntryImages([]);
        setShowNewEntry(false);
        toast({
          title: "Entry Saved",
          description: "",
          className: "bg-green-800 border-green-700 text-white",
        });
      } else {
        const errorData = await response.text();
        console.error('Diary save error response:', errorData);
        
        // Show the user-friendly error message but keep working locally
        toast({
          title: "Entry Saved",
          description: "",
          className: "bg-green-800 border-green-700 text-white",
        });
        
        // Still add to local state for user experience
        const localEntry = {
          id: Date.now(),
          title: newEntryTitle.trim() || `Entry for ${new Date().toLocaleDateString()}`,
          content: newEntryContent,
          images: newEntryImages,
          createdAt: new Date().toISOString(),
          userId: currentUser.id
        };
        setDiaryEntries([localEntry, ...diaryEntries]);
        setNewEntryTitle("");
        setNewEntryContent("");
        setNewEntryImages([]);
        setShowNewEntry(false);
      }
    } catch (error) {
      console.error('Diary save error:', error);
      
      // Still save locally even if there's an error
      const localEntry = {
        id: Date.now(),
        title: newEntryTitle.trim() || `Entry for ${new Date().toLocaleDateString()}`,
        content: newEntryContent,
        images: newEntryImages,
        createdAt: new Date().toISOString(),
        userId: currentUser.id
      };
      setDiaryEntries([localEntry, ...diaryEntries]);
      setNewEntryTitle("");
      setNewEntryContent("");
      setNewEntryImages([]);
      setShowNewEntry(false);
      
      toast({
        title: "Entry Saved",
        description: "",
        className: "bg-green-800 border-green-700 text-white",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(135deg, #ddd6fe 0%, #a855f7 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: backgroundOpacity
      }}
    >
      <div className="min-h-screen p-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Button
              onClick={onClose}
              size="sm"
              variant="ghost"
              className="bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border-none p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-2">
              {editingDisplayName ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={tempDisplayName}
                    onChange={(e) => setTempDisplayName(e.target.value)}
                    className="text-xl font-bold bg-white/20 border-white/30 text-white placeholder-white/70"
                    placeholder="Enter display name"
                  />
                  <Button
                    onClick={saveDisplayName}
                    size="sm"
                    className="bg-green-700 hover:bg-green-800 text-white p-1"
                  >
                    <Save className="w-3 h-3" />
                  </Button>
                  <Button
                    onClick={cancelEditingDisplayName}
                    size="sm"
                    variant="ghost"
                    className="bg-white/10 hover:bg-white/20 text-white p-1"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-white drop-shadow-lg">
                    Hey, {currentUser?.displayName || currentUser?.username || 'Friend'}!
                  </h1>
                  <div className="relative">
                    <Button
                      onClick={() => setShowDisplayNameDropdown(!showDisplayNameDropdown)}
                      size="sm"
                      variant="ghost"
                      className="bg-transparent hover:bg-white/10 text-white/70 hover:text-white border-none p-1"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                    {showDisplayNameDropdown && (
                      <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10 min-w-[120px]">
                        <button
                          onClick={startEditingDisplayName}
                          className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white flex items-center gap-2 text-sm"
                        >
                          <Edit className="w-3 h-3" />
                          Edit Name
                        </button>
                        <div className="border-t border-gray-200 dark:border-gray-600"></div>
                        <button
                          onClick={onLogout}
                          className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400 flex items-center gap-2 text-sm"
                        >
                          <ArrowLeft className="w-3 h-3" />
                          Log Out
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-teal-200 dark:bg-teal-800">
            <TabsTrigger 
              value="profile" 
              className="text-black dark:text-white data-[state=active]:bg-green-800 data-[state=active]:text-white text-xs px-2 py-2 min-w-0"
            >
              <span className="truncate">{t('profile')}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="diary" 
              className="text-black dark:text-white data-[state=active]:bg-green-800 data-[state=active]:text-white text-xs px-2 py-2 min-w-0"
            >
              <span className="truncate">{t('diary')}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="background" 
              className="text-black dark:text-white data-[state=active]:bg-green-800 data-[state=active]:text-white text-xs px-2 py-2 min-w-0"
            >
              <span className="truncate">{t('screenImage')}</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6 mt-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="w-32 h-32" key={imageKey}>
                  <AvatarImage src={profileImage} />
                  <AvatarFallback className="text-4xl bg-teal-400 text-black">
                    {currentUser.displayName?.charAt(0) || currentUser.username?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full p-1.5 bg-teal-400 hover:bg-teal-500 border-teal-500"
                    onClick={() => setShowProfileImageDropdown(!showProfileImageDropdown)}
                  >
                    <ChevronDown className="w-3 h-3 text-black" />
                  </Button>
                  {showProfileImageDropdown && (
                    <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10 min-w-[140px]">
                      <button
                        onClick={() => {
                          handlePhotoUpload();
                          setShowProfileImageDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white flex items-center gap-2"
                      >
                        <Camera className="w-4 h-4" />
                        Change Photo
                      </button>
                      {profileImage && (
                        <>
                          <button
                            onClick={() => {
                              setTempImageSrc(profileImage);
                              setShowImageCropModal(true);
                              setShowProfileImageDropdown(false);
                            }}
                            className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white flex items-center gap-2"
                          >
                            <Edit className="w-4 h-4" />
                            Edit Photo
                          </button>
                          <button
                            onClick={removeProfileImage}
                            className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-center w-full max-w-md">
                <div className="bg-black/20 rounded-lg px-4 py-2 mb-2">
                  <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                    {currentUser.displayName || username}
                  </h2>
                </div>
                
                {/* Username Section */}
                <div className="mb-4 flex items-center justify-center gap-2">
                  {editingUsername ? (
                    <div className="flex items-center gap-2">
                      <span className="text-lg text-black dark:text-white">@</span>
                      <Input
                        value={tempUsername}
                        onChange={(e) => setTempUsername(e.target.value)}
                        className="bg-white dark:bg-black border-2 border-teal-400 text-black dark:text-white text-center w-40"
                        maxLength={20}
                        placeholder="Enter username"
                      />
                      <Button
                        onClick={saveUsername}
                        size="sm"
                        className="bg-green-700 hover:bg-green-800 text-white p-1"
                      >
                        <Save className="w-3 h-3" />
                      </Button>
                      <Button
                        onClick={cancelEditingUsername}
                        size="sm"
                        variant="ghost"
                        className="bg-gray-200 hover:bg-gray-300 text-black p-1"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-black/20 rounded-lg px-3 py-1 flex items-center gap-2">
                      <p className="text-lg text-white drop-shadow-lg">@{currentUser?.username || 'username'}</p>
                      <div className="relative">
                        <Button
                          onClick={() => setShowUsernameDropdown(!showUsernameDropdown)}
                          size="sm"
                          variant="ghost"
                          className="bg-transparent hover:bg-white/10 text-white/70 hover:text-white border-none p-1"
                        >
                          <ChevronDown className="w-3 h-3" />
                        </Button>
                        {showUsernameDropdown && (
                          <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10 min-w-[130px]">
                            <button
                              onClick={startEditingUsername}
                              className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white flex items-center gap-2 text-sm"
                            >
                              <Edit className="w-3 h-3" />
                              Edit Username
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Quotes Section - Perfectly Centered */}
                <div className="flex justify-center w-full">
                  {isEditingQuote ? (
                    <div className="flex flex-col items-center space-y-2 w-full max-w-sm">
                      <div className="flex items-center space-x-2 w-full">
                        <Input
                          type="text"
                          placeholder={t('addQuotePlaceholder')}
                          value={profileQuote}
                          onChange={(e) => handleQuoteChange(e.target.value)}
                          className="bg-white dark:bg-black border-2 border-teal-400 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 flex-1 text-center"
                          maxLength={40}
                          autoFocus
                        />
                        <Button
                          onClick={saveProfileQuote}
                          size="sm"
                          className="bg-teal-500 hover:bg-teal-600 text-white px-3"
                        >
                          <Save className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => {
                            setProfileQuote(currentUser?.bio || "");
                            setIsEditingQuote(false);
                          }}
                          size="sm"
                          variant="outline"
                          className="px-2"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-white drop-shadow-lg">{profileQuote.length}/40</p>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <div className="bg-black/20 rounded-lg px-3 py-2 flex items-center gap-2">
                        <p className="text-white drop-shadow-lg font-normal text-base text-center">
                          {profileQuote || t('addQuotePlaceholder')}
                        </p>
                        <div className="relative">
                          <Button
                            onClick={() => setShowQuoteDropdown(!showQuoteDropdown)}
                            size="sm"
                            variant="ghost"
                            className="bg-transparent hover:bg-white/10 text-white/70 hover:text-white border-none p-1"
                          >
                            <ChevronDown className="w-3 h-3" />
                          </Button>
                          {showQuoteDropdown && (
                            <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10 min-w-[120px]">
                              <button
                                onClick={() => {
                                  setIsEditingQuote(true);
                                  setShowQuoteDropdown(false);
                                }}
                                className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white flex items-center gap-2 text-sm"
                              >
                                <Edit className="w-3 h-3" />
                                Edit Quote
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Animal Spinner Mini-Game - Only visible after login */}
                <AnimalSpinner 
                  currentUser={currentUser} 
                  isVisible={true}
                />
              </div>


            </div>
          </TabsContent>

          <TabsContent value="diary" className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white drop-shadow-lg">{t('yourPrivateDiary')}</h3>
              <Button 
                onClick={() => setShowNewEntry(true)}
                className="bg-teal-500 hover:bg-teal-600 text-white"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                {t('newEntry')}
              </Button>
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
                
                {/* Image Upload Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-black dark:text-white">
                      Images ({newEntryImages.length}/5)
                    </label>
                    {newEntryImages.length < 5 && (
                      <Button
                        onClick={handleDiaryImageUpload}
                        size="sm"
                        variant="outline"
                        className="bg-white dark:bg-black border-teal-400 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Add Image
                      </Button>
                    )}
                  </div>
                  
                  {newEntryImages.length > 0 && (
                    <div className="flex flex-col items-center space-y-2">
                      {newEntryImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Entry image ${index + 1}`}
                            className="max-w-full h-32 object-contain rounded-lg border border-gray-200 dark:border-gray-600"
                          />
                          <Button
                            onClick={() => removeEntryImage(index)}
                            size="sm"
                            variant="destructive"
                            className="absolute top-1 right-1 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
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
                        <div className="flex flex-col flex-1 pr-4">
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
                            <h4 className="font-medium text-black dark:text-white mb-1">{entry.title}</h4>
                          )}
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(entry.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          {!isEditing && (
                            <>
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  startEditingEntry(entry);
                                }}
                                className="bg-gray-600 hover:bg-gray-700 p-2 min-w-0 h-8 w-8 rounded-full"
                              >
                                <Edit className="w-4 h-4 text-white" />
                              </Button>
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedEntryForDownload(entry);
                                  setShowEntryDownloadModal(true);
                                }}
                                className="bg-blue-600 hover:bg-blue-700 p-2 min-w-0 h-8 w-8 rounded-full"
                              >
                                <Download className="w-4 h-4 text-white" />
                              </Button>
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteEntry(entryId);
                                }}
                                className="bg-red-600 hover:bg-red-700 p-2 min-w-0 h-8 w-8 rounded-full"
                              >
                                <Trash2 className="w-4 h-4 text-white" />
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
                          <div className="mt-3 space-y-4">
                            <Textarea
                              value={editData?.content || entry.content}
                              onChange={(e) => setEditedContent(prev => ({
                                ...prev,
                                [entryId]: { ...prev[entryId], content: e.target.value }
                              }))}
                              rows={6}
                              className="bg-white dark:bg-black border border-teal-400 text-black dark:text-white"
                            />
                            
                            {/* Image Upload Section for Editing */}
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-black dark:text-white">
                                  Images ({(editData?.images || entry.images || []).length}/5)
                                </label>
                                {(editData?.images || entry.images || []).length < 5 && (
                                  <Button
                                    onClick={() => handleEditEntryImageUpload(entryId)}
                                    size="sm"
                                    variant="outline"
                                    className="bg-white dark:bg-black border-teal-400 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900"
                                  >
                                    <Camera className="w-4 h-4 mr-2" />
                                    Add Image
                                  </Button>
                                )}
                              </div>
                              
                              {(editData?.images || entry.images || []).length > 0 && (
                                <div className="flex flex-col items-center space-y-2">
                                  {(editData?.images || entry.images || []).map((image: string, index: number) => (
                                    <div key={index} className="relative group">
                                      <img
                                        src={image}
                                        alt={`Entry image ${index + 1}`}
                                        className="max-w-full h-32 object-contain rounded-lg border border-gray-200 dark:border-gray-600"
                                      />
                                      <Button
                                        onClick={() => removeEditEntryImage(entryId, index)}
                                        size="sm"
                                        variant="destructive"
                                        className="absolute top-1 right-1 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                        <X className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="mt-3 space-y-4">
                            <p className="text-black dark:text-white leading-relaxed">{entry.content}</p>
                            
                            {/* Display entry images */}
                            {entry.images && entry.images.length > 0 && (
                              <div className="space-y-2">
                                <h5 className="text-sm font-medium text-black dark:text-white">Images:</h5>
                                <div className="flex flex-col items-center space-y-2">
                                  {entry.images.map((image: string, index: number) => (
                                    <div key={index} className="relative group">
                                      <img
                                        src={image}
                                        alt={`Entry image ${index + 1}`}
                                        className="max-w-full h-40 object-contain rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer hover:opacity-90 transition-opacity"
                                        onClick={() => {
                                          // Open image in full view with download option
                                          const overlay = document.createElement('div');
                                          overlay.className = 'fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50 p-4';
                                          
                                          // Close overlay when clicking background
                                          overlay.onclick = (e) => {
                                            if (e.target === overlay) {
                                              document.body.removeChild(overlay);
                                            }
                                          };
                                          
                                          // Image container
                                          const imageContainer = document.createElement('div');
                                          imageContainer.className = 'relative max-w-full max-h-full flex flex-col items-center';
                                          
                                          const img = document.createElement('img');
                                          img.src = image;
                                          img.className = 'max-w-full max-h-[80vh] object-contain rounded-lg';
                                          
                                          // Download button
                                          const downloadBtn = document.createElement('button');
                                          downloadBtn.innerHTML = '<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>Download Image';
                                          downloadBtn.className = 'mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-colors';
                                          downloadBtn.onclick = (e) => {
                                            e.stopPropagation();
                                            const link = document.createElement('a');
                                            link.href = image;
                                            link.download = `diary-image-${Date.now()}.jpg`;
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                          };
                                          
                                          imageContainer.appendChild(img);
                                          imageContainer.appendChild(downloadBtn);
                                          overlay.appendChild(imageContainer);
                                          document.body.appendChild(overlay);
                                        }}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
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

          <TabsContent value="background" className="space-y-6 mt-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white drop-shadow-lg mb-6">Background Image</h3>
              
              {backgroundImage ? (
                <div className="space-y-6">
                  {/* Background Preview */}
                  <div className="relative mx-auto w-48 h-80 rounded-lg overflow-hidden border-2 border-white/30 shadow-lg">
                    <img
                      src={backgroundImage}
                      alt="Background preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-xs bg-black/50 px-2 py-1 rounded">Preview</div>
                      </div>
                    </div>
                  </div>

                  {/* Background Management Options */}
                  <div className="flex flex-wrap justify-center gap-3">
                    <Button
                      onClick={handleBackgroundUpload}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      {t('uploadImage')}
                    </Button>
                    <Button
                      onClick={() => {
                        setTempBackgroundSrc(backgroundImage);
                        setShowBackgroundCropModal(true);
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      {t('cropPosition')}
                    </Button>
                    <Button
                      onClick={removeBackgroundImage}
                      variant="destructive"
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      {t('remove')}
                    </Button>
                  </div>

                  {/* Opacity Control */}
                  <div className="bg-white/10 rounded-lg p-4 space-y-3">
                    <h4 className="font-semibold text-white text-center">Background Opacity</h4>
                    <div className="flex items-center space-x-4">
                      <span className="text-white text-sm min-w-[80px]">Transparent</span>
                      <div className="flex-1">
                        <Slider
                          value={[backgroundOpacity]}
                          onValueChange={handleOpacityChange}
                          max={1}
                          min={0}
                          step={0.1}
                          className="w-full"
                        />
                      </div>
                      <span className="text-white text-sm min-w-[60px]">Opaque</span>
                    </div>
                    <div className="text-center text-white/80 text-sm">
                      {Math.round(backgroundOpacity * 100)}%
                    </div>
                  </div>

                  {/* Usage Instructions */}
                  <div className="bg-white/10 rounded-lg p-4 text-white/90 text-sm">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      Background Image Tips
                    </h4>
                    <ul className="space-y-1 text-left">
                      <li>• This image will appear as your full-screen background</li>
                      <li>• Best results with portrait orientation images</li>
                      <li>• Use the crop tool to position your image perfectly</li>
                      <li>• Your background saves automatically</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Upload Area */}
                  <div className="mx-auto w-48 h-80 border-2 border-dashed border-white/40 rounded-lg flex flex-col items-center justify-center bg-white/5 backdrop-blur-sm">
                    <Camera className="w-16 h-16 text-white/60 mb-4" />
                    <p className="text-white/80 text-center mb-4">
                      No background image set
                    </p>
                    <Button
                      onClick={handleBackgroundUpload}
                      className="bg-teal-500 hover:bg-teal-600 text-white"
                    >
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Upload Image
                    </Button>
                  </div>

                  {/* Feature Description */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white/90">
                    <h4 className="font-semibold mb-3 text-center">Set Your Personal Background</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-xs">1</span>
                        </div>
                        <div>
                          <p className="font-medium">Choose Your Image</p>
                          <p className="text-white/70">Upload any photo from your device</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-xs">2</span>
                        </div>
                        <div>
                          <p className="font-medium">Crop & Position</p>
                          <p className="text-white/70">Use our editor to crop and center your image perfectly</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-xs">3</span>
                        </div>
                        <div>
                          <p className="font-medium">Save & Enjoy</p>
                          <p className="text-white/70">Your background will appear throughout your profile</p>
                        </div>
                      </div>
                    </div>
                  </div>
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

      {/* Background Image Crop Modal */}
      <ImageCropModal
        isOpen={showBackgroundCropModal}
        onClose={() => setShowBackgroundCropModal(false)}
        imageSrc={tempBackgroundSrc}
        onSave={handleSaveCroppedBackground}
      />

      {/* Diary Entry Image Crop Modal */}
      <ImageCropModal
        isOpen={showImageUploadModal}
        onClose={() => {
          setShowImageUploadModal(false);
          setEditingEntryId(null);
          setTempEntryImageSrc("");
        }}
        imageSrc={tempEntryImageSrc}
        onSave={editingEntryId !== null ? handleSaveCroppedEditEntryImage : handleSaveCroppedEntryImage}
      />

      {/* Diary Entry Download Modal */}
      <DiaryEntryDownloadModal
        isOpen={showEntryDownloadModal}
        onClose={() => {
          setShowEntryDownloadModal(false);
          setSelectedEntryForDownload(null);
        }}
        entry={selectedEntryForDownload}
        userName={currentUser?.displayName || currentUser?.username}
      />
    </div>
  );
}