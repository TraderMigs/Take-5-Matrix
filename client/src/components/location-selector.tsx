import { useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocalStorage } from "@/hooks/use-local-storage";

const locations = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "TH", name: "Thailand", flag: "🇹🇭" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "SE", name: "Sweden", flag: "🇸🇪" },
  { code: "NO", name: "Norway", flag: "🇳🇴" },
  { code: "DK", name: "Denmark", flag: "🇩🇰" },
  { code: "FI", name: "Finland", flag: "🇫🇮" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭" },
  { code: "AT", name: "Austria", flag: "🇦🇹" },
  { code: "BE", name: "Belgium", flag: "🇧🇪" },
  { code: "IE", name: "Ireland", flag: "🇮🇪" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿" },
];

export default function LocationSelector() {
  const [selectedLocation, setSelectedLocation] = useLocalStorage("take5-location", "US");

  const currentLocation = locations.find(loc => loc.code === selectedLocation) || locations[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="bg-white/20 dark:bg-black/20 hover:bg-white/30 dark:hover:bg-black/30 text-white dark:text-white border-none"
        >
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{currentLocation.flag}</span>
          <ChevronDown className="w-3 h-3 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="start" 
        className="bg-white dark:bg-black border-black dark:border-white w-56 max-h-60 overflow-y-auto"
      >
        {locations.map((location) => (
          <DropdownMenuItem
            key={location.code}
            onClick={() => setSelectedLocation(location.code)}
            className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer"
          >
            <span className="mr-2">{location.flag}</span>
            <span className="text-sm">{location.name}</span>
            {selectedLocation === location.code && (
              <span className="ml-auto text-green-600 dark:text-green-400">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}