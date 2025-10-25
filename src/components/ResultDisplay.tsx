import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, RotateCcw, Trash2 } from "lucide-react";
import confetti from "canvas-confetti";

interface ResultDisplayProps {
  result: string | null;
  onSpinAgain: () => void;
  onClearAll: () => void;
}

export const ResultDisplay = ({ result, onSpinAgain, onClearAll }: ResultDisplayProps) => {
  useEffect(() => {
    if (result) {
      // Trigger confetti
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { 
        startVelocity: 30, 
        spread: 360, 
        ticks: 60, 
        zIndex: 0,
        colors: ['#a855f7', '#d946ef', '#ec4899', '#06b6d4', '#10b981'] // Vibrant choosy colors
      };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [result]);

  if (!result) return null;

  return (
    <div className="w-full mx-auto space-y-3 animate-bounce-in">
      <div className="bg-card rounded-xl p-5 shadow-glow border-2 border-primary">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-primary" />
          <h2 className="text-lg font-bold text-center text-primary">
            ✨ You should choose:
          </h2>
          <Sparkles className="h-4 w-4 text-accent" />
        </div>
        <p className="text-2xl font-bold text-center text-primary">
          {result}
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={onSpinAgain}
          className="flex-1 bg-primary hover:bg-primary/90 transition-smooth shadow-soft text-sm py-2"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Spin Again
        </Button>
        <Button
          onClick={onClearAll}
          variant="outline"
          className="border-2 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-smooth text-sm py-2"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear All
        </Button>
      </div>
    </div>
  );
};
