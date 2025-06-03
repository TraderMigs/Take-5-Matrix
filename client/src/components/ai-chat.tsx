import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
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
  const [isAiMuted, setIsAiMuted] = useState(true);

  const [lastAiMessageId, setLastAiMessageId] = useState<string | null>(null);

  const { t, language } = useLanguage();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Text-to-speech function with warm, realistic voice
  const speakText = (text: string) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure voice settings for warm, realistic speech
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1.0; // Natural pitch
    utterance.volume = 0.8; // Comfortable volume
    
    // Function to set the best available voice
    const setVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      
      // Prioritize high-quality voices
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Premium') || 
        voice.name.includes('Enhanced') ||
        voice.name.includes('Neural') ||
        voice.name.includes('Samantha') ||
        voice.name.includes('Zira') ||
        (voice.lang.startsWith('en') && voice.name.includes('Female')) ||
        (voice.lang.startsWith('en') && voice.localService && !voice.name.includes('Male'))
      ) || voices.find(voice => 
        voice.lang.startsWith('en') && !voice.name.toLowerCase().includes('male')
      ) || voices.find(voice => voice.lang.startsWith('en'));
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    };
    
    // Ensure voices are loaded before selecting
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.addEventListener('voiceschanged', setVoice, { once: true });
    } else {
      setVoice();
    }
  };

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

      // Load contacts for emergency assistance
      fetch('/api/contacts')
        .then(res => res.json())
        .then(data => setContacts(data))
        .catch(err => console.error('Failed to load contacts:', err));
    }
  }, [isOpen, userName, messages.length]);

  // Save conversation history and auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    
    // Save only the last 6 messages (3 interactions) to localStorage
    if (messages.length > 0) {
      const lastSixMessages = messages.slice(-6);
      localStorage.setItem('take5-chat-history', JSON.stringify(lastSixMessages));
    }
  }, [messages]);

  const handleNameSubmit = () => {
    if (userName.trim()) {
      // Save name to localStorage for persistence
      const trimmedName = userName.trim();
      localStorage.setItem('take5-user-name', trimmedName);
      console.log('Saving name to localStorage:', trimmedName);
      setShowNameInput(false);
      
      // Send welcome message after name is provided
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: `Hey, ${trimmedName}! What's going on? Talk to me 🙏🏾`,
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
    const messageText = inputText.trim();
    setInputText("");
    setIsLoading(true);



    setIsTyping(true);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputText,
          userName: userName,
          conversationHistory: messages.slice(-6) // Send last 3 exchanges
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        setIsTyping(false);
        
        // Add small delay to simulate typing
        setTimeout(() => {
          const aiMessageId = (Date.now() + 1).toString();
          const aiMessage: Message = {
            id: aiMessageId,
            text: data.response,
            sender: "ai",
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, aiMessage]);
          setLastAiMessageId(aiMessageId);
          
          // Speak the AI response if not muted
          if (!isAiMuted && data.response) {
            speakText(data.response);
          }
          
          // Remove any injected feedback elements that might appear
          setTimeout(() => {
            const feedbackElements = document.querySelectorAll('[data-feedback], .feedback-popup, .emoji-feedback');
            feedbackElements.forEach(el => el.remove());
          }, 100);
        }, 1000);

        // Handle tool suggestions
        if (data.suggestedTool && onToolSelect) {
          setHighlightedTool(data.suggestedTool);
          setTimeout(() => setHighlightedTool(null), 3000);
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
        <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="text-center text-gray-800 dark:text-gray-200">
              {t('aiSupportChat')}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              {t('whatsYourName')}
            </p>
            <Input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder={t('enterYourName')}
              onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
              className="text-center bg-black text-white placeholder:text-gray-400 border-gray-600"
              autoFocus
            />
            <Button
              onClick={handleNameSubmit}
              disabled={!userName.trim()}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              {t('startConversation')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl h-[600px] bg-white dark:bg-gray-900 flex flex-col">
        <DialogHeader className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <DialogTitle className="flex items-center justify-between text-gray-800 dark:text-gray-200">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-600" />
              {t('aiSupportChat')}
            </div>
            {userName && (
              <button
                onClick={() => {
                  localStorage.removeItem('take5-user-name');
                  localStorage.removeItem('take5-chat-history');
                  setUserName('');
                  setShowNameInput(true);
                  setMessages([]);
                }}
                className="text-xs text-gray-500 hover:text-purple-600 transition-colors"
              >
                {t('changeNamePrompt')}
              </button>
            )}
          </DialogTitle>
        </DialogHeader>

        {/* Mute/Unmute AI Controls */}
        <div className="px-4 pb-2 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => {
              const newMutedState = !isAiMuted;
              setIsAiMuted(newMutedState);
              // Stop any ongoing speech when muting
              if (newMutedState) {
                window.speechSynthesis.cancel();
              }
            }}
            className="text-xs text-green-700 hover:text-green-800 transition-colors font-medium"
          >
            {isAiMuted ? t('unmuteAi') : 'Mute AI'}
          </button>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "ai" && (
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-purple-600" />
                  </div>
                )}
                
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                {message.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-purple-600" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Emergency Contacts Modal */}
        {showContactList && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Emergency Contacts</h3>
              <div className="space-y-2 mb-4">
                {contacts.filter(c => c.isEmergency).map((contact) => (
                  <Button
                    key={contact.id}
                    onClick={() => handleEmergencyContact(contact)}
                    variant="outline"
                    className="w-full justify-between"
                  >
                    <span>{contact.name}</span>
                    <span className="text-sm text-gray-500">{contact.phone}</span>
                  </Button>
                ))}
                <Button
                  onClick={() => window.location.href = 'tel:988'}
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  Crisis Lifeline: 988
                </Button>
              </div>
              <Button
                onClick={() => setShowContactList(false)}
                variant="outline"
                className="w-full"
              >
                Close
              </Button>
            </div>
          </div>
        )}

        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t('typeYourMessage')}
              disabled={isLoading}
              className="flex-1 bg-black text-white placeholder:text-gray-400 border-gray-600"
              autoFocus
            />
            <Button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
          
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            {t('crisisWarning')}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}