"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

interface LoadingProps {
  onDone: () => void;
}

const messages = [
  "🎵 I'll be there for you...",
  "בודקים את הטעם שלך...",
  "מערבבים רכיבים...",
  "מחפשים את הלא מלבי שלך...",
];

export default function Loading({ onDone }: LoadingProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => {
        if (prev < messages.length - 1) return prev + 1;
        return prev;
      });
    }, 900);

    const timer = setTimeout(onDone, 3500);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onDone]);

  return (
    <div className="h-dvh px-5 md:px-0">
      <div className="max-w-lg w-full h-full mx-auto flex flex-col items-center justify-center border-graffiti bg-[var(--cream)]/60 backdrop-blur-sm px-10 py-14 md:px-16 md:py-20 text-center gap-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/images/logo.png"
            alt="Friends"
            width={160}
            height={68}
            className="h-auto w-[100px] md:w-[120px] mx-auto opacity-60"
          />
        </motion.div>

        {/* Animated dots spinner */}
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-[var(--gold)]"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="relative w-48 h-[2px] mx-auto bg-[var(--sand)] rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 right-0 bg-[var(--gold)] rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 3.5,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Loading text */}
        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-sm md:text-base font-medium text-[var(--taupe-dark)] tracking-wide"
          >
            {messages[messageIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
