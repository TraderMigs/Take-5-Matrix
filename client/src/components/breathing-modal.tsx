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
  
  // Audio refs for ocean waves
  const audioContextRef = useRef<AudioContext | null>(null);
  const oceanSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const oceanGainRef = useRef<GainNode | null>(null);

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

  // Create gentle breathing sound using Web Audio API
  const createBreathingSound = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const audioContext = audioContextRef.current;
    
    // Create buffer for ocean wave sound (2 seconds of audio data)
    const bufferSize = audioContext.sampleRate * 2;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const output = buffer.getChannelData(0);

    // Generate ocean wave sound using multiple noise layers
    for (let i = 0; i < bufferSize; i++) {
      // Base white noise
      let sample = (Math.random() * 2 - 1) * 0.3;
      
      // Add wave-like modulation with multiple frequencies
      const time = i / audioContext.sampleRate;
      sample *= (0.5 + 0.3 * Math.sin(time * 0.5 * Math.PI)); // Slow wave cycle
      sample *= (0.7 + 0.2 * Math.sin(time * 1.2 * Math.PI)); // Medium wave
      sample *= (0.8 + 0.15 * Math.sin(time * 2.8 * Math.PI)); // Fast ripples
      
      // Apply low-pass filtering effect
      if (i > 0) {
        sample = sample * 0.7 + output[i - 1] * 0.3;
      }
      
      output[i] = sample * 0.4; // Overall volume control
    }

    // Create and configure audio nodes
    const source = audioContext.createBufferSource();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();

    // Set up low-pass filter for ocean-like sound
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, audioContext.currentTime);
    filter.Q.setValueAtTime(0.5, audioContext.currentTime);

    // Connect audio chain
    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Configure source
    source.buffer = buffer;
    source.loop = true; // Loop continuously
    
    // Set volume
    gainNode.gain.setValueAtTime(0.6, audioContext.currentTime);

    // Start playing
    source.start();
    
    return { source, gainNode };
  };

  // Stop all audio
  const stopAudio = () => {
    if (oceanSourceRef.current) {
      try {
        oceanSourceRef.current.stop();
      } catch (e) {
        // Source may already be stopped
      }
      oceanSourceRef.current = null;
    }
    if (oceanGainRef.current) {
      oceanGainRef.current = null;
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

    // Start ocean waves sound
    const { source, gainNode } = createOceanWaves();
    oceanSourceRef.current = source;
    oceanGainRef.current = gainNode;

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
