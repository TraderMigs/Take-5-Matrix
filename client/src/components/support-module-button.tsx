import { Button } from "@/components/ui/button";
import {
  CloudRain,
  Home,
  Heart,
  MessageCircle,
  Shield,
  Bandage,
  Egg,
} from "lucide-react";

interface SupportModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
}

interface SupportModuleButtonProps {
  module: SupportModule;
  onClick: () => void;
}

const iconMap = {
  "cloud-rain": CloudRain,
  home: Home,
  heart: Heart,
  "message-circle": MessageCircle,
  shield: Shield,
  bandage: Bandage,
  peace: Egg,
};

const colorMap = {
  "gentle-orange": "text-gentle-orange",
  "sage-green": "text-sage-green",
  "emergency-red": "text-emergency-red",
  "calm-blue": "text-calm-blue",
  "purple-500": "text-purple-500",
  "pink-500": "text-pink-500",
  "indigo-500": "text-indigo-500",
};

export default function SupportModuleButton({ module, onClick }: SupportModuleButtonProps) {
  const IconComponent = iconMap[module.icon as keyof typeof iconMap] || Heart;
  const iconColorClass = colorMap[module.color as keyof typeof colorMap] || "text-gray-500";

  return (
    <Button
      onClick={onClick}
      variant="outline"
      className="w-full bg-white border-2 border-gray-200 hover:border-calm-teal hover:bg-teal-50 p-5 rounded-xl transition-all text-left h-auto"
    >
      <div className="flex items-center w-full">
        <div className={`w-12 h-12 ${module.bgColor} rounded-xl flex items-center justify-center mr-4`}>
          <IconComponent className={`${iconColorClass} text-xl`} size={24} />
        </div>
        <div className="flex-1 text-left">
          <h3 className="font-semibold text-lg text-gray-800">{module.title}</h3>
          <p className="text-gray-600 text-sm">{module.description}</p>
        </div>
      </div>
    </Button>
  );
}
