import { useState, useEffect } from "react";
import { Search, Phone, Heart, Lightbulb, Users, Moon, Sun, MessageCircle, User, Shield } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useLanguage } from "@/hooks/use-language";
import BreathingModal from "@/components/breathing-modal";
import EmergencySection from "@/components/emergency-section";
import PersonalContacts from "@/components/personal-contacts";
import LanguageSelector from "@/components/language-selector";
import LocationSelector from "@/components/location-selector";
import AIChat from "@/components/ai-chat";
import UserAccount from "@/components/user-account-clean";
import UserProfileFullscreen from "@/components/user-profile-fullscreen";
import RotatingAffirmations from "@/components/rotating-affirmations";
import LegalAcceptance from "@/components/legal-acceptance";
import LegalModal from "@/components/legal-modal";
import EmailVerificationBanner from "@/components/email-verification-banner";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showBreathingModal, setShowBreathingModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState<any>(null);
  const [showAIChat, setShowAIChat] = useState(false);
  const [showUserAccount, setShowUserAccount] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [hasAcceptedLegal, setHasAcceptedLegal] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const { toast } = useToast();

  // Functions to handle profile view persistence
  const openProfileView = () => {
    setShowUserProfile(true);
    const url = new URL(window.location.href);
    url.searchParams.set('view', 'profile');
    window.history.pushState({}, '', url.toString());
  };

  const closeProfileView = () => {
    setShowUserProfile(false);
    const url = new URL(window.location.href);
    url.searchParams.delete('view');
    window.history.pushState({}, '', url.toString());
  };

  // Check for legal acceptance, saved user session, and profile view state
  useEffect(() => {
    const legalAccepted = localStorage.getItem('take5_legal_accepted');
    if (legalAccepted === 'true') {
      setHasAcceptedLegal(true);
    }

    // Check URL parameters for view state persistence
    const urlParams = new URLSearchParams(window.location.search);
    const viewParam = urlParams.get('view');
    if (viewParam === 'profile') {
      setShowUserProfile(true);
    }

    // Check for saved user session in localStorage first
    const savedUser = localStorage.getItem('take5_current_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('take5_current_user');
      }
    }

    // Also check server-side session for persistent login
    fetch('/api/auth/session')
      .then(response => response.json())
      .then(data => {
        if (data.authenticated && data.userData) {
          // Fetch the latest profile data from database to ensure all fields are current
          fetch(`/api/auth/profile?userId=${data.userData.id}`)
            .then(profileResponse => profileResponse.json())
            .then(profileData => {
              // Merge session data with latest profile data
              const updatedUser = {
                ...data.userData,
                ...profileData,
                // Preserve essential session fields
                id: data.userData.id,
                email: data.userData.email
              };
              setCurrentUser(updatedUser);
              localStorage.setItem('take5_current_user', JSON.stringify(updatedUser));
            })
            .catch(profileError => {
              console.error('Error fetching profile data:', profileError);
              // Fall back to session data if profile fetch fails
              setCurrentUser(data.userData);
              localStorage.setItem('take5_current_user', JSON.stringify(data.userData));
            });
        }
      })
      .catch(error => {
        console.error('Error checking server session:', error);
      });
  }, []);

  // Handle Google OAuth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authStatus = urlParams.get('auth');

    if (authStatus === 'success') {
      // Fetch user data from server session instead of URL
      fetch('/api/auth/session')
        .then(response => response.json())
        .then(data => {
          if (data.authenticated && data.userData) {
            setCurrentUser(data.userData);
            localStorage.setItem('take5_current_user', JSON.stringify(data.userData));
            
            toast({
              title: "Welcome!",
              description: `Successfully signed in with Google as ${data.userData.displayName || data.userData.email}`,
              className: "bg-green-800 border-green-700 text-white",
            });
            
            // Check for redirect after login
            const redirectTo = localStorage.getItem('take5_redirect_after_login');
            if (redirectTo === 'contacts') {
              localStorage.removeItem('take5_redirect_after_login');
              // Scroll to contacts section after a brief delay
              setTimeout(() => {
                const contactsSection = document.querySelector('[data-section="contacts"]');
                if (contactsSection) {
                  contactsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }, 1000);
            }
          }
        })
        .catch(error => {
          console.error('Error fetching session data:', error);
          toast({
            title: "Sign in issue",
            description: "Please try signing in again.",
            variant: "destructive",
          });
        });
      
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (authStatus === 'error') {
      const errorDetails = urlParams.get('details');
      console.error('OAuth error details:', errorDetails);
      
      toast({
        title: "Sign in failed",
        description: "There was an issue signing in with Google. Please try again.",
        variant: "destructive",
      });
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [toast]);

  const handleLegalAcceptance = () => {
    setHasAcceptedLegal(true);
    localStorage.setItem('take5_legal_accepted', 'true');
  };

  // Check for verification success
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('verified') === 'true') {
      toast({
        title: "Email Verified!",
        description: "Welcome to Take 5! You now have full access to all features.",
        className: "bg-green-800 border-green-700 text-white",
      });
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [toast]);

  const isEmailVerified = currentUser?.emailVerified || false;
  const needsVerification = currentUser && !isEmailVerified;

  const showActionOptions = (type: string, title: string, resourceUrl: string, customAction?: () => void) => {
    setSelectedAction({ type, title, resourceUrl, customAction });
    setShowActionModal(true);
  };

  const quickTools = [
    {
      id: "overwhelmed",
      title: t('feelOverwhelmed'),
      subtitle: t('breathingDescription'),
      icon: "💨",
      color: "#47556D",
      resource: "https://www.youtube.com/watch?v=nX4dpGQ5wF4",
      keywords: ["overwhelmed", "stressed", "too much", "can't cope", "pressure", "burden", "drowning", "suffocating", "chaos"],
      action: () => {
        if (!hasAcceptedLegal) {
          toast({
            title: "Terms Required",
            description: "Please accept the legal terms to use this feature.",
            variant: "destructive",
          });
          return;
        }
        if (needsVerification) {
          toast({
            title: "Email Verification Required",
            description: "Please verify your email to access breathing exercises.",
            variant: "destructive",
          });
          return;
        }
        showActionOptions("overwhelmed", "Feeling Overwhelmed Support", "https://www.youtube.com/watch?v=nX4dpGQ5wF4", () => setShowBreathingModal(true));
      }
    },
    {
      id: "anxious",
      title: t('feelAnxious'),
      subtitle: t('anxiousDescription'),
      icon: "😰",
      color: "#6B8E7B",
      resource: "https://www.youtube.com/watch?v=SA1Dz8BloUY",
      keywords: ["anxious", "anxiety", "panic", "worried", "nervous", "scared", "fear", "panic attack", "heart racing", "restless"],
      action: () => showActionOptions("anxious", "Anxiety Management Resources", "https://www.youtube.com/watch?v=SA1Dz8BloUY")
    },
    {
      id: "depressed", 
      title: t('feelDepressed'),
      subtitle: t('depressedDescription'),
      icon: "😢",
      color: "#47556D",
      resource: "https://www.youtube.com/watch?v=sWfNosruPPw",
      keywords: ["depressed", "depression", "sad", "hopeless", "empty", "numb", "worthless", "dark", "heavy", "lost"],
      action: () => showActionOptions("depressed", "Depression Support Resources", "https://www.youtube.com/watch?v=sWfNosruPPw")
    },
    {
      id: "talk",
      title: t('needToTalk'),
      subtitle: t('talkDescription'),
      icon: "💬",
      color: "#6B8E7B",
      resource: "https://www.youtube.com/@KatiMorton",
      keywords: ["talk", "listen", "alone", "lonely", "isolated", "need help", "support", "someone", "chat", "conversation"],
      action: () => showActionOptions("talk", "Mental Health Support", "https://www.youtube.com/@KatiMorton")
    }
  ];

  const supportModules = [
    {
      id: "breathing",
      title: t('breathing'),
      description: t('breathingGuide'),
      icon: "🫁",
      resource: "https://www.youtube.com/watch?v=ZXh-IGyBegQ",
      keywords: ["breathing", "breath", "breathe", "calm", "relax", "meditation", "mindfulness", "grounding"],
      action: () => showActionOptions("breathing", "Breathing Exercises", "https://www.youtube.com/watch?v=ZXh-IGyBegQ", () => setShowBreathingModal(true))
    },
    {
      id: "affirmations", 
      title: t('affirmations'),
      description: t('kindWords'),
      icon: "💭",
      resource: "https://www.youtube.com/user/TheHonestGuys",
      keywords: ["affirmations", "positive", "thoughts", "self-love", "confidence", "motivation", "encouragement", "uplifting"],
      action: () => showActionOptions("affirmations", "Mental Health Affirmations", "https://www.youtube.com/user/TheHonestGuys")
    },
    {
      id: "music",
      title: t('calmMusic'),
      description: t('soothingSounds'),
      icon: "🎵",
      resource: "https://www.youtube.com/@sleepeasyrelax",
      keywords: ["music", "sounds", "relaxing", "peaceful", "sleep", "ambient", "nature sounds", "white noise"],
      action: () => showActionOptions("music", "Relaxing Music Resources", "https://www.youtube.com/@sleepeasyrelax")
    },
    {
      id: "grounding",
      title: t('grounding'),
      description: t('groundingTechnique'),
      icon: "🌱",
      resource: "https://www.youtube.com/@GreatMeditation",
      keywords: ["grounding", "5-4-3-2-1", "present", "reality", "focus", "centering", "anchoring", "here and now"],
      action: () => showActionOptions("grounding", "Grounding Techniques", "https://www.youtube.com/@GreatMeditation")
    }
  ];

  // Search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredResults([]);
      setShowSearchResults(false);
      return;
    }

    const allOptions = [...quickTools, ...supportModules];
    const searchTerm = query.toLowerCase();
    
    const matches = allOptions.filter(option => {
      const titleMatch = option.title.toLowerCase().includes(searchTerm);
      const descriptionMatch = (option as any).description?.toLowerCase().includes(searchTerm) || 
                              (option as any).subtitle?.toLowerCase().includes(searchTerm);
      const keywordMatch = option.keywords?.some(keyword => 
        keyword.toLowerCase().includes(searchTerm) || 
        searchTerm.includes(keyword.toLowerCase())
      );
      
      return titleMatch || descriptionMatch || keywordMatch;
    });

    setFilteredResults(matches);
    setShowSearchResults(matches.length > 0);
  };

  const handleQuickToolClick = (tool: any) => {
    tool.action();
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.search-container')) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-black min-h-screen">
      {/* Email Verification Banner */}
      {needsVerification && (
        <EmailVerificationBanner 
          userEmail={currentUser.email}
        />
      )}

      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 dark:bg-black text-black dark:text-white text-center py-8 px-6 relative shimmer-mint">
        <div className="absolute top-4 left-4">
          <LocationSelector />
        </div>
        <div className="absolute top-4 right-4 flex gap-3">
          <LanguageSelector />
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white/20 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-black/30 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button
            onClick={() => currentUser ? openProfileView() : setShowUserAccount(true)}
            className="p-2 rounded-full bg-white/80 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 shadow-sm transition-colors"
            aria-label="User account"
          >
            <User className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mt-6 mb-4">
          <h1 className="text-4xl font-black mb-2 text-gray-700 dark:text-white" style={{ textShadow: '1px 1px 0px rgba(255,255,255,0.3)' }}>{t('appName')}</h1>
          <p className="text-lg font-bold opacity-90 text-gray-600 dark:text-white" style={{ textShadow: '1px 1px 0px rgba(255,255,255,0.3)' }}>{t('tagline')}</p>
        </div>
      </header>

      <main className="p-6 space-y-6 pb-20 bg-white dark:bg-black">
        {/* Search Bar */}
        <div className="relative search-container">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black dark:text-white w-4 h-4" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            className="search-input w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-black text-black dark:text-white placeholder-gray-500 focus:outline-none text-sm"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          
          {/* Search Results */}
          {showSearchResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
              {filteredResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => {
                    result.action();
                    setShowSearchResults(false);
                    setSearchQuery("");
                  }}
                  className="w-full p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{result.icon}</span>
                    <div>
                      <div className="font-semibold text-black dark:text-white">{result.title}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{result.subtitle || result.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Emergency Support */}
        <EmergencySection />

        {/* AI Chat Support */}
        <section className="space-y-4">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-xl shadow-lg text-white">
            <div className="flex items-center gap-3 mb-3">
              <MessageCircle className="w-8 h-8" />
              <div>
                <h3 className="text-lg font-bold">AI Support Chat</h3>
                <p className="text-purple-100 text-sm">I'm here. Talk to me.</p>
              </div>
            </div>
            <p className="text-purple-100 text-sm mb-4">
              Chat with our compassionate AI assistant for immediate support, coping strategies, and someone to listen.
            </p>
            <Button
              onClick={() => {
                if (!hasAcceptedLegal) {
                  toast({
                    title: "Terms Required",
                    description: "Please accept the legal terms to use the AI chat feature.",
                    variant: "destructive",
                  });
                  return;
                }
                if (needsVerification) {
                  toast({
                    title: "Email Verification Required",
                    description: "Please verify your email to access AI chat support.",
                    variant: "destructive",
                  });
                  return;
                }
                setShowAIChat(true);
              }}
              className="w-full bg-white text-purple-600 hover:bg-purple-50 font-semibold py-3 rounded-lg"
            >
              Start Conversation
            </Button>
          </div>
        </section>

        {/* Quick Tools */}
        <section className="space-y-4">
          <h2 className="text-xl font-black text-black dark:text-white mb-4 text-center" style={{ textShadow: '1px 1px 0px rgba(128,128,128,0.5)' }}>{t('howCanWeSupport')}</h2>
          <div className="space-y-3">
            {quickTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => handleQuickToolClick(tool)}
                className="w-full p-4 rounded-xl bg-white dark:bg-black border-2 border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors text-left shadow-lg"
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{tool.icon}</div>
                  <div>
                    <h3 className="font-bold text-black dark:text-white" style={{ textShadow: '1px 1px 0px rgba(128,128,128,0.3)' }}>{tool.title}</h3>
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-1">{tool.subtitle}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Support Modules */}
        <section className="space-y-4">
          <h2 className="text-xl font-black text-black dark:text-white mb-4 text-center" style={{ textShadow: '1px 1px 0px rgba(128,128,128,0.5)' }}>{t('additionalSupport')}</h2>
          <div className="grid grid-cols-2 gap-3">
            {supportModules.map((module) => (
              <button
                key={module.id}
                onClick={() => module.action()}
                className="p-4 rounded-xl bg-white dark:bg-black border-2 border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors text-center shadow-lg"
              >
                <div className="text-2xl mb-2">{module.icon}</div>
                <h3 className="font-bold text-black dark:text-white text-sm" style={{ textShadow: '1px 1px 0px rgba(128,128,128,0.3)' }}>{module.title}</h3>
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mt-1">{module.description}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Personal Contacts */}
        <PersonalContacts currentUser={currentUser} />

        {/* Safe Message */}
        <section className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 dark:bg-black text-black dark:text-white rounded-xl p-6 text-center space-y-3 border-2 border-black dark:border-white shimmer-mint">
          <h2 className="text-xl font-black text-gray-700 dark:text-white" style={{ textShadow: '1px 1px 0px rgba(255,255,255,0.3)' }}>{t('footerMessage1')}</h2>
          <p className="text-lg font-bold opacity-95 text-gray-600 dark:text-white" style={{ textShadow: '1px 1px 0px rgba(255,255,255,0.3)' }}>{t('footerMessage2')}</p>
          <p className="text-lg font-bold opacity-95 text-gray-600 dark:text-white" style={{ textShadow: '1px 1px 0px rgba(255,255,255,0.3)' }}>{t('footerMessage3')}</p>
          <p className="text-sm font-semibold opacity-90 text-gray-600 dark:text-white" style={{ textShadow: '1px 1px 0px rgba(255,255,255,0.3)' }}>{t('footerMessage4')}</p>
        </section>

        {/* Rotating Affirmations */}
        <RotatingAffirmations />
        
        {/* Footer with Legal Link */}
        <footer className="mt-8 text-center pb-4">
          <LegalModal>
            <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white underline">
              Legal Policies & Disclaimers
            </button>
          </LegalModal>
        </footer>
      </main>

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            if (!hasAcceptedLegal) {
              toast({
                title: "Terms Required",
                description: "Please accept the legal terms to use the AI chat feature.",
                variant: "destructive",
              });
              return;
            }
            if (needsVerification) {
              toast({
                title: "Email Verification Required", 
                description: "Please verify your email to access AI chat support.",
                variant: "destructive",
              });
              return;
            }
            setShowAIChat(true);
          }}
          className="w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          aria-label="Quick AI Chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Breathing Modal */}
      <BreathingModal 
        isOpen={showBreathingModal} 
        onClose={() => setShowBreathingModal(false)} 
      />

      {/* AI Chat Modal */}
      <AIChat
        isOpen={showAIChat}
        onClose={() => setShowAIChat(false)}
      />

      {/* User Account Modal for Login/Signup */}
      {!currentUser && (
        <UserAccount
          isOpen={showUserAccount}
          onClose={() => setShowUserAccount(false)}
          currentUser={currentUser}
          onLogin={(user) => {
            setCurrentUser(user);
            localStorage.setItem('take5_current_user', JSON.stringify(user));
            // Save to server session
            fetch('/api/auth/session', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userId: user.id, userData: user })
            }).catch(error => {
              console.error('Error saving server session:', error);
            });
          }}
          onLogout={() => {
            setCurrentUser(null);
            localStorage.removeItem('take5_current_user');
            // Clear server session
            fetch('/api/auth/session', { method: 'DELETE' }).catch(error => {
              console.error('Error clearing server session:', error);
            });
          }}
        />
      )}

      {/* Full Screen Profile for Logged In Users */}
      {currentUser && (
        <UserProfileFullscreen
          isOpen={showUserAccount}
          onClose={() => setShowUserAccount(false)}
          currentUser={currentUser}
          onLogout={() => {
            setCurrentUser(null);
            localStorage.removeItem('take5_current_user');
            // Clear server session
            fetch('/api/auth/session', { method: 'DELETE' }).catch(error => {
              console.error('Error clearing server session:', error);
            });
          }}
        />
      )}

      {/* Action Options Modal */}
      {showActionModal && selectedAction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
              {selectedAction.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Choose how you'd like to get help:
            </p>
            
            <div className="space-y-3">
              <button
                onClick={() => {
                  window.open(selectedAction.resourceUrl, '_blank');
                  setShowActionModal(false);
                }}
                className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 py-3 px-4 rounded-lg transition-colors"
              >
                {selectedAction.type === "breathing" ? "Breathing Channel" : 
                 selectedAction.type === "affirmations" ? "Affirmations Channel" :
                 selectedAction.type === "music" ? "Calming Channel" :
                 selectedAction.type === "grounding" ? "Grounding Channel" :
                 t('visitWebsite')}
              </button>
              
              {selectedAction.customAction && (
                <button
                  onClick={() => {
                    selectedAction.customAction();
                    setShowActionModal(false);
                  }}
                  className="w-full bg-purple-600 text-white hover:bg-purple-700 py-3 px-4 rounded-lg transition-colors"
                >
                  In-app Relaxation
                </button>
              )}
              
              <button
                onClick={() => {
                  setShowActionModal(false);
                  if (confirm("This will call emergency services. Continue?")) {
                    window.location.href = `tel:191`; // Using Thailand number as detected
                  }
                }}
                className="w-full bg-red-600 text-white hover:bg-red-700 py-3 px-4 rounded-lg transition-colors"
              >
                Call Emergency Services
              </button>
              
              <button
                onClick={() => setShowActionModal(false)}
                className="w-full bg-white dark:bg-black text-black dark:text-white border-2 border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-900 py-3 px-4 rounded-lg transition-colors"
              >
{t('cancel')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Profile Fullscreen View */}
      <UserProfileFullscreen
        isOpen={showUserProfile}
        onClose={closeProfileView}
        currentUser={currentUser}
        onLogout={() => {
          setCurrentUser(null);
          localStorage.removeItem('take5_current_user');
          closeProfileView();
          toast({
            title: "Logged out",
            description: "You have been successfully logged out.",
            className: "bg-green-800 border-green-700 text-white",
          });
        }}
      />

      {/* Legal Acceptance Modal - Required on First Visit */}
      <LegalAcceptance
        isOpen={!hasAcceptedLegal}
        onAccept={handleLegalAcceptance}
      />
    </div>
  );
}