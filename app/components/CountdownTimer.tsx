"use client";

import { useState, useEffect, useRef } from "react";

interface CountdownTimerProps {
  duration: number; // in seconds
  onComplete: () => void;
}

export default function CountdownTimer({ duration, onComplete }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    if (!isPaused) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, isPaused, onComplete]);

  // SVG parameters
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  // Calculate offset so that it starts full and goes to empty
  const strokeDashoffset = circumference - (timeLeft / duration) * circumference;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative flex items-center justify-center w-40 h-40">
        {/* Background circle */}
        <svg className="absolute w-full h-full transform -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            className="text-primary-fixed/40"
          />
          {/* Progress circle */}
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            className="text-primary transition-all duration-1000 ease-linear"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>
        <div className="z-10 font-bold text-2xl text-primary text-center">
          TIMER: {timeLeft}s
        </div>
      </div>
      <button
        onClick={() => setIsPaused(!isPaused)}
        className="font-bold text-primary uppercase text-xl tracking-widest hover:text-primary-dark transition-colors"
      >
        {isPaused ? "RESUME" : "PAUSE"}
      </button>
    </div>
  );
}
