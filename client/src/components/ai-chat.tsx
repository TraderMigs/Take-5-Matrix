import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Bot, User, Volume2, VolumeX, Settings, Play, Pause } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  model?: string;
  audioUrl?: string;
}

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  onToolSelect?: (toolId: string) => void;
}

export default function AIChat({ isOpen, onClose, onToolSelect }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showContactList, setShowContactList] = useState(false);
  const [contacts, setContacts] = useState<any[]>([]);
  const [userName, setUserName] = useState("");
  const [showNameInput, setShowNameInput] = useState(true);
  const [highlightedTool, setHighlightedTool] = useState<string | null>(null);
  const [isAiMuted, setIsAiMuted] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('alloy');
  const [availableVoices, setAvailableVoices] = useState<any[]>([]);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const [lastAiMessageId, setLastAiMessageId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { t, language } = useLanguage();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Play audio from URL
  const playAudio = (audioUrl: string, messageId: string) => {
    if (isAiMuted || !audioUrl) return;
    
    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    setPlayingAudioId(messageId);
    
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    
    audio.onended = () => {
      setPlayingAudioId(null);
    };
    
    audio.onerror = () => {
      console.error('Audio playback failed');
      setPlayingAudioId(null);
    };
    
    audio.play().catch(error => {
      console.error('Audio play failed:', error);
      setPlayingAudioId(null);
    });
  };

  // Toggle audio playback
  const toggleAudio = (audioUrl: string, messageId: string) => {
    if (playingAudioId === messageId) {
      // Stop current audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setPlayingAudioId(null);
    } else {
      // Play new audio
      playAudio(audioUrl, messageId);
    }
  };

  // Load available voices on component mount
  useEffect(() => {
    fetch('/api/voice/available-voices')
      .then(res => res.json())
      .then(data => setAvailableVoices(data.voices))
      .catch(err => console.error('Failed to load voices:', err));
  }, []);

  // Load saved name and conversation history from localStorage on component mount
  useEffect(() => {
    const savedName = localStorage.getItem('take5-user-name');
    console.log('Loading saved name from localStorage:', savedName);
    if (savedName && savedName.trim()) {
      setUserName(savedName);
      setShowNameInput(false);
      console.log('Name loaded successfully, hiding input');
    } else {
      console.log('No saved name found, showing input');
      setShowNameInput(true);
    }

    // Load last conversation history
    const savedHistory = localStorage.getItem('take5-chat-history');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        // Convert timestamp strings back to Date objects
        const historyWithDates = parsedHistory.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(historyWithDates);
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    }
  }, []);

  // Reset states when dialog opens
  useEffect(() => {
    if (isOpen) {
      // Only show welcome message if no conversation history exists and user has a name
      if (messages.length === 0 && userName && !showNameInput) {
        const welcomeBackMessage: Message = {
          id: Date.now().toString(),
          text: t('aiWelcomeMessage'),
          sender: "ai",
          timestamp: new Date(),
        };
        setMessages([welcomeBackMessage]);
      }

      // Load emergency contacts if they exist
      setContacts([]);
    }
  }, [isOpen, userName, messages.length, showNameInput, t]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Save conversation history to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('take5-chat-history', JSON.stringify(messages));
    }
  }, [messages]);

  const handleNameSubmit = () => {
    if (userName.trim()) {
      localStorage.setItem('take5-user-name', userName.trim());
      setShowNameInput(false);
      
      // Send a welcome message immediately after name is set
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: t('aiWelcomeMessage'),
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    // Start typing indicator after a brief delay
    setTimeout(() => {
      setIsTyping(true);
    }, 300);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputText.trim(),
          userName: userName,
          conversationHistory: messages,
          language
        }),
      });

      setIsTyping(false);

      if (response.ok) {
        const data = await response.json();
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          sender: "ai",
          timestamp: new Date(),
          model: data.model,
          audioUrl: data.audioUrl
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setLastAiMessageId(aiMessage.id);

        // Auto-play audio if not muted and audio is available
        if (!isAiMuted && data.audioUrl) {
          setTimeout(() => {
            playAudio(data.audioUrl, aiMessage.id);
          }, 500);
        }

        // Handle tool suggestions
        if (data.suggestedTool) {
          setTimeout(() => {
            if (onToolSelect) {
              onToolSelect(data.suggestedTool);
              setHighlightedTool(data.suggestedTool);
              setTimeout(() => setHighlightedTool(null), 3000);
            }
          }, 1000);
        }

        // Handle emergency contact requests
        if (data.showEmergencyContacts) {
          setShowContactList(true);
        }
      } else {
        throw new Error('Failed to get AI response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setIsTyping(false);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble responding right now. Please try again in a moment, or if this is urgent, please reach out to a crisis helpline.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmergencyContact = (contact: any) => {
    if (contact.phone) {
      window.location.href = `tel:${contact.phone}`;
    }
    setShowContactList(false);
  };

  if (showNameInput) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-11/12 max-w-md rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
          <DialogHeader>
            <DialogTitle className="text-center text-blue-800 dark:text-blue-200">
              {t('welcomeMessage')}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-center text-gray-600 dark:text-gray-300">
              {t('namePrompt')}
            </p>
            <div className="flex space-x-2">
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder={t('enterName')}
                onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
                className="flex-1"
              />
              <Button 
                onClick={handleNameSubmit}
                disabled={!userName.trim()}
                className="px-6"
              >
                {t('start')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-11/12 max-w-2xl h-[80vh] flex flex-col rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-blue-800 dark:text-blue-200">
              {t('aiChatTitle')} - {userName}
            </DialogTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowVoiceSettings(!showVoiceSettings)}
                className="text-gray-600 dark:text-gray-300"
              >
                <Settings className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAiMuted(!isAiMuted)}
                className="text-gray-600 dark:text-gray-300"
              >
                {isAiMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          
          {showVoiceSettings && (
            <div className="mt-2 p-3 bg-white dark:bg-gray-800 rounded-lg">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Voice Selection:
              </label>
              <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select voice" />
                </SelectTrigger>
                <SelectContent>
                  {availableVoices.map((voice) => (
                    <SelectItem key={voice.id} value={voice.id}>
                      {voice.name} - {voice.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </DialogHeader>

        <ScrollArea className="flex-1 px-4 py-2">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "ai" && (
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div
                  className={`max-w-[75%] rounded-lg px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white ml-auto"
                      : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  
                  {message.sender === "ai" && (
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        {message.model && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                            {message.model === 'gpt-3.5-turbo' ? '💙 Emotional Support' : '🧠 General Wellness'}
                          </span>
                        )}
                        
                        {message.audioUrl && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleAudio(message.audioUrl!, message.id)}
                            className="h-6 w-6 p-0 text-gray-500 dark:text-gray-400 hover:text-blue-500"
                          >
                            {playingAudioId === message.id ? (
                              <Pause className="w-3 h-3" />
                            ) : (
                              <Play className="w-3 h-3" />
                            )}
                          </Button>
                        )}
                      </div>
                      
                      <span className="text-xs text-gray-400">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  )}
                </div>

                {message.sender === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-2 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <form onSubmit={handleSubmit} className="flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t('typeMessage')}
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={!inputText.trim() || isLoading}
              className="px-6"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}