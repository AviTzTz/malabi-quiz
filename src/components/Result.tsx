"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import confetti from "canvas-confetti";
import type { Malabi } from "@/data/malabis";
import type { LandingMode } from "./Landing";


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
            className="h-auto w-[140px] md:w-[180px] mx-auto"
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

        {/* Retry + Share section */}
        <motion.div
          className="mt-6 pt-4 flex flex-col items-center gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {/* Retry text — mode-specific */}
          <button
            onClick={onRestart}
            className="text-sm text-[var(--taupe)] hover:text-[var(--espresso)] transition-colors cursor-pointer"
          >
            {mode === "fate"
              ? "לא הלך בגורל? נסו שוב"
              : mode === "daily"
              ? "זה הלא מלבי היום שלך? נסו שוב"
              : "הטעמים לא דיברו אליך? נסו שוב"}
          </button>

          {/* Share with Friends */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-center text-[var(--taupe)]">
              <span className="text-[10px] tracking-[0.25em] uppercase">שתפו עם </span>
              <span className="font-[family-name:var(--font-display)] text-base text-[var(--espresso)]">Friends</span>
            </p>
            <div className="flex items-center gap-4">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  secondary
                    ? `בחידון הטעם של Friends יצא לי ${primary.name} ו${secondary.name}! בואו לגלות מה אתם`
                    : `בחידון הטעם של Friends יצא לי ${primary.name}! בואו לגלות מה אתם`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--taupe)] hover:text-[#25D366] transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href="https://facebook.com/friends"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--taupe)] hover:text-[#1877F2] transition-colors duration-300"
                aria-label="Facebook"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
