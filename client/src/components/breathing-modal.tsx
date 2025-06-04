import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface BreathingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BreathingModal({ isOpen, onClose }: BreathingModalProps) {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<"ready" | "inhale" | "hold" | "exhale">("ready");
  const [count, setCount] = useState(5);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [cycleCount, setCycleCount] = useState(0);
  const [isFirstTime, setIsFirstTime] = useState(true);
  
  // Voice synthesis refs
  const speechSynthRef = useRef<SpeechSynthesis | null>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  const phaseInstructions = {
    ready: "Get comfortable and close your eyes",
    inhale: "Breathe in slowly through your nose",
    hold: "Hold your breath gently",
    exhale: "Breathe out slowly through your mouth",
  };

  const phaseDurations = {
    ready: 5,
    inhale: 4,
    hold: 4,
    exhale: 6,
  };

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      speechSynthRef.current = window.speechSynthesis;
      
      const loadVoices = () => {
        const voices = speechSynthRef.current?.getVoices() || [];
        
        // Priority 1: British female voices for natural, realistic speech
        const britishFemaleVoice = voices.find(voice => 
          (voice.lang.includes('en-GB') || voice.name.toLowerCase().includes('british') || voice.name.toLowerCase().includes('uk')) &&
          (voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('woman'))
        );
        
        // Priority 2: High-quality female voices with natural speech
        const qualityFemaleVoice = voices.find(voice => 
          voice.lang.startsWith('en') && 
          (voice.name.toLowerCase().includes('karen') ||
           voice.name.toLowerCase().includes('serena') ||
           voice.name.toLowerCase().includes('fiona') ||
           voice.name.toLowerCase().includes('samantha') ||
           voice.name.toLowerCase().includes('victoria') ||
           voice.name.toLowerCase().includes('susan'))
        );
        
        // Priority 3: Any English female voice
        const anyFemaleVoice = voices.find(voice => 
          voice.lang.startsWith('en') && 
          (voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('woman'))
        );
        
        voiceRef.current = britishFemaleVoice || qualityFemaleVoice || anyFemaleVoice || 
                          voices.find(voice => voice.lang.startsWith('en')) || voices[0];
        setVoicesLoaded(true);
      };

      // Load voices immediately if available
      loadVoices();
      
      // Also listen for voices changed event
      speechSynthRef.current.addEventListener('voiceschanged', loadVoices);
      
      return () => {
        speechSynthRef.current?.removeEventListener('voiceschanged', loadVoices);
      };
    }
  }, []);

  // Function to speak with gentle British female voice
  const speak = (text: string, rate: number = 0.6, callback?: () => void) => {
    if (!speechSynthRef.current || !voiceRef.current) return;
    
    // Cancel any ongoing speech
    speechSynthRef.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voiceRef.current;
    utterance.rate = rate; // Even slower for more human-like delivery
    utterance.pitch = 1.0; // Natural pitch for British accent
    utterance.volume = 0.9; // Clear, gentle volume
    
    // Add pauses for more natural speech
    const textWithPauses = text.replace(/\./g, '... ').replace(/,/g, ', ');
    utterance.text = textWithPauses;
    
    // Callback when speech ends
    if (callback) {
      utterance.onend = callback;
    }
    
    speechSynthRef.current.speak(utterance);
  };

  // Initial welcome message with proper timing
  const startWelcomeSequence = () => {
    setIsActive(true);
    setIsFirstTime(false);
    setCycleCount(0);
    
    // Welcome message with callback to ensure it completes before countdown
    speak("Welcome to your guided breathing exercise. Find a comfortable position, relax your shoulders, and close your eyes if you feel safe to do so.", 0.5, () => {
      // Only start countdown after welcome message completes
      setTimeout(() => {
        speak("Now, let's begin with a gentle countdown. We'll start in 5", 0.6, () => {
          setPhase("ready");
          setCount(5);
          startCountdown();
        });
      }, 1500);
    });
  };

  // Countdown sequence with slower, more natural timing
  const startCountdown = () => {
    let currentCount = 5;
    
    const countdownInterval = setInterval(() => {
      if (currentCount > 1) {
        currentCount--;
        speak(currentCount.toString(), 0.7);
        setCount(currentCount);
      } else {
        clearInterval(countdownInterval);
        speak("Begin breathing", 0.6, () => {
          startBreathingCycle();
        });
      }
    }, 1200); // Slightly slower countdown timing
  };

  // Main breathing cycle with slower, more natural guidance
  const startBreathingCycle = () => {
    setPhase("inhale");
    setCount(4);
    speak("Breathe in slowly and deeply through your nose", 0.5);
    
    let currentPhase: "inhale" | "hold" | "exhale" = "inhale";
    let currentCount = 4;
    
    intervalRef.current = setInterval(() => {
      currentCount--;
      setCount(currentCount);
      
      if (currentCount <= 0) {
        // Move to next phase
        if (currentPhase === "inhale") {
          currentPhase = "hold";
          currentCount = phaseDurations.hold;
          setPhase("hold");
          setCount(currentCount);
          speak("Hold your breath gently and peacefully", 0.5);
        } else if (currentPhase === "hold") {
          currentPhase = "exhale";
          currentCount = phaseDurations.exhale;
          setPhase("exhale");
          setCount(currentCount);
          speak("Breathe out slowly and completely through your mouth", 0.5);
        } else if (currentPhase === "exhale") {
          // Complete one cycle
          setCycleCount(prev => prev + 1);
          
          // Start next cycle
          currentPhase = "inhale";
          currentCount = phaseDurations.inhale;
          setPhase("inhale");
          setCount(currentCount);
          speak("Breathe in slowly once more", 0.5);
        }
      }
    }, 1000);
  };

  const stopBreathing = () => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    // Cancel any ongoing speech immediately
    if (speechSynthRef.current) {
      speechSynthRef.current.cancel();
    }
    
    setPhase("ready");
    setCount(5);
    setCycleCount(0);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (speechSynthRef.current) {
        speechSynthRef.current.cancel();
      }
    };
  }, []);

  const handleClose = () => {
    // Immediately stop all speech and timers
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (speechSynthRef.current) {
      speechSynthRef.current.cancel();
    }
    
    // Reset state
    setPhase("ready");
    setCount(5);
    setCycleCount(0);
    
    onClose();
  };

  const getPhaseColor = () => {
    switch (phase) {
      case "inhale": return "bg-blue-500";
      case "hold": return "bg-yellow-500";
      case "exhale": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getPhaseInstruction = () => {
    if (isFirstTime && !isActive) {
      return "Press Start to begin your guided breathing session";
    }
    return phaseInstructions[phase];
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-sm w-full mx-auto rounded-2xl bg-white dark:bg-black border-black dark:border-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" aria-describedby="breathing-description">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-black dark:text-white text-center">
            Guided Breathing
          </DialogTitle>
        </DialogHeader>
        <div id="breathing-description" className="sr-only">
          A guided breathing exercise with gentle female voice guidance to help you relax and center yourself
        </div>

        <div className="space-y-6 p-4">
          <div className="flex justify-center">
            <div className={`w-32 h-32 rounded-full border-4 border-gray-300 flex items-center justify-center transition-all duration-1000 ${isActive ? getPhaseColor() : 'bg-gray-100'}`}>
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl bg-black bg-opacity-20">
                {count}
              </div>
            </div>
          </div>

          <div className="space-y-2 text-center">
            <p className="text-lg font-medium text-black dark:text-white">
              {getPhaseInstruction()}
            </p>
            {isActive && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Cycle {cycleCount + 1} • Listen to the gentle guidance
              </p>
            )}
            {!isActive && !isFirstTime && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You can start and stop this exercise whenever you want
              </p>
            )}
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={isActive ? stopBreathing : startWelcomeSequence}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
              disabled={!voicesLoaded}
            >
              {isActive ? "Stop" : "Start Guided Breathing"}
            </Button>
            <Button
              onClick={handleClose}
              variant="secondary"
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-xl transition-colors"
            >
              Close
            </Button>
          </div>
          
          {!voicesLoaded && (
            <p className="text-xs text-center text-gray-500">
              Loading voice guidance...
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}