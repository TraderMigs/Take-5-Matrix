import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Heart, TriangleAlert, MapPin } from "lucide-react";
import { getLocationBasedNumbers, detectUserLocation } from "@/lib/emergency-numbers";

export default function EmergencySection() {
  const [locationData, setLocationData] = useState<{
    emergency: string;
    crisis: string;
    name: string;
  } | null>(null);
  const [isDetecting, setIsDetecting] = useState(true);

  useEffect(() => {
    const getLocationNumbers = async () => {
      try {
        const location = await detectUserLocation();
        const numbers = getLocationBasedNumbers(location?.countryCode);
        setLocationData(numbers);
      } catch (error) {
        // Fallback to default
        const numbers = getLocationBasedNumbers();
        setLocationData(numbers);
      } finally {
        setIsDetecting(false);
      }
    };

    getLocationNumbers();
  }, []);

  const handleEmergencyCall = () => {
    if (locationData && confirm("This will call emergency services. Continue?")) {
      window.location.href = `tel:${locationData.emergency}`;
    }
  };

  const handleCrisisCall = () => {
    if (locationData) {
      window.location.href = `tel:${locationData.crisis}`;
    }
  };

  return (
    <section className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <TriangleAlert className="mr-2 text-red-600" size={20} />
          <h2 className="text-lg font-semibold text-red-800 dark:text-red-300">Emergency Support</h2>
        </div>
        {locationData && (
          <div className="flex items-center space-x-1 text-xs text-red-600 dark:text-red-400">
            <MapPin className="w-3 h-3" />
            <span>{locationData.name}</span>
          </div>
        )}
      </div>
      
      {isDetecting ? (
        <div className="text-center py-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">Detecting your location...</div>
        </div>
      ) : (
        <div className="space-y-3">
          <Button
            onClick={handleEmergencyCall}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center text-lg"
          >
            <Phone className="mr-3" size={20} />
            Call {locationData?.emergency} (Emergency)
          </Button>
          <Button
            onClick={handleCrisisCall}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center text-lg"
          >
            <Heart className="mr-3" size={20} />
            Crisis Hotline: Call Now
          </Button>
        </div>
      )}
      
      <p className="text-xs text-red-600 dark:text-red-400 mt-3 text-center">
        If you're in immediate danger, call emergency services
      </p>
    </section>
  );
}
