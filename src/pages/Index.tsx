import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SpinWheel } from "@/components/SpinWheel";
import { OptionInput } from "@/components/OptionInput";
import { ResultDisplay } from "@/components/ResultDisplay";

const Index = () => {
  const [options, setOptions] = useState<string[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const MIN_OPTIONS = 2;
  const MAX_OPTIONS = 10;

  const handleSpin = () => {
    if (options.length >= MIN_OPTIONS && !isSpinning) {
      setResult(null);
      setIsSpinning(true);
    }
  };

  const handleSpinComplete = (selectedOption: string) => {
    setIsSpinning(false);
    setResult(selectedOption);
  };

  const handleSpinAgain = () => {
    setResult(null);
    handleSpin();
  };

  const handleClearAll = () => {
    setOptions([]);
    setResult(null);
  };

  const canSpin = options.length >= MIN_OPTIONS && !isSpinning;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-card rounded-3xl p-8 md:p-12 shadow-soft border-2 border-primary/30 space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-5xl md:text-6xl font-bold text-primary">
              🎯 Choosy
            </h1>
            <p className="text-lg text-muted-foreground font-medium">
              Can't decide? Let the wheel choose for you!
            </p>
          </div>

          {/* Input Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center text-primary">
              Your Options
            </h2>
            <OptionInput
              options={options}
              onOptionsChange={setOptions}
              maxOptions={MAX_OPTIONS}
            />
          </div>

          {/* Wheel */}
          {options.length >= MIN_OPTIONS ? (
            <div className="flex justify-center">
              <SpinWheel
                options={options}
                isSpinning={isSpinning}
                onSpinComplete={handleSpinComplete}
              />
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Add at least {MIN_OPTIONS} options to see the wheel
              </p>
            </div>
          )}

          {/* Spin Button */}
          {!result && (
            <Button
              onClick={handleSpin}
              disabled={!canSpin}
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-smooth shadow-soft disabled:opacity-50 text-lg font-bold py-6"
            >
              {isSpinning ? "✨ Spinning..." : "🎯 Spin the Wheel!"}
            </Button>
          )}

          {/* Result */}
          {result && (
            <ResultDisplay
              result={result}
              onSpinAgain={handleSpinAgain}
              onClearAll={handleClearAll}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
