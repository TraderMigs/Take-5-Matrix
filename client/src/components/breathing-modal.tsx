import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface BreathingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BreathingModal({ isOpen, onClose }: BreathingModalProps) {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "pause">("inhale");
  const [count, setCount] = useState(4);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Audio refs for breathing sounds
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const phaseInstructions = {
    inhale: "Breathe in slowly",
    hold: "Hold your breath",
    exhale: "Breathe out slowly",
    pause: "Pause",
  };

  const phaseDurations = {
    inhale: 4,
    hold: 4,
    exhale: 6,
    pause: 2,
  };

  // Initialize audio context for breathing sounds
  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  };

  // Create gentle breathing sound effect
  const createBreathingSound = (type: "inhale" | "exhale") => {
    if (!audioContextRef.current) return;

    // Stop any existing oscillator
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current = null;
    }

    const audioContext = audioContextRef.current;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Set frequency for gentle breathing sound
    const baseFrequency = type === "inhale" ? 200 : 150;
    oscillator.frequency.setValueAtTime(baseFrequency, audioContext.currentTime);

    // Create smooth volume envelope
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 0.5); // Very gentle volume
    gainNode.gain.linearRampToValueAtTime(0.02, audioContext.currentTime + 2);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 4);

    // Use sine wave for soft, natural sound
    oscillator.type = "sine";
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 4);

    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;
  };

  // Stop all audio
  const stopAudio = () => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
      } catch (e) {
        // Oscillator may already be stopped
      }
      oscillatorRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  const startBreathing = () => {
    initAudio(); // Initialize audio context
    setIsActive(true);
    setPhase("inhale");
    setCount(4);

    // Start with inhale sound
    setTimeout(() => {
      createBreathingSound("inhale");
    }, 100);

    intervalRef.current = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          setPhase((prevPhase) => {
            const phases: Array<"inhale" | "hold" | "exhale" | "pause"> = ["inhale", "hold", "exhale", "pause"];
            const currentIndex = phases.indexOf(prevPhase);
            const nextPhase = phases[(currentIndex + 1) % phases.length];
            
            // Play breathing sounds for inhale and exhale phases
            if (nextPhase === "inhale") {
              setTimeout(() => createBreathingSound("inhale"), 100);
            } else if (nextPhase === "exhale") {
              setTimeout(() => createBreathingSound("exhale"), 100);
            }
            
            return nextPhase;
          });
          return phaseDurations[phase] || 4;
        }
        return prevCount - 1;
      });
    }, 1000);
  };

  const stopBreathing = () => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    stopAudio(); // Stop all audio when stopping the exercise
    setPhase("inhale");
    setCount(4);
  };

  useEffect(() => {
    if (phase && isActive) {
      setCount(phaseDurations[phase]);
    }
  }, [phase, isActive]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleClose = () => {
    stopBreathing();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-sm w-full mx-4 rounded-2xl bg-white dark:bg-black border-black dark:border-white" aria-describedby="breathing-description">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-black dark:text-white text-center">
            Guided Breathing
          </DialogTitle>
        </DialogHeader>
        <div id="breathing-description" className="sr-only">
          A guided breathing exercise to help you calm down and center yourself
        </div>

        <div className="space-y-6 p-4">
          <div className="flex justify-center">
            <div className="w-32 h-32 rounded-full border-4 border-navy-blue flex items-center justify-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ background: 'linear-gradient(to right, #47556D, #6B8E7B)' }}>
                {count}
              </div>
            </div>
          </div>

          <div className="space-y-2 text-center">
            <p className="text-lg font-medium text-black dark:text-white">
              {phaseInstructions[phase]}
            </p>
            <p className="text-gray-600 dark:text-gray-400">Follow the timer and breathe deeply</p>
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={isActive ? stopBreathing : startBreathing}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              {isActive ? "Stop" : "Start"}
            </Button>
            <Button
              onClick={handleClose}
              variant="secondary"
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-xl transition-colors"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
