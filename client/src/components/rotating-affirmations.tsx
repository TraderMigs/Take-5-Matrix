import { useState, useEffect } from "react";

const affirmations = [
  "You are stronger than you think",
  "This moment is temporary. You got this!",
  "You matter. Your life has value",
  "Help is always available",
  "You are not alone in this journey",
  "Every breath you take is a victory",
  "You have overcome challenges before",
  "Your feelings are valid and temporary",
  "Tomorrow can be different",
  "You are worthy of love and support",
  "Small steps forward are still progress",
  "You have the strength to get through this",
  "Your story isn't over yet",
  "There are people who care about you",
  "You are enough, just as you are",
  "Healing takes time, and that's okay",
  "You deserve peace and happiness",
  "Your courage to reach out shows strength",
  "Every day you survive is a win",
  "You have made it through 100% of your worst days"
];

export default function RotatingAffirmations() {
  const [currentAffirmation, setCurrentAffirmation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAffirmation((prev) => (prev + 1) % affirmations.length);
    }, 7000); // Changes every 7 seconds

    return () => clearInterval(interval);
  }, []);

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