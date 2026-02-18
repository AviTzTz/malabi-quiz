"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import confetti from "canvas-confetti";
import type { Malabi } from "@/data/malabis";
import type { LandingMode } from "./Landing";
import ShareButtons from "./ShareButtons";

interface ResultProps {
  results: Malabi[];
  mode: LandingMode;
  onRestart: () => void;
}

function MalabiCard({
  malabi,
  rank,
  delay,
}: {
  malabi: Malabi;
  rank: 1 | 2;
  delay: number;
}) {
  const isPrimary = rank === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="w-full"
    >
      {/* Rank label */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--taupe)]">
          {isPrimary ? "ההמלצה העיקרית" : "שווה גם לנסות"}
        </span>
        <div className="flex-1 h-px bg-[var(--sand)]" />
      </div>

      {/* Card */}
      <div className="card-editorial overflow-hidden">
        {/* Image */}
        <div className="relative h-40 md:h-52 bg-[var(--cream-light)]">
          <Image
            src={malabi.image}
            alt={malabi.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 448px"
            priority={isPrimary}
          />
          {/* Fade-out into card background */}
          <div className="absolute inset-x-0 -bottom-1 h-2/3 bg-gradient-to-t from-white via-white/50 to-transparent" />
        </div>

        {/* Content */}
        <div className={isPrimary ? "p-6 md:p-8" : "p-5 md:p-6"}>
          <h3
            className={`font-bold text-[var(--espresso)] mb-1.5 ${
              isPrimary ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
            }`}
          >
            {malabi.name}
          </h3>

          <p className="text-sm text-[var(--gold)] font-medium mb-3">
            {malabi.tagline}
          </p>

          <p className="text-sm text-[var(--taupe-dark)] leading-relaxed mb-5">
            {malabi.description}
          </p>

          {/* Ingredients */}
          <div className="card-warm p-4">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[var(--taupe)] mb-3">
              מה בפנים
            </p>
            <ul className="space-y-1.5">
              {malabi.ingredients.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm text-[var(--espresso-light)]"
                >
                  <span className="w-1 h-1 rounded-full bg-[var(--gold)] mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const modeLabels: Record<LandingMode, string> = {
  quiz: "ההמלצה העיקרית",
  fate: "הגורל בחר בשבילך",
  daily: "זה לא מלבי היום",
};

export default function Result({ results, mode, onRestart }: ResultProps) {
  const confettiFired = useRef(false);
  const isSingle = results.length === 1;
  const primary = results[0];
  const secondary = results[1] ?? null;

  useEffect(() => {
    if (confettiFired.current) return;
    confettiFired.current = true;

    const duration = 1200;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 40,
        origin: { x: 0, y: 0.5 },
        colors: ["#c4aa7d", "#3a2f25", "#e8dfd2", "#f6f1ea"],
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 40,
        origin: { x: 1, y: 0.5 },
        colors: ["#c4aa7d", "#3a2f25", "#e8dfd2", "#f6f1ea"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="min-h-dvh px-5 md:px-0 py-0">
      <div className="max-w-lg w-full min-h-dvh mx-auto flex flex-col border-graffiti bg-[var(--cream)]/60 backdrop-blur-sm px-4 py-6 md:px-6 md:py-8">
        {/* Header — logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <Image
            src="/images/logo.png"
            alt="Friends"
            width={260}
            height={110}
            className="h-auto w-[180px] md:w-[220px] mx-auto"
          />
        </motion.div>

        {/* Primary — with custom label per mode */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="w-full"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--taupe)]">
              {modeLabels[mode]}
            </span>
            <div className="flex-1 h-px bg-[var(--sand)]" />
          </div>

          <div className="card-editorial overflow-hidden">
            <div className="relative h-40 md:h-52 bg-[var(--cream-light)]">
              <Image
                src={primary.image}
                alt={primary.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 448px"
                priority
              />
              <div className="absolute inset-x-0 -bottom-1 h-2/3 bg-gradient-to-t from-white via-white/50 to-transparent" />
            </div>

            <div className="p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-[var(--espresso)] mb-1.5">
                {primary.name}
              </h3>
              <p className="text-sm text-[var(--gold)] font-medium mb-3">
                {primary.tagline}
              </p>
              <p className="text-sm text-[var(--taupe-dark)] leading-relaxed mb-5">
                {primary.description}
              </p>
              <div className="card-warm p-4">
                <p className="text-[10px] tracking-[0.25em] uppercase text-[var(--taupe)] mb-3">
                  מה בפנים
                </p>
                <ul className="space-y-1.5">
                  {primary.ingredients.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-[var(--espresso-light)]"
                    >
                      <span className="w-1 h-1 rounded-full bg-[var(--gold)] mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Secondary — only for quiz mode */}
        {!isSingle && secondary && (
          <>
            <motion.div
              className="my-5 flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex-1 h-px bg-[var(--sand)]" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--taupe)]">
                וגם
              </span>
              <div className="flex-1 h-px bg-[var(--sand)]" />
            </motion.div>

            <MalabiCard malabi={secondary} rank={2} delay={0.5} />
          </>
        )}

        {/* Share section */}
        <motion.div
          className="mt-4 pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="line-accent w-full mb-6" />
          <p className="text-center text-[10px] tracking-[0.25em] uppercase text-[var(--taupe)] mb-4">
            שתפו את התוצאה
          </p>
          <ShareButtons
            primaryName={primary.name}
            secondaryName={secondary?.name ?? null}
          />
        </motion.div>

        {/* Restart */}
        <motion.div
          className="text-center mt-8 pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <button
            onClick={onRestart}
            className="text-sm text-[var(--taupe)] hover:text-[var(--espresso)] transition-colors cursor-pointer underline underline-offset-4 decoration-[var(--sand)] hover:decoration-[var(--gold)]"
          >
            נסו שוב
          </button>
        </motion.div>
      </div>
    </div>
  );
}
