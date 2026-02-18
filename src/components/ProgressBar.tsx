"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = ((current - 1) / (total - 1)) * 100;

  return (
    <div className="w-full max-w-xs mx-auto mb-8">
      {/* Step text */}
      <p className="text-center text-[11px] tracking-[0.2em] text-[var(--taupe)] mb-3">
        שאלה {current} מתוך {total}
      </p>

      {/* Bar track */}
      <div className="relative w-full h-[3px] bg-[var(--sand)] rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 right-0 bg-[var(--gold)] rounded-full"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>

      {/* Step dots */}
      <div className="flex items-center justify-between mt-2">
        {Array.from({ length: total }, (_, i) => {
          const stepNum = i + 1;
          const isActive = stepNum === current;
          const isDone = stepNum < current;

          return (
            <motion.div
              key={i}
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors duration-300 ${
                isActive
                  ? "bg-[var(--espresso)] text-[var(--cream)]"
                  : isDone
                  ? "bg-[var(--gold)] text-white"
                  : "bg-[var(--sand-light)] text-[var(--taupe)]"
              }`}
              animate={{ scale: isActive ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {isDone ? "✓" : stepNum}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
