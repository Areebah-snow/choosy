import { useEffect, useRef, useState } from "react";

interface SpinWheelProps {
  options: string[];
  isSpinning: boolean;
  onSpinComplete: (result: string) => void;
}

const WHEEL_COLORS = [
  "hsl(0, 85%, 45%)",    // Spider-Man red
  "hsl(220, 90%, 50%)",  // Spider-Man blue
  "hsl(0, 90%, 35%)",    // Dark red
  "hsl(220, 80%, 40%)",  // Dark blue
  "hsl(0, 85%, 55%)",    // Bright red
  "hsl(220, 85%, 60%)",  // Bright blue
  "hsl(0, 80%, 40%)",    // Medium red
  "hsl(220, 75%, 45%)",  // Medium blue
  "hsl(0, 75%, 50%)",    // Red variant
  "hsl(220, 85%, 55%)",  // Blue variant
];

export const SpinWheel = ({ options, isSpinning, onSpinComplete }: SpinWheelProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef<number>();

  useEffect(() => {
    drawWheel();
  }, [options, rotation]);

  useEffect(() => {
    if (isSpinning) {
      startSpin();
    }
  }, [isSpinning]);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((rotation * Math.PI) / 180);

    const sliceAngle = (2 * Math.PI) / options.length;

    options.forEach((option, index) => {
      const startAngle = index * sliceAngle;
      const endAngle = startAngle + sliceAngle;
      const color = WHEEL_COLORS[index % WHEEL_COLORS.length];

      // Draw slice
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      // Draw border
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = "center";
      ctx.fillStyle = "white";
      ctx.font = "bold 16px system-ui";
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      ctx.shadowBlur = 4;
      ctx.fillText(option, radius * 0.65, 0);
      ctx.restore();
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(0, 0, 25, 0, 2 * Math.PI);
    ctx.fillStyle = "hsl(0, 0%, 10%)";
    ctx.fill();
    ctx.strokeStyle = "hsl(0, 85%, 45%)";
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.restore();

    // Draw pointer (triangle at top pointing down)
    ctx.beginPath();
    ctx.moveTo(centerX, 50);
    ctx.lineTo(centerX - 15, 20);
    ctx.lineTo(centerX + 15, 20);
    ctx.closePath();
    ctx.fillStyle = "hsl(0, 85%, 45%)";
    ctx.fill();
    ctx.strokeStyle = "hsl(0, 0%, 10%)";
    ctx.lineWidth = 3;
    ctx.stroke();
  };

  const startSpin = () => {
    const spins = 5 + Math.random() * 3; // 5-8 full rotations
    const extraDegrees = Math.random() * 360;
    const totalRotation = spins * 360 + extraDegrees;
    const duration = 4000; // 4 seconds
    const startTime = Date.now();
    const startRotation = rotation;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentRotation = startRotation + totalRotation * easeOut;

      setRotation(currentRotation % 360);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Calculate which option was selected
        // Arrow is at top (270 degrees in canvas coords), account for wheel rotation
        const finalRotation = currentRotation % 360;
        const sliceAngle = 360 / options.length;
        // Calculate which slice is at the top (where arrow points)
        const angleAtTop = (270 - finalRotation + 360) % 360;
        const selectedIndex = Math.floor(angleAtTop / sliceAngle) % options.length;
        onSpinComplete(options[selectedIndex]);
      }
    };

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    animate();
  };

  return (
    <div className="relative flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="max-w-full h-auto drop-shadow-lg"
      />
    </div>
  );
};
