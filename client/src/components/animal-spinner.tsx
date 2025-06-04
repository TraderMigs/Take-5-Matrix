import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface AnimalSpinnerProps {
  currentUser: any;
  isVisible: boolean;
}

const animals = [
  { name: "Lion", emoji: "🦁" },
  { name: "Elephant", emoji: "🐘" },
  { name: "Panda", emoji: "🐼" },
  { name: "Tiger", emoji: "🐅" },
  { name: "Monkey", emoji: "🐵" },
  { name: "Dolphin", emoji: "🐬" },
  { name: "Penguin", emoji: "🐧" },
  { name: "Butterfly", emoji: "🦋" },
  { name: "Eagle", emoji: "🦅" },
  { name: "Rabbit", emoji: "🐰" },
  { name: "Fox", emoji: "🦊" },
  { name: "Owl", emoji: "🦉" },
  { name: "Koala", emoji: "🐨" },
  { name: "Giraffe", emoji: "🦒" },
  { name: "Zebra", emoji: "🦓" },
  { name: "Hippo", emoji: "🦛" },
  { name: "Octopus", emoji: "🐙" },
  { name: "Turtle", emoji: "🐢" },
  { name: "Flamingo", emoji: "🦩" },
  { name: "Unicorn", emoji: "🦄" }
];

export default function AnimalSpinner({ currentUser, isVisible }: AnimalSpinnerProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<typeof animals[0] | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [hasSpunToday, setHasSpunToday] = useState(false);
  const [rotation, setRotation] = useState(0);

  // Check if user has already spun today
  useEffect(() => {
    if (currentUser?.id) {
      const lastSpinDate = localStorage.getItem(`take5_animal_spin_${currentUser.id}`);
      const today = new Date().toDateString();
      
      if (lastSpinDate === today) {
        setHasSpunToday(true);
        // Load the animal they got today
        const todayAnimal = localStorage.getItem(`take5_animal_result_${currentUser.id}`);
        if (todayAnimal) {
          setSelectedAnimal(JSON.parse(todayAnimal));
        }
      }
    }
  }, [currentUser?.id]);

  const spinWheel = () => {
    if (isSpinning || hasSpunToday) return;

    setIsSpinning(true);
    
    // Generate random rotation (3-5 full spins + random angle)
    const spins = 3 + Math.random() * 2; // 3-5 full rotations
    const finalRotation = rotation + (spins * 360) + Math.random() * 360;
    setRotation(finalRotation);

    // After 3 seconds, show result
    setTimeout(() => {
      const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
      setSelectedAnimal(randomAnimal);
      setIsSpinning(false);
      setShowResult(true);
      setHasSpunToday(true);

      // Save to localStorage
      const today = new Date().toDateString();
      localStorage.setItem(`take5_animal_spin_${currentUser.id}`, today);
      localStorage.setItem(`take5_animal_result_${currentUser.id}`, JSON.stringify(randomAnimal));
    }, 3000);
  };

  const closeResult = () => {
    setShowResult(false);
  };

  if (!isVisible) return null;

  return (
    <div className="w-full max-w-md mx-auto mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
      <h3 className="text-center text-white font-bold text-lg mb-4">
        🎮 Daily Animal Spinner
      </h3>
      
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner Wheel */}
        <div className="relative">
          <div 
            className="w-32 h-32 rounded-full border-4 border-white bg-gradient-to-br from-yellow-400 via-pink-400 to-purple-500 flex items-center justify-center text-4xl cursor-pointer transition-transform duration-3000 ease-out"
            style={{ 
              transform: `rotate(${rotation}deg)`,
              background: `conic-gradient(from 0deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3, #54a0ff, #5f27cd, #ff6b6b)`
            }}
            onClick={spinWheel}
          >
            {isSpinning ? "🌀" : "🎯"}
          </div>
          
          {/* Pointer */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[16px] border-l-transparent border-r-transparent border-b-white"></div>
        </div>

        {/* Instructions */}
        <div className="text-center">
          {hasSpunToday ? (
            <div className="space-y-2">
              <p className="text-white text-sm">You already spun today!</p>
              {selectedAnimal && (
                <div className="bg-white/20 rounded-lg p-3">
                  <p className="text-white font-bold">
                    You are a {selectedAnimal.name} today! {selectedAnimal.emoji}
                  </p>
                </div>
              )}
              <p className="text-white/70 text-xs">Come back tomorrow for a new spin!</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-white text-sm font-medium">
                {isSpinning ? "Spinning..." : "Tap to spin!"}
              </p>
              <p className="text-white/70 text-xs">Discover your spirit animal for today</p>
            </div>
          )}
        </div>
      </div>

      {/* Result Modal */}
      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="max-w-sm w-[90vw] bg-gradient-to-br from-purple-500 to-pink-500 border-none text-white">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-white">
              🎉 Your Spirit Animal! 🎉
            </DialogTitle>
          </DialogHeader>
          
          <div className="text-center space-y-4 py-4">
            <div className="text-8xl mb-4">
              {selectedAnimal?.emoji}
            </div>
            
            <div className="space-y-2">
              <p className="text-xl font-bold text-white">
                {currentUser?.displayName || currentUser?.username}! Today you are
              </p>
              <p className="text-2xl font-bold text-yellow-300">
                a {selectedAnimal?.name} 😂🥰
              </p>
              <p className="text-lg text-white/90">
                Tune in tomorrow to see what you become!
              </p>
            </div>
            
            <Button 
              onClick={closeResult}
              className="mt-6 bg-white text-purple-600 hover:bg-gray-100 font-bold px-6 py-2"
            >
              Awesome! 🎊
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}