import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/use-language";

export default function RotatingAffirmations() {
  const { t } = useLanguage();
  const [currentAffirmation, setCurrentAffirmation] = useState(0);

  // Get affirmations from translations
  const affirmations = [
    t('youAreStronger'),
    t('youMatter'), 
    t('youAreNotAlone'),
    t('thisToWillPass'),
    t('youDeservePeace'),
    t('youAreLoved')
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAffirmation((prev) => (prev + 1) % affirmations.length);
    }, 7000); // Changes every 7 seconds

    return () => clearInterval(interval);
  }, [affirmations.length]);

  return (
    <section className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-800 dark:to-blue-800 text-white rounded-xl p-6 text-center border-2 border-purple-400 dark:border-purple-600">
      <div className="min-h-[80px] flex items-center justify-center">
        <p 
          key={currentAffirmation}
          className="text-lg font-bold animate-fade-in transition-opacity duration-1000"
          style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.5)' }}
        >
          {affirmations[currentAffirmation]}
        </p>
      </div>
      <div className="flex justify-center space-x-1 mt-4">
        {affirmations.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentAffirmation 
                ? 'bg-white scale-125' 
                : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}