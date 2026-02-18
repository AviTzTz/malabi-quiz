"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  return (
    <div className="w-full max-w-lg mx-auto mb-10">
      {/* Step indicators — editorial dots */}
      <div className="flex items-center justify-center gap-3">
        {Array.from({ length: total }, (_, i) => {
          const stepNum = i + 1;
          const isActive = stepNum === current;
          const isDone = stepNum < current;

          return (
            <div key={i} className="flex items-center gap-3">
              {i > 0 && (
                <div
                  className="w-8 h-px transition-colors duration-300"
                  style={{
                    background: isDone ? "var(--gold)" : "var(--sand)",
                  }}
                />
              )}
              <motion.div
                className="flex items-center justify-center transition-all duration-300"
                animate={{
                  scale: isActive ? 1 : 0.85,
                }}
              >
                <span
                  className={`step-number text-xs font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-[var(--espresso)]"
                      : isDone
                      ? "text-[var(--gold)]"
                      : "text-[var(--sand)]"
                  }`}
                >
                  {String(stepNum).padStart(2, "0")}
                </span>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
