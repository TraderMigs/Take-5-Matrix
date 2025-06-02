import { useState } from "react";
import { Search, Phone, Heart, Lightbulb, Users, Moon, Sun, MessageCircle } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useLanguage } from "@/hooks/use-language";
import BreathingModal from "@/components/breathing-modal";
import EmergencySection from "@/components/emergency-section";
import PersonalContacts from "@/components/personal-contacts";
import LanguageSelector from "@/components/language-selector";
import LocationSelector from "@/components/location-selector";
import AIChat from "@/components/ai-chat";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showBreathingModal, setShowBreathingModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState<any>(null);
  const [showAIChat, setShowAIChat] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  const showActionOptions = (type: string, title: string, resourceUrl: string) => {
    setSelectedAction({ type, title, resourceUrl });
    setShowActionModal(true);
  };

  const quickTools = [
    {
      id: "overwhelmed",
      title: t('feelOverwhelmed'),
      subtitle: t('breathingDescription'),
      icon: "💨",
      color: "#47556D",
      action: () => setShowBreathingModal(true)
    },
    {
      id: "anxious",
      title: t('feelAnxious'),
      subtitle: t('anxiousDescription'),
      icon: "😰",
      color: "#6B8E7B",
      resource: "https://www.nimh.nih.gov/health/topics/anxiety-disorders",
      action: () => showActionOptions("anxious", "Anxiety Management Resources", "https://www.nimh.nih.gov/health/topics/anxiety-disorders")
    },
    {
      id: "depressed", 
      title: t('feelDepressed'),
      subtitle: t('depressedDescription'),
      icon: "😢",
      color: "#47556D",
      resource: "https://www.nimh.nih.gov/health/topics/depression",
      action: () => showActionOptions("depressed", "Depression Support Resources", "https://www.nimh.nih.gov/health/topics/depression")
    },
    {
      id: "talk",
      title: t('needToTalk'),
      subtitle: t('talkDescription'),
      icon: "💬",
      color: "#6B8E7B",
      resource: "https://www.7cups.com/",
      action: () => showActionOptions("talk", "Free Emotional Support - 7 Cups", "https://www.7cups.com/")
    }
  ];

  const supportModules = [
    {
      id: "breathing",
      title: t('breathing'),
      description: t('breathingGuide'),
      icon: "🫁",
      resource: "",
      action: () => setShowBreathingModal(true)
    },
    {
      id: "affirmations", 
      title: t('affirmations'),
      description: t('kindWords'),
      icon: "💭",
      resource: "https://www.mentalhealth.gov/basics/mental-health-myths-facts",
      action: () => showActionOptions("affirmations", "Mental Health Affirmations", "https://www.mentalhealth.gov/basics/mental-health-myths-facts")
    },
    {
      id: "music",
      title: t('calmMusic'),
      description: t('soothingSounds'),
      icon: "🎵",
      resource: "https://www.calm.com/blog/relaxing-music",
      action: () => showActionOptions("music", "Relaxing Music Resources", "https://www.calm.com/blog/relaxing-music")
    },
    {
      id: "grounding",
      title: t('grounding'),
      description: t('groundingTechnique'),
      icon: "🌱",
      resource: "https://www.va.gov/WHOLEHEALTHLIBRARY/tools/grounding-exercises.asp",
      action: () => showActionOptions("grounding", "Grounding Techniques", "https://www.va.gov/WHOLEHEALTHLIBRARY/tools/grounding-exercises.asp")
    }
  ];

  const handleQuickToolClick = (tool: any) => {
    tool.action();
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-black min-h-screen">
      {/* Header */}
      <header className="bg-black dark:bg-black text-white dark:text-white text-center py-8 px-6 relative">
        <div className="absolute top-4 left-4">
          <LocationSelector />
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <LanguageSelector />
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white/20 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-black/30 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>
        
        <h1 className="text-4xl font-black mb-2" style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.8)' }}>{t('appName')}</h1>
        <p className="text-lg font-bold opacity-90" style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.8)' }}>{t('tagline')}</p>
      </header>

      <main className="p-6 space-y-6 pb-20 bg-white dark:bg-black">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black dark:text-white w-4 h-4" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            className="search-input w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-black text-black dark:text-white placeholder-gray-500 focus:outline-none text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
              onClick={() => setShowAIChat(true)}
              className="w-full bg-white text-purple-600 hover:bg-purple-50 font-semibold py-3 rounded-lg"
            >
              Start Conversation
            </Button>
          </div>
        </section>

        {/* Quick Tools */}
        <section className="space-y-4">
          <h2 className="text-xl font-black text-black dark:text-white mb-4" style={{ textShadow: '1px 1px 0px rgba(128,128,128,0.5)' }}>{t('howCanWeSupport')}</h2>
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
        <PersonalContacts />

        {/* Safe Message */}
        <section className="bg-black dark:bg-black text-white dark:text-white rounded-xl p-6 text-center space-y-3 border-2 border-black dark:border-white">
          <h2 className="text-xl font-black" style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.8)' }}>{t('footerMessage1')}</h2>
          <p className="text-lg font-bold opacity-95" style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.8)' }}>{t('footerMessage2')}</p>
          <p className="text-lg font-bold opacity-95" style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.8)' }}>{t('footerMessage3')}</p>
          <p className="text-sm font-semibold opacity-90" style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.8)' }}>{t('footerMessage4')}</p>
        </section>
      </main>

      {/* Breathing Modal */}
      <BreathingModal 
        isOpen={showBreathingModal} 
        onClose={() => setShowBreathingModal(false)} 
      />

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
{t('visitWebsite')}
              </button>
              
              <button
                onClick={() => {
                  // This would trigger emergency call
                  setShowActionModal(false);
                  if (confirm("This will call emergency services. Continue?")) {
                    window.location.href = `tel:191`; // Using Thailand number as detected
                  }
                }}
                className="w-full bg-red-600 text-black hover:bg-red-700 py-3 px-4 rounded-lg transition-colors"
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
    </div>
  );
}