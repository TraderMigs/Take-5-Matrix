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
  "gentle-orange": "text-primary-indigo",
  "sage-green": "text-accent-teal",
  "emergency-red": "text-emergency-red",
  "calm-blue": "text-primary-indigo",
  "purple-500": "text-primary-indigo",
  "pink-500": "text-accent-teal",
  "indigo-500": "text-primary-indigo",
};

export default function SupportModuleButton({ module, onClick }: SupportModuleButtonProps) {
  const IconComponent = iconMap[module.icon as keyof typeof iconMap] || Heart;
  const iconColorClass = colorMap[module.color as keyof typeof colorMap] || "text-gray-500";

  return (
    <Button
      onClick={onClick}
      variant="outline"
      className="w-full bg-white border-2 border-muted hover:border-primary-indigo hover:bg-soft-bg p-5 rounded-xl transition-all text-left h-auto"
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
