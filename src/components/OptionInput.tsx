import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus } from "lucide-react";

interface OptionInputProps {
  options: string[];
  onOptionsChange: (options: string[]) => void;
  maxOptions: number;
}

export const OptionInput = ({ options, onOptionsChange, maxOptions }: OptionInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddOption = () => {
    if (inputValue.trim() && options.length < maxOptions) {
      onOptionsChange([...options, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveOption = (index: number) => {
    onOptionsChange(options.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddOption();
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add an option..."
          className="flex-1 border-2 focus-visible:ring-primary"
          disabled={options.length >= maxOptions}
        />
        <Button
          onClick={handleAddOption}
          disabled={!inputValue.trim() || options.length >= maxOptions}
          size="icon"
          className="gradient-primary hover:opacity-90 transition-smooth shadow-soft"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      {options.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {options.map((option, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-soft border border-border transition-smooth hover:shadow-md"
            >
              <span className="text-sm font-medium">{option}</span>
              <button
                onClick={() => handleRemoveOption(index)}
                className="text-muted-foreground hover:text-destructive transition-smooth"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="text-sm text-muted-foreground text-center">
        {options.length} / {maxOptions} options
        {options.length < 2 && " (add at least 2 to spin)"}
      </p>
    </div>
  );
};
