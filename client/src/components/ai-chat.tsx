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

  const { t, language } = useLanguage();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reset states when dialog opens
  useEffect(() => {
    if (isOpen) {
      if (messages.length === 0) {
        // Show name input for first-time users
        if (!userName) {
          setShowNameInput(true);
        } else {
          // Welcome back existing users
          const welcomeBackMessage: Message = {
            id: Date.now().toString(),
            text: `Welcome back, ${userName}! I'm here to support you. How are you feeling today?`,
            sender: "ai",
            timestamp: new Date(),
          };
          setMessages([welcomeBackMessage]);
        }
      }

      // Load contacts for emergency assistance
      fetch('/api/contacts')
        .then(res => res.json())
        .then(data => setContacts(data))
        .catch(err => console.error('Failed to load contacts:', err));
    }
  }, [isOpen, userName, messages.length]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleNameSubmit = () => {
    if (userName.trim()) {
      setShowNameInput(false);
      
      // Send welcome message after name is provided
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: `Hello ${userName}! I'm your AI support companion. I'm here to listen and help you through whatever you're experiencing. How are you feeling today?`,
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
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
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
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: data.response,
            sender: "ai",
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, aiMessage]);
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
              Welcome to Take 5 AI Support
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              I'm here to provide compassionate support. What would you like me to call you?
            </p>
            <Input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name or nickname"
              onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
              className="text-center"
              autoFocus
            />
            <Button
              onClick={handleNameSubmit}
              disabled={!userName.trim()}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              Start Conversation
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
          <DialogTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
            <Bot className="w-5 h-5 text-purple-600" />
            Take 5 - AI Support
          </DialogTitle>
        </DialogHeader>

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
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1"
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
            If you're in crisis, please call 988 or emergency services immediately
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}