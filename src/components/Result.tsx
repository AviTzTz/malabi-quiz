"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Malabi } from "@/data/malabis";
import type { LandingMode } from "./Landing";
import { LOGO_CLASS } from "@/lib/constants";

interface ResultProps {
  results: Malabi[];
  mode: LandingMode;
  onRestart: () => void;
}

function IngredientsSection({ ingredients }: { ingredients: string[] }) {
  return (
    <div className="bg-[var(--cream-light)] border border-[var(--sand-light)] p-5 relative overflow-hidden">
      {/* Decorative top line */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-l from-transparent via-[var(--gold)] to-transparent" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[var(--gold)] text-lg leading-none">&#9753;</span>
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[var(--taupe-dark)]">
          מה בפנים
        </span>
        <div className="flex-1 h-px bg-[var(--sand)]" />
      </div>

      {/* Numbered steps */}
      <div className="space-y-0">
        {ingredients.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            {/* Step number */}
            <span className="w-6 h-6 rounded-full bg-[var(--espresso)] text-[var(--cream)] text-[10px] font-bold flex items-center justify-center flex-shrink-0">
              {i + 1}
            </span>
            {/* Text */}
            <div className={`flex-1 py-2.5 text-[13px] text-[var(--espresso-light)] leading-snug ${
              i < ingredients.length - 1 ? "border-b border-[var(--sand)]" : ""
            }`}>
              {item}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const modeLabels: Record<LandingMode, string> = {
  quiz: "ההמלצה העיקרית",
  fate: "הגורל בחר בשבילך",
  daily: "זה לא מלבי היום",
};

export default function Result({ results, mode, onRestart }: ResultProps) {
  const isSingle = results.length === 1;
  const primary = results[0];
  const secondary = results[1] ?? null;
  const [showSecondary, setShowSecondary] = useState(false);


  return (
    <div className="min-h-dvh px-5 md:px-0 py-0">
      <div className="max-w-lg w-full min-h-dvh mx-auto flex flex-col border-graffiti bg-[var(--cream)] px-4 py-6 md:px-6 md:py-8">
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
            className={LOGO_CLASS}
          />
        </motion.div>

        {/* Primary result */}
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

          {/* Full-width card with image + content */}
          <div className="card-editorial -mx-4 md:-mx-6 overflow-hidden">
            {/* Image with fade */}
            <div className="relative h-52 md:h-64 bg-[var(--cream-light)]">
              <Image
                src={primary.image}
                alt={primary.name.replace("מלבי", "זה לא מלבי")}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 512px"
                priority
              />
              <div className="absolute inset-x-0 -bottom-1 h-2/3 bg-gradient-to-t from-white via-white/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
            <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-[var(--espresso)] mb-2 leading-tight">
              {primary.name.replace("מלבי", "זה לא מלבי")}
            </h3>
            <p className="text-sm text-[var(--gold)] font-semibold italic mb-3">
              {primary.tagline}
            </p>
            <p className="text-sm text-[var(--taupe-dark)] leading-relaxed mb-5">
              {primary.description}
            </p>
            <IngredientsSection ingredients={primary.ingredients} />
          </div>
          </div>
        </motion.div>

        {/* Secondary — collapsible reveal */}
        {!isSingle && secondary && (
          <motion.div
            className="mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <AnimatePresence>
              {!showSecondary ? (
                <motion.button
                  key="reveal-btn"
                  onClick={() => setShowSecondary(true)}
                  className="w-full py-3.5 px-5 border border-[var(--sand)] text-[var(--espresso)] cursor-pointer transition-all duration-300 hover:border-[var(--gold)] hover:bg-white/50 group"
                  whileTap={{ scale: 0.98 }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <span className="text-[13px] font-semibold">
                    יש לנו עוד המלצה בשבילך
                  </span>
                  <span className="block text-[11px] text-[var(--taupe)] mt-0.5">
                    לחצו לגלות
                  </span>
                </motion.button>
              ) : (
                <motion.div
                  key="secondary-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--taupe)]">
                      שווה גם לנסות
                    </span>
                    <div className="flex-1 h-px bg-[var(--sand)]" />
                  </div>

                  <div className="card-editorial -mx-4 md:-mx-6 overflow-hidden">
                    <div className="relative h-52 md:h-64 bg-[var(--cream-light)]">
                      <Image
                        src={secondary.image}
                        alt={secondary.name.replace("מלבי", "זה לא מלבי")}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 512px"
                      />
                      <div className="absolute inset-x-0 -bottom-1 h-2/3 bg-gradient-to-t from-white via-white/50 to-transparent" />
                    </div>

                    <div className="p-6 md:p-8">
                      <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-[var(--espresso)] mb-2 leading-tight">
                        {secondary.name.replace("מלבי", "זה לא מלבי")}
                      </h3>
                      <p className="text-sm text-[var(--gold)] font-semibold italic mb-3">
                        {secondary.tagline}
                      </p>
                      <p className="text-sm text-[var(--taupe-dark)] leading-relaxed mb-5">
                        {secondary.description}
                      </p>
                      <IngredientsSection ingredients={secondary.ingredients} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
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
                    ? `בחידון הטעם של Friends יצא לי ${primary.name.replace("מלבי", "זה לא מלבי")} ו${secondary.name.replace("מלבי", "זה לא מלבי")}! בואו לגלות מה אתם`
                    : `בחידון הטעם של Friends יצא לי ${primary.name.replace("מלבי", "זה לא מלבי")}! בואו לגלות מה אתם`
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
