"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Question } from "@/data/questions";

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string | null;
  onSelect: (answerId: string) => void;
  direction: number;
}

export default function QuestionCard({
  question,
  selectedAnswer,
  onSelect,
  direction,
}: QuestionCardProps) {
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
    }),
  };

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={question.id}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-full max-w-md mx-auto"
      >
        {/* Question text — editorial typography */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-[var(--espresso)] leading-snug">
            {question.question}
          </h2>
        </div>

        {/* Answer list — clean, vertical, editorial */}
        <div className="space-y-2.5">
          {question.answers.map((answer, index) => {
            const isSelected = selectedAnswer === answer.id;
            return (
              <motion.button
                key={answer.id}
                onClick={() => onSelect(answer.id)}
                className={`w-full text-right py-4 px-5 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "answer-option-selected"
                    : "answer-option"
                }`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.25 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center gap-4">
                  {/* Minimal indicator */}
                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                      isSelected
                        ? "border-[var(--gold)] bg-[var(--gold)]"
                        : "border-[var(--sand)]"
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 rounded-full bg-[var(--espresso)]"
                      />
                    )}
                  </span>

                  <span
                    className={`text-sm md:text-base transition-colors duration-200 ${
                      isSelected
                        ? "text-[var(--cream)] font-medium"
                        : "text-[var(--espresso)]"
                    }`}
                  >
                    {answer.text}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
