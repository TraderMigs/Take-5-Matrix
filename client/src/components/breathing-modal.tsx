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
  const [count, setCount] = useState(5);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Audio refs for breathing sounds
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const breathingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const phaseInstructions = {
    inhale: "Breathe in slowly",
    hold: "Hold your breath",
    exhale: "Breathe out slowly",
    pause: "Pause",
  };

  const phaseDurations = {
    inhale: 5,
    hold: 5,
    exhale: 7,
    pause: 3,
  };

  // Create gentle breathing sound with soft tones
  const createBreathingSound = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const audioContext = audioContextRef.current;
    
    // Create oscillator for soft breathing tones
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Set initial frequency and volume - much softer
    oscillator.frequency.setValueAtTime(120, audioContext.currentTime); // Start at lower 120Hz
    gainNode.gain.setValueAtTime(0, audioContext.currentTime); // Start silent
    
    // Use triangle wave for softer, warmer tone
    oscillator.type = 'triangle';
    
    // Start the oscillator
    oscillator.start();
    
    return { oscillator, gainNode };
  };

  // Update breathing sound based on phase - gentle and soothing
  const updateBreathingSound = (currentPhase: string, timeRemaining: number, totalTime: number) => {
    if (!oscillatorRef.current || !gainRef.current || !audioContextRef.current) return;
    
    const audioContext = audioContextRef.current;
    const now = audioContext.currentTime;
    
    if (currentPhase === 'inhale') {
      // Gentle rising tone during inhale (120Hz to 180Hz) - much smaller range
      const progress = (totalTime - timeRemaining) / totalTime;
      const frequency = 120 + (progress * 60); // 120Hz to 180Hz
      oscillatorRef.current.frequency.exponentialRampToValueAtTime(frequency, now + 0.1);
      gainRef.current.gain.exponentialRampToValueAtTime(0.03, now + 0.1); // Much quieter
    } else if (currentPhase === 'exhale') {
      // Gentle falling tone during exhale (180Hz to 120Hz)
      const progress = (totalTime - timeRemaining) / totalTime;
      const frequency = 180 - (progress * 60); // 180Hz to 120Hz
      oscillatorRef.current.frequency.exponentialRampToValueAtTime(frequency, now + 0.1);
      gainRef.current.gain.exponentialRampToValueAtTime(0.03, now + 0.1); // Much quieter
    } else {
      // Gentle fade to silence during hold and pause
      gainRef.current.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    }
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
    if (gainRef.current) {
      gainRef.current = null;
    }
    if (breathingIntervalRef.current) {
      clearInterval(breathingIntervalRef.current);
      breathingIntervalRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  const startBreathing = () => {
    setIsActive(true);
    setPhase("inhale");
    setCount(5);

    // Start breathing sound
    const { oscillator, gainNode } = createBreathingSound();
    oscillatorRef.current = oscillator;
    gainRef.current = gainNode;

    intervalRef.current = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          setPhase((prevPhase) => {
            const phases: Array<"inhale" | "hold" | "exhale" | "pause"> = ["inhale", "hold", "exhale", "pause"];
            const currentIndex = phases.indexOf(prevPhase);
            const nextPhase = phases[(currentIndex + 1) % phases.length];
            return nextPhase;
          });
          return phaseDurations[phase] || 4;
        }
        // Update breathing sound based on current phase and remaining time
        updateBreathingSound(phase, prevCount - 1, phaseDurations[phase]);
        return prevCount - 1;
      });
    }, 1000);

    // Start sound update interval for smooth transitions
    breathingIntervalRef.current = setInterval(() => {
      setCount((currentCount) => {
        updateBreathingSound(phase, currentCount, phaseDurations[phase]);
        return currentCount;
      });
    }, 100); // Update sound 10 times per second for smooth transitions
  };

  const stopBreathing = () => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    stopAudio(); // Stop all audio when stopping the exercise
    setPhase("inhale");
    setCount(5);
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
    stopAudio(); // Ensure audio is stopped when modal closes
    onClose();
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
            <p className="text-gray-600 dark:text-gray-400">Follow the timer and breathe deeply with gentle audio guidance</p>
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
