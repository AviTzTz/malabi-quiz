"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { questions } from "@/data/questions";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";

interface QuizProps {
  onComplete: (answers: Record<number, string>) => void;
}

export default function Quiz({ onComplete }: QuizProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [direction, setDirection] = useState(1);

  const question = questions[currentQ];
  const isFirst = currentQ === 0;
  const isLast = currentQ === questions.length - 1;
  const hasAnswer = answers[question.id] !== undefined;

  function handleSelect(answerId: string) {
    setAnswers((prev) => ({ ...prev, [question.id]: answerId }));
  }

  function handleNext() {
    if (!hasAnswer) return;
    if (isLast) {
      onComplete(answers);
    } else {
      setDirection(1);
      setCurrentQ((prev) => prev + 1);
    }
  }

  function handleBack() {
    if (isFirst) return;
    setDirection(-1);
    setCurrentQ((prev) => prev - 1);
  }

  return (
    <div className="h-dvh px-5 md:px-0">
      <div className="max-w-lg w-full h-full mx-auto flex flex-col border-graffiti bg-[var(--cream)]/60 backdrop-blur-sm px-5 py-6 md:px-8 md:py-10">
        {/* Header logo */}
        <div className="flex justify-center mb-2">
          <Image
            src="/images/logo.png"
            alt="Friends"
            width={120}
            height={51}
            className="h-auto w-[140px] md:w-[180px] mx-auto"
          />
        </div>

        {/* Progress */}
        <ProgressBar current={currentQ + 1} total={questions.length} />

        {/* Question area */}
        <div className="flex-1 flex items-center justify-center">
          <QuestionCard
            question={question}
            selectedAnswer={answers[question.id] ?? null}
            onSelect={handleSelect}
            direction={direction}
          />
        </div>

        {/* Navigation — editorial buttons */}
        <div className="flex gap-3 justify-center mt-8 pb-8">
          {!isFirst && (
            <motion.button
              onClick={handleBack}
              className="px-6 py-3 text-sm text-[var(--taupe)] font-medium border border-[var(--sand)] hover:border-[var(--taupe)] transition-colors cursor-pointer"
              whileTap={{ scale: 0.98 }}
            >
              חזרה
            </motion.button>
          )}

          <motion.button
            onClick={handleNext}
            disabled={!hasAnswer}
            className={`px-10 py-3 text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
              hasAnswer
                ? "bg-[var(--espresso)] text-[var(--cream)] hover:bg-[var(--gold)] hover:text-[var(--espresso)]"
                : "bg-[var(--sand)] text-[var(--gold-muted)] cursor-not-allowed"
            }`}
            whileTap={hasAnswer ? { scale: 0.98 } : {}}
          >
            {isLast ? "גלו את ההמלצות שלי" : "הבא"}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
