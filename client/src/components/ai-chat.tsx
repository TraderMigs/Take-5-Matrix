import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Mic, MicOff, Bot, User } from "lucide-react";
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
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showContactList, setShowContactList] = useState(false);
  const [contacts, setContacts] = useState<any[]>([]);
  const [userName, setUserName] = useState("");
  const [showNameInput, setShowNameInput] = useState(true);
  const [highlightedTool, setHighlightedTool] = useState<string | null>(null);
  const { t, language } = useLanguage();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Reset states when dialog opens
  useEffect(() => {
    if (isOpen) {
      loadContacts();
      
      // Load saved conversation and user name
      const savedName = localStorage.getItem('take5_ai_chat_name');
      const savedConversation = localStorage.getItem('take5_ai_chat_history');
      
      if (savedName) {
        setUserName(savedName);
        setShowNameInput(false);
        
        // Load previous conversation if exists (last 3 interactions)
        if (savedConversation && messages.length === 0) {
          try {
            const parsedHistory = JSON.parse(savedConversation);
            const historyWithDates = parsedHistory.map((msg: any) => ({
              ...msg,
              timestamp: new Date(msg.timestamp)
            }));
            
            const welcomeBackMessage: Message = {
              id: Date.now().toString(),
              text: `Hi again, ${savedName}! I remember our last conversation. How are you feeling right now?`,
              sender: "ai",
              timestamp: new Date()
            };
            
            setMessages([...historyWithDates, welcomeBackMessage]);
          } catch (error) {
            console.error('Error loading conversation history:', error);
            const welcomeMessage: Message = {
              id: Date.now().toString(),
              text: `Welcome back, ${savedName}! How are you feeling today?`,
              sender: "ai",
              timestamp: new Date()
            };
            setMessages([welcomeMessage]);
          }
        } else if (messages.length === 0) {
          const welcomeMessage: Message = {
            id: Date.now().toString(),
            text: `Welcome back, ${savedName}! How are you feeling today?`,
            sender: "ai",
            timestamp: new Date()
          };
          setMessages([welcomeMessage]);
        }
      } else if (messages.length === 0 && !showNameInput) {
        const welcomeMessage: Message = {
          id: Date.now().toString(),
          text: `Hi there! I'm Take 5, your supportive companion. I'm here to listen and help you feel seen and supported. What's on your mind today?`,
          sender: "ai",
          timestamp: new Date()
        };
        setMessages([welcomeMessage]);
      }
    } else {
      // Save conversation history before closing (last 3 user-AI interactions)
      if (messages.length > 0) {
        saveConversationHistory();
      }
      // Reset when closing
      setMessages([]);
      setShowNameInput(userName ? false : true);
    }
  }, [isOpen]);

  const loadContacts = async () => {
    try {
      const response = await fetch('/api/contacts');
      if (response.ok) {
        const contactData = await response.json();
        setContacts(contactData);
      }
    } catch (error) {
      console.log('No contacts available yet');
    }
  };

  const saveConversationHistory = () => {
    if (messages.length < 2) return; // Need at least user message + AI response
    
    // Extract last 3 pairs of user-AI interactions (6 messages total)
    const userAIPairs = [];
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].sender === 'ai' && i > 0 && messages[i-1].sender === 'user') {
        userAIPairs.unshift(messages[i-1], messages[i]);
        if (userAIPairs.length >= 6) break; // 3 pairs = 6 messages
      }
    }
    
    // Only save meaningful conversations (exclude welcome messages)
    const meaningfulHistory = userAIPairs.filter(msg => 
      !(msg.sender === 'ai' && (
        msg.text.includes('Hi again') || 
        msg.text.includes('Welcome back') ||
        msg.text.includes('How are you feeling right now?')
      ))
    );
    
    if (meaningfulHistory.length > 0) {
      localStorage.setItem('take5_ai_chat_history', JSON.stringify(meaningfulHistory));
    }
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
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
          message: text.trim(),
          conversationHistory: messages.slice(-5), // Send last 5 messages for context
          language: language, // Send user's language for multilingual responses
          userName: userName // Send user's name for personalized responses
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: typeof data.response === 'string' ? data.response : data.response.response || data.response,
          sender: "ai",
          timestamp: new Date()
        };
        setMessages(prev => {
          const newMessages = [...prev, aiMessage];
          // Save conversation history after each AI response
          setTimeout(() => {
            // Extract last 3 pairs of user-AI interactions for saving
            const userAIPairs = [];
            for (let i = newMessages.length - 1; i >= 0; i--) {
              if (newMessages[i].sender === 'ai' && i > 0 && newMessages[i-1].sender === 'user') {
                userAIPairs.unshift(newMessages[i-1], newMessages[i]);
                if (userAIPairs.length >= 6) break; // 3 pairs = 6 messages
              }
            }
            
            // Only save meaningful conversations (exclude welcome messages)
            const meaningfulHistory = userAIPairs.filter(msg => 
              !(msg.sender === 'ai' && (
                msg.text.includes('Hi again') || 
                msg.text.includes('Welcome back') ||
                msg.text.includes('How are you feeling right now?')
              ))
            );
            
            if (meaningfulHistory.length > 0) {
              localStorage.setItem('take5_ai_chat_history', JSON.stringify(meaningfulHistory));
            }
          }, 100);
          return newMessages;
        });
        setIsTyping(false);
        
        // Check if this is a crisis response that should show contacts
        if (data.showContacts && data.isCrisis) {
          setShowContactList(true);
        }
        
        // Optional: Speak the AI response
        if (synthRef.current && data.response.length < 200) {
          const utterance = new SpeechSynthesisUtterance(data.response);
          utterance.rate = 0.9;
          utterance.pitch = 1;
          utterance.volume = 0.7;
          synthRef.current.speak(utterance);
        }
      }, 1000); // Add slight delay for more natural feel

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment, or consider reaching out to one of the crisis resources above.",
        sender: "ai",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  const startVoiceInput = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopVoiceInput = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleClose = () => {
    // Stop any ongoing speech
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
    setMessages([]);
    setInputText("");
    setIsListening(false);
    setIsTyping(false);
    setShowNameInput(true);
    setUserName("");
    onClose();
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      setShowNameInput(false);
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: `Hi ${userName}! I'm Take 5, your supportive companion. I'm here to listen and help you feel seen and supported. What's on your mind today?`,
        sender: "ai",
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md w-full mx-4 h-[500px] flex flex-col bg-white dark:bg-black border-black dark:border-white" aria-describedby="ai-chat-description">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-black dark:text-white text-center flex items-center justify-center gap-2">
            <Bot className="w-6 h-6 text-purple-600" />
            Take 5 - AI Support
          </DialogTitle>
        </DialogHeader>
        <div id="ai-chat-description" className="sr-only">
          Chat with Take 5, your supportive AI companion for emotional support and guidance
        </div>

        {showNameInput ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-4">
            <Bot className="w-16 h-16 text-purple-600 mb-4" />
            <h3 className="text-lg font-medium text-black dark:text-white text-center">
              Hi there! I'm Take 5
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
              I'm your supportive companion. Before we chat, what would you like me to call you?
            </p>
            <form onSubmit={handleNameSubmit} className="w-full space-y-4">
              <Input
                type="text"
                placeholder="Enter your name..."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                autoFocus
              />
              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                disabled={!userName.trim()}
              >
                Start Chatting
              </Button>
            </form>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Your conversations are private and supportive
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 p-4 space-y-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex items-start gap-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === "user" 
                          ? "bg-purple-600 text-white" 
                          : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                      }`}>
                        {message.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                      </div>
                      <div className={`p-3 rounded-2xl ${
                        message.sender === "user"
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
                      }`}>
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>

        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-white dark:bg-black text-black dark:text-white border-gray-300 dark:border-gray-600"
              disabled={isLoading}
            />
            <Button
              type="button"
              onClick={isListening ? stopVoiceInput : startVoiceInput}
              className={`p-2 ${isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'} text-white`}
              disabled={isLoading}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
            <Button
              type="submit"
              className="p-2 bg-purple-600 hover:bg-purple-700 text-white"
              disabled={isLoading || !inputText.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>

        {/* Emergency Contact List Overlay */}
        {showContactList && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg max-w-sm w-full mx-4">
              <h3 className="text-lg font-semibold mb-4 text-center text-gray-900 dark:text-white">
                Your Trusted Contacts
              </h3>
              
              {contacts.length > 0 ? (
                <div className="space-y-3">
                  {contacts.map((contact: any) => (
                    <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{contact.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{contact.relationship}</p>
                      </div>
                      <Button
                        onClick={() => window.open(`tel:${contact.phone}`, '_self')}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2"
                      >
                        Call
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    You haven't added any trusted contacts yet. You can add them from the main page.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Or call emergency services: 911 (US) or your local emergency number
                  </p>
                </div>
              )}
              
              <div className="flex gap-2 mt-6">
                <Button
                  onClick={() => setShowContactList(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Continue Chat
                </Button>
                <Button
                  onClick={() => {
                    setShowContactList(false);
                    onClose();
                  }}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Close Chat
                </Button>
              </div>
            </div>
          </div>
        )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}