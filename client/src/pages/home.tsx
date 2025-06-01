import { useState } from "react";
import { Search, Phone, Heart, TriangleAlert } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BreathingModal from "@/components/breathing-modal";
import SupportModuleButton from "@/components/support-module-button";
import QuickToolButton from "@/components/quick-tool-button";
import EmergencySection from "@/components/emergency-section";
import PersonalContacts from "@/components/personal-contacts";
import { getEmergencyNumber, getCrisisHotline } from "@/lib/emergency-numbers";
import { getRandomAffirmation } from "@/lib/affirmations";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showBreathingModal, setShowBreathingModal] = useState(false);
  const [currentView, setCurrentView] = useState("home");

  const supportModules = [
    {
      id: "overwhelmed",
      title: "I feel overwhelmed",
      description: "Breathing exercises and grounding techniques",
      icon: "cloud-rain",
      color: "gentle-orange",
      bgColor: "bg-yellow-50",
    },
    {
      id: "homeless",
      title: "I'm homeless",
      description: "Local resources and immediate assistance",
      icon: "home",
      color: "sage-green",
      bgColor: "bg-green-50",
    },
    {
      id: "suicidal",
      title: "I feel suicidal",
      description: "Immediate professional support available",
      icon: "heart",
      color: "emergency-red",
      bgColor: "bg-red-50",
    },
    {
      id: "talk",
      title: "I need someone to talk to",
      description: "Connect with trained listeners",
      icon: "message-circle",
      color: "calm-blue",
      bgColor: "bg-blue-50",
    },
    {
      id: "bullied",
      title: "I'm being bullied",
      description: "Protection resources and support",
      icon: "shield",
      color: "purple-500",
      bgColor: "bg-purple-50",
    },
    {
      id: "self-harm",
      title: "I've hurt myself",
      description: "Safe alternatives and medical guidance",
      icon: "bandage",
      color: "pink-500",
      bgColor: "bg-pink-50",
    },
    {
      id: "quiet-support",
      title: "I just want quiet support",
      description: "Peaceful exercises and affirmations",
      icon: "peace",
      color: "indigo-500",
      bgColor: "bg-indigo-50",
    },
  ];

  const quickTools = [
    {
      id: "breathing",
      title: "Breathing",
      subtitle: "5-min guide",
      icon: "wind",
      color: "text-calm-teal",
      action: () => setShowBreathingModal(true),
    },
    {
      id: "affirmations",
      title: "Affirmations",
      subtitle: "Kind words",
      icon: "heart",
      color: "text-pink-500",
      action: () => alert(getRandomAffirmation()),
    },
    {
      id: "music",
      title: "Calm Music",
      subtitle: "Soothing sounds",
      icon: "music",
      color: "text-purple-500",
      action: () => {
        // Open a calming music playlist
        window.open("https://www.youtube.com/results?search_query=calming+meditation+music", "_blank");
      },
    },
    {
      id: "grounding",
      title: "Grounding",
      subtitle: "5-4-3-2-1",
      icon: "anchor",
      color: "text-indigo-500",
      action: () => {
        alert(
          "Grounding Exercise (5-4-3-2-1):\n\n" +
          "• Name 5 things you can see\n" +
          "• Name 4 things you can touch\n" +
          "• Name 3 things you can hear\n" +
          "• Name 2 things you can smell\n" +
          "• Name 1 thing you can taste\n\n" +
          "Take your time with each step."
        );
      },
    },
  ];

  const handleModuleClick = (moduleId: string) => {
    const module = supportModules.find(m => m.id === moduleId);
    if (!module) return;

    switch (moduleId) {
      case "suicidal":
        if (confirm("You're taking a brave step by reaching out. Would you like to call the crisis hotline now?")) {
          window.location.href = `tel:${getCrisisHotline()}`;
        }
        break;
      case "overwhelmed":
        setShowBreathingModal(true);
        break;
      case "homeless":
        alert("Local Resources for Housing:\n\n• National Homeless Hotline: 1-877-482-6959\n• 211 for local services\n• Local shelter information\n• Food assistance programs\n\nYou deserve help and support.");
        break;
      case "talk":
        alert("Connect with Support:\n\n• Crisis Text Line: Text HOME to 741741\n• National Suicide Prevention Lifeline: 988\n• SAMHSA Helpline: 1-800-662-4357\n\nTrained counselors are available 24/7.");
        break;
      case "bullied":
        alert("Anti-Bullying Resources:\n\n• StopBullying.gov\n• Crisis Text Line: Text HOME to 741741\n• Contact school counselor or trusted adult\n• Document incidents\n\nYou don't have to face this alone.");
        break;
      case "self-harm":
        alert("Self-Harm Support:\n\n• Crisis Text Line: Text HOME to 741741\n• National Suicide Prevention Lifeline: 988\n• Consider reaching out to a trusted adult\n• Remove harmful objects from reach\n\nYour safety matters. Please reach out for help.");
        break;
      case "quiet-support":
        setShowBreathingModal(true);
        break;
      default:
        alert(`Opening ${module.title} support resources...`);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg">
      {/* Header */}
      <header className="bg-gradient-to-r from-calm-teal to-calm-blue text-white text-center py-8 px-6">
        <h1 className="text-3xl font-bold mb-2">Take 5</h1>
        <p className="text-lg opacity-90 leading-relaxed">
          Take 5 minutes. Take a breath. Take back control.
        </p>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6 space-y-6">
        {/* Search Section */}
        <section className="space-y-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Type how you feel: 'I'm alone', 'homeless', 'want to talk'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-4 pr-12 text-lg border-2 border-gray-200 rounded-xl focus:border-calm-blue focus:outline-none transition-colors"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </section>

        {/* Emergency Section */}
        <EmergencySection />

        {/* Support Modules */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            How can we support you right now?
          </h2>

          <div className="grid gap-4">
            {supportModules
              .filter(module =>
                searchQuery === "" ||
                module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                module.description.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((module) => (
                <SupportModuleButton
                  key={module.id}
                  module={module}
                  onClick={() => handleModuleClick(module.id)}
                />
              ))}
          </div>
        </section>

        {/* Quick Tools */}
        <section className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Support Tools</h2>

          <div className="grid grid-cols-2 gap-4">
            {quickTools.map((tool) => (
              <QuickToolButton key={tool.id} tool={tool} onClick={tool.action} />
            ))}
          </div>
        </section>

        {/* Personal Contacts */}
        <PersonalContacts />

        {/* Safe Message */}
        <section className="bg-gradient-to-r from-calm-teal to-sage-green text-white rounded-xl p-6 text-center space-y-3">
          <h2 className="text-xl font-semibold">You're not alone</h2>
          <p className="text-lg opacity-90">You matter. Your life has value. Help is always available.</p>
          <p className="text-sm opacity-80">This moment is temporary. You can get through this.</p>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex justify-around">
          <Button
            variant="ghost"
            className={`flex flex-col items-center space-y-1 ${
              currentView === "home" ? "text-calm-blue" : "text-gray-400 hover:text-calm-blue"
            }`}
            onClick={() => setCurrentView("home")}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="text-xs font-medium">Home</span>
          </Button>

          <Button
            variant="ghost"
            className="flex flex-col items-center space-y-1 text-gray-400 hover:text-calm-blue transition-colors"
            onClick={() => alert("Settings would allow personalization of the app, language selection, and emergency contact management.")}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-medium">Settings</span>
          </Button>

          <Button
            variant="ghost"
            className="flex flex-col items-center space-y-1 text-gray-400 hover:text-calm-blue transition-colors"
            onClick={() => alert("Resources would display additional mental health information, local services, and educational content.")}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            <span className="text-xs font-medium">Resources</span>
          </Button>

          <Button
            variant="ghost"
            className="flex flex-col items-center space-y-1 text-gray-400 hover:text-calm-blue transition-colors"
            onClick={() => {
              if (confirm("This will call emergency services. Continue?")) {
                window.location.href = `tel:${getEmergencyNumber()}`;
              }
            }}
          >
            <TriangleAlert className="w-5 h-5" />
            <span className="text-xs font-medium">SOS</span>
          </Button>
        </div>
      </nav>

      {/* Breathing Modal */}
      <BreathingModal
        isOpen={showBreathingModal}
        onClose={() => setShowBreathingModal(false)}
      />
    </div>
  );
}
