import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SpinWheel } from "@/components/SpinWheel";
import { OptionInput } from "@/components/OptionInput";
import { ResultDisplay } from "@/components/ResultDisplay";
import spidermanMask from "@/assets/spiderman-mask.png";

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
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 relative">
      {/* Decorative Spider-Man masks */}
      <img 
        src={spidermanMask} 
        alt="" 
        className="absolute top-8 left-8 w-16 h-16 opacity-20 animate-pulse hidden md:block"
      />
      <img 
        src={spidermanMask} 
        alt="" 
        className="absolute top-8 right-8 w-16 h-16 opacity-20 animate-pulse hidden md:block"
      />
      <img 
        src={spidermanMask} 
        alt="" 
        className="absolute bottom-8 left-8 w-16 h-16 opacity-20 animate-pulse hidden md:block"
      />
      <img 
        src={spidermanMask} 
        alt="" 
        className="absolute bottom-8 right-8 w-16 h-16 opacity-20 animate-pulse hidden md:block"
      />
      
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-card rounded-3xl p-8 md:p-12 shadow-soft border-2 border-primary/30 space-y-8 relative overflow-hidden">
          {/* Decorative corner webs */}
          <div className="absolute top-0 left-0 w-32 h-32 opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
              <path d="M0,0 L100,0 L0,100 Z" fill="currentColor" opacity="0.3"/>
              <path d="M0,0 L50,0 L0,50 Z M0,0 L25,0 L0,25 Z" stroke="currentColor" fill="none" strokeWidth="1"/>
            </svg>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none rotate-90">
            <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
              <path d="M0,0 L100,0 L0,100 Z" fill="currentColor" opacity="0.3"/>
              <path d="M0,0 L50,0 L0,50 Z M0,0 L25,0 L0,25 Z" stroke="currentColor" fill="none" strokeWidth="1"/>
            </svg>
          </div>
          
          {/* Header */}
          <div className="text-center space-y-2 relative">
            <div className="flex items-center justify-center gap-3">
              <img src={spidermanMask} alt="Spider-Man" className="w-12 h-12" />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Choosy
              </h1>
              <img src={spidermanMask} alt="Spider-Man" className="w-12 h-12" />
            </div>
            <p className="text-lg text-muted-foreground font-medium">
              With great choices comes great responsibility!
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
              className="w-full gradient-primary hover:opacity-90 text-primary-foreground transition-smooth shadow-glow disabled:opacity-50 text-lg font-bold py-6 border-2 border-primary/50"
            >
              {isSpinning ? "🕸️ Spinning..." : "🕷️ Spin the Wheel!"}
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
