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
      // Trigger Spider-Man themed confetti
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { 
        startVelocity: 30, 
        spread: 360, 
        ticks: 60, 
        zIndex: 0,
        colors: ['#e11d48', '#2563eb', '#000000', '#ffffff'] // Spider-Man colors
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
    <div className="w-full max-w-md mx-auto space-y-4 animate-bounce-in">
      <div className="bg-card rounded-2xl p-8 shadow-glow border-2 border-primary">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            🕷️ Your Choice:
          </h2>
          <Sparkles className="h-6 w-6 text-secondary" />
        </div>
        <p className="text-4xl font-bold text-center text-primary">
          {result}
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onSpinAgain}
          className="flex-1 gradient-primary hover:opacity-90 transition-smooth shadow-soft border-2 border-primary/50"
          size="lg"
        >
          <RotateCcw className="h-5 w-5 mr-2" />
          Spin Again
        </Button>
        <Button
          onClick={onClearAll}
          variant="outline"
          size="lg"
          className="border-2 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-smooth"
        >
          <Trash2 className="h-5 w-5 mr-2" />
          Clear All
        </Button>
      </div>
    </div>
  );
};
