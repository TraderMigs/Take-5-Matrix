import { Button } from "@/components/ui/button";
import { Wind, Heart, Music, Anchor } from "lucide-react";

interface QuickTool {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  action: () => void;
}

interface QuickToolButtonProps {
  tool: QuickTool;
  onClick: () => void;
}

const iconMap = {
  wind: Wind,
  heart: Heart,
  music: Music,
  anchor: Anchor,
};

export default function QuickToolButton({ tool, onClick }: QuickToolButtonProps) {
  const IconComponent = iconMap[tool.icon as keyof typeof iconMap] || Heart;

  return (
    <Button
      onClick={onClick}
      variant="outline"
      className="bg-white hover:bg-gray-50 p-4 rounded-xl border border-gray-200 transition-colors text-center h-auto"
    >
      <div className="flex flex-col items-center space-y-2">
        <IconComponent className={`${tool.color} text-2xl`} size={24} />
        <div>
          <p className="font-medium text-gray-800 text-sm">{tool.title}</p>
          <p className="text-xs text-gray-600">{tool.subtitle}</p>
        </div>
      </div>
    </Button>
  );
}
