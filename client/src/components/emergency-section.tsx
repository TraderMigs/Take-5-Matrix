import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Heart, TriangleAlert, MapPin, Settings } from "lucide-react";
import { getLocationBasedNumbers, detectUserLocation, getAllCountries } from "@/lib/emergency-numbers";
import { useLanguage } from "@/hooks/use-language";

export default function EmergencySection() {
  const { t } = useLanguage();
  const [locationData, setLocationData] = useState<{
    emergency: string;
    crisis: string;
    name: string;
  } | null>(null);
  const [isDetecting, setIsDetecting] = useState(true);
  const [showLocationSelector, setShowLocationSelector] = useState(false);
  const [savedLocation, setSavedLocation] = useState<string | null>(null);

  useEffect(() => {
    const getLocationNumbers = async () => {
      try {
        // Check if user has saved a manual location
        const saved = localStorage.getItem('selectedLocation');
        if (saved) {
          const numbers = getLocationBasedNumbers(saved);
          setLocationData(numbers);
          setSavedLocation(saved);
          setIsDetecting(false);
          return;
        }

        // Otherwise detect location
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

  const handleLocationSelect = (countryCode: string) => {
    const numbers = getLocationBasedNumbers(countryCode);
    setLocationData(numbers);
    setSavedLocation(countryCode);
    localStorage.setItem('selectedLocation', countryCode);
    setShowLocationSelector(false);
  };

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
    <section className="border-2 border-black dark:border-white rounded-xl p-4 bg-white dark:bg-black">
      <div className="flex items-center justify-center mb-3">
        <div className="flex items-center">
          <TriangleAlert className="mr-2 text-black dark:text-white" size={20} />
          <h2 className="text-lg font-semibold text-black dark:text-white">{t('emergencySupport')}</h2>
        </div>
      </div>


      {showLocationSelector && (
        <div className="mb-4 p-3 border border-black dark:border-white rounded-lg bg-white dark:bg-black">
          <h3 className="text-sm font-medium text-black dark:text-white mb-2">Select Location:</h3>
          <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
            {getAllCountries().map((country: { code: string; name: string }) => (
              <button
                key={country.code}
                onClick={() => handleLocationSelect(country.code)}
                className="text-xs p-2 text-left border border-black dark:border-white rounded hover:bg-gray-100 dark:hover:bg-gray-900 text-black dark:text-white"
              >
                {country.name}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {isDetecting ? (
        <div className="text-center py-4">
          <div className="text-sm text-black dark:text-white">Detecting your location...</div>
        </div>
      ) : (
        <div className="space-y-3">
          <Button
            onClick={handleEmergencyCall}
            className="w-full bg-red-600 text-black hover:bg-red-700 font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center text-lg border-2 border-black"
          >
            <Phone className="mr-3" size={20} />
{t('callEmergency', { number: locationData?.emergency || '911' })}
          </Button>
          <Button
            onClick={handleCrisisCall}
            className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center text-lg border-2 border-black"
          >
            <Heart className="mr-3" size={20} />
{t('crisisHotline')}: {t('crisisHotlineCall')}
          </Button>
        </div>
      )}
      
      <p className="text-xs text-black dark:text-white mt-3 text-center">
{t('emergencyWarning')}
      </p>
    </section>
  );
}
