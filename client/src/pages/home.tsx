import { useState } from "react";
import { Search, Phone, Heart, Lightbulb, Users, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import BreathingModal from "@/components/breathing-modal";
import EmergencySection from "@/components/emergency-section";
import PersonalContacts from "@/components/personal-contacts";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showBreathingModal, setShowBreathingModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState<any>(null);
  const { theme, toggleTheme } = useTheme();

  const showActionOptions = (type: string, title: string, resourceUrl: string) => {
    setSelectedAction({ type, title, resourceUrl });
    setShowActionModal(true);
  };

  const quickTools = [
    {
      id: "overwhelmed",
      title: "I Feel Overwhelmed",
      subtitle: "Breathing exercises and grounding techniques",
      icon: "💨",
      color: "#47556D",
      action: () => setShowBreathingModal(true)
    },
    {
      id: "homeless",
      title: "I'm Homeless",
      subtitle: "Local resources and immediate assistance", 
      icon: "🏠",
      color: "#6B8E7B",
      resource: "https://www.nationalhomeless.org/factsheets/Mental_Illness.pdf",
      action: () => showActionOptions("homeless", "National Homeless Resources", "https://www.nationalhomeless.org/factsheets/Mental_Illness.pdf")
    },
    {
      id: "suicidal",
      title: "I Feel Suicidal",
      subtitle: "Immediate professional support available",
      icon: "💜",
      color: "#47556D", 
      resource: "https://suicidepreventionlifeline.org/help-yourself/",
      action: () => showActionOptions("suicidal", "Suicide Prevention Resources", "https://suicidepreventionlifeline.org/help-yourself/")
    },
    {
      id: "talk",
      title: "I Need Someone To Talk To",
      subtitle: "Connect with trained listeners",
      icon: "💬",
      color: "#6B8E7B",
      resource: "https://www.7cups.com/",
      action: () => showActionOptions("talk", "Free Emotional Support - 7 Cups", "https://www.7cups.com/")
    },
    {
      id: "bullied",
      title: "I'm Being Bullied",
      subtitle: "Protection resources and support",
      icon: "🛡️",
      color: "#47556D",
      resource: "https://www.stopbullying.gov/resources",
      action: () => showActionOptions("bullied", "Anti-Bullying Resources", "https://www.stopbullying.gov/resources")
    },
    {
      id: "hurt",
      title: "I've Hurt Myself", 
      subtitle: "Safe alternatives and medical guidance",
      icon: "🩹",
      color: "#6B8E7B",
      resource: "https://www.selfinjury.bctr.cornell.edu/perch/resources/distraction-techniques.pdf",
      action: () => showActionOptions("hurt", "Self-Harm Alternatives", "https://www.selfinjury.bctr.cornell.edu/perch/resources/distraction-techniques.pdf")
    },
    {
      id: "quiet",
      title: "I Just Want Quiet Support",
      subtitle: "Peaceful exercises and affirmations",
      icon: "🕯️",
      color: "#47556D",
      resource: "https://www.mindful.org/meditation/mindfulness-getting-started/",
      action: () => showActionOptions("quiet", "Mindfulness Resources", "https://www.mindful.org/meditation/mindfulness-getting-started/")
    }
  ];

  const supportModules = [
    {
      id: "breathing",
      title: "Breathing",
      description: "5-min guide",
      icon: "🫁",
      resource: "",
      action: () => setShowBreathingModal(true)
    },
    {
      id: "affirmations", 
      title: "Affirmations",
      description: "Kind words",
      icon: "💭",
      resource: "https://www.mentalhealth.gov/basics/mental-health-myths-facts",
      action: () => showActionOptions("affirmations", "Mental Health Affirmations", "https://www.mentalhealth.gov/basics/mental-health-myths-facts")
    },
    {
      id: "music",
      title: "Calm Music",
      description: "Soothing sounds",
      icon: "🎵",
      resource: "https://www.calm.com/blog/relaxing-music",
      action: () => showActionOptions("music", "Relaxing Music Resources", "https://www.calm.com/blog/relaxing-music")
    },
    {
      id: "grounding",
      title: "Grounding",
      description: "5-4-3-2-1",
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
      <header className="bg-black dark:bg-white text-white dark:text-black text-center py-8 px-6 relative">
        <button
          onClick={toggleTheme}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-black/30 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>
        
        <h1 className="text-4xl font-bold mb-2">Take 5</h1>
        <p className="text-lg opacity-90">Take 5 minutes. Take a breath. Take back control.</p>
      </header>

      <main className="p-6 space-y-6 pb-20 bg-white dark:bg-black">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black dark:text-white w-4 h-4" />
          <input
            type="text"
            placeholder="Type how you feel: 'I'm alone', 'homeless', 'want to die'..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-black text-black dark:text-white placeholder-gray-500 border-2 border-black dark:border-white focus:outline-none text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Emergency Support */}
        <EmergencySection />

        {/* Quick Tools */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-black dark:text-white mb-4">How can we support you right now?</h2>
          <div className="space-y-3">
            {quickTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => handleQuickToolClick(tool)}
                className="w-full p-4 rounded-xl bg-white dark:bg-black border-2 border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors text-left"
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{tool.icon}</div>
                  <div>
                    <h3 className="font-medium text-black dark:text-white">{tool.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{tool.subtitle}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Support Modules */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-black dark:text-white mb-4">Additional Support</h2>
          <div className="grid grid-cols-2 gap-3">
            {supportModules.map((module) => (
              <button
                key={module.id}
                onClick={() => module.action()}
                className="p-4 rounded-xl bg-white dark:bg-black border-2 border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors text-center"
              >
                <div className="text-2xl mb-2">{module.icon}</div>
                <h3 className="font-medium text-black dark:text-white text-sm">{module.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{module.description}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Personal Contacts */}
        <PersonalContacts />

        {/* Safe Message */}
        <section className="bg-black dark:bg-white text-white dark:text-black rounded-xl p-6 text-center space-y-3 border-2 border-black dark:border-white">
          <h2 className="text-xl font-semibold">You're not alone</h2>
          <p className="text-lg opacity-95">You matter. Your life has value. Help is always available.</p>
          <p className="text-sm opacity-90">This moment is temporary. You can get through this.</p>
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
                Visit Resource Website
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
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}