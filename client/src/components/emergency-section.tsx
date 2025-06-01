import { Button } from "@/components/ui/button";
import { Phone, Heart, TriangleAlert } from "lucide-react";
import { getEmergencyNumber, getCrisisHotline } from "@/lib/emergency-numbers";

export default function EmergencySection() {
  const handleEmergencyCall = () => {
    if (confirm("This will call emergency services. Continue?")) {
      window.location.href = `tel:${getEmergencyNumber()}`;
    }
  };

  const handleCrisisCall = () => {
    window.location.href = `tel:${getCrisisHotline()}`;
  };

  return (
    <section className="bg-red-50 border border-red-200 rounded-xl p-4">
      <h2 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
        <TriangleAlert className="mr-2" size={20} />
        Emergency Support
      </h2>
      <div className="space-y-3">
        <Button
          onClick={handleEmergencyCall}
          className="w-full bg-emergency-red hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center text-lg"
        >
          <Phone className="mr-3" size={20} />
          Call {getEmergencyNumber()} (Emergency)
        </Button>
        <Button
          onClick={handleCrisisCall}
          className="w-full bg-calm-blue hover:bg-indigo-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center text-lg"
        >
          <Heart className="mr-3" size={20} />
          Crisis Hotline: {getCrisisHotline()}
        </Button>
      </div>
    </section>
  );
}
