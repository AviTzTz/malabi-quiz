"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingProps {
  onDone: () => void;
}

const messages = ["מנתחים טעמים...", "מחפשים התאמה...", "כמעט שם."];

export default function Loading({ onDone }: LoadingProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => {
        if (prev < messages.length - 1) return prev + 1;
        return prev;
      });
    }, 900);

    const timer = setTimeout(onDone, 2800);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onDone]);

  return (
    <div className="h-dvh px-5 md:px-0">
      <div className="max-w-lg w-full h-full mx-auto flex flex-col items-center justify-center border-graffiti bg-[var(--cream)]/60 backdrop-blur-sm px-10 py-14 md:px-16 md:py-20 text-center">
        {/* Minimal animated line */}
        <div className="relative w-32 h-px mx-auto mb-12 bg-[var(--sand)]">
          <motion.div
            className="absolute inset-y-0 right-0 bg-[var(--gold)]"
            animate={{
              width: ["0%", "100%", "0%"],
              right: ["0%", "0%", "0%"],
              left: ["auto", "auto", "0%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Loading text */}
        <motion.p
          key={messageIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-base md:text-lg font-medium text-[var(--taupe-dark)] tracking-wide"
        >
          {messages[messageIndex]}
        </motion.p>
      </div>
    </div>
  );
}
