import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SpinWheel } from "@/components/SpinWheel";
import { OptionInput } from "@/components/OptionInput";
import { ResultDisplay } from "@/components/ResultDisplay";
import { Sparkles } from "lucide-react";

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
    <div className="min-h-screen flex flex-col items-center justify-start p-4 md:p-8">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 pt-8">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-5xl md:text-6xl font-bold gradient-primary bg-clip-text text-transparent">
              Choosy
            </h1>
            <Sparkles className="h-8 w-8 text-secondary" />
          </div>
          <p className="text-lg md:text-xl text-muted-foreground">
            Can't decide? Let the wheel choose for you!
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left: Input Section */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="gradient-primary bg-clip-text text-transparent">
                  Add Your Options
                </span>
              </h2>
              <OptionInput
                options={options}
                onOptionsChange={setOptions}
                maxOptions={MAX_OPTIONS}
              />
            </div>

            {!result && (
              <Button
                onClick={handleSpin}
                disabled={!canSpin}
                size="lg"
                className="w-full gradient-primary hover:opacity-90 transition-smooth shadow-soft disabled:opacity-50 text-lg font-bold py-6"
              >
                {isSpinning ? "Spinning..." : "Spin the Wheel!"}
              </Button>
            )}
          </div>

          {/* Right: Wheel or Result */}
          <div className="flex flex-col items-center justify-center space-y-6">
            {options.length >= MIN_OPTIONS ? (
              <>
                <SpinWheel
                  options={options}
                  isSpinning={isSpinning}
                  onSpinComplete={handleSpinComplete}
                />
                {result && (
                  <ResultDisplay
                    result={result}
                    onSpinAgain={handleSpinAgain}
                    onClearAll={handleClearAll}
                  />
                )}
              </>
            ) : (
              <div className="bg-card rounded-2xl p-8 shadow-soft border border-border text-center">
                <p className="text-muted-foreground">
                  Add at least {MIN_OPTIONS} options to see the wheel
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
