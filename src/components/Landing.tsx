"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export type LandingMode = "quiz" | "fate" | "daily";

interface LandingProps {
  onStart: (mode: LandingMode) => void;
}

const modes: { id: LandingMode; label: string; sub: string }[] = [
  { id: "quiz", label: "בוחר/ת לפי הטעם", sub: "3 שאלות · 2 המלצות" },
  { id: "fate", label: "תן לגורל להחליט", sub: "יהיה מה שיהיה" },
  { id: "daily", label: "זה לא מלבי היום", sub: "המהדורה המיוחדת" },
];

export default function Landing({ onStart }: LandingProps) {
  return (
    <div className="h-dvh px-5 md:px-0">
      <div className="max-w-lg w-full h-full mx-auto flex flex-col items-center justify-between border-graffiti bg-[var(--cream)]/60 backdrop-blur-sm py-8 px-6 text-center">
        {/* Top: Logo + story */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src="/images/logo.png"
              alt="Friends"
              width={280}
              height={120}
              className="h-auto w-[140px] md:w-[180px] mx-auto"
              priority
            />
          </motion.div>

          <motion.p
            className="text-sm text-[var(--espresso-light)] leading-relaxed max-w-xs mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            &ldquo;מה זה לא מאלבי??&rdquo; ... &ldquo;זה לא מאלבי.&rdquo;
            <br />
            &ldquo;אהה רגע מה?? זה לא מאלבי??&rdquo; 🤔
            <br />
            <span className="text-[var(--espresso)] font-semibold">נו אז מה כן? בואו תגלו.</span>
          </motion.p>
        </div>

        {/* Bottom half: heading, buttons, icons, address — evenly spaced */}
        <div className="flex-1 flex flex-col items-center justify-evenly w-full">
          <motion.h2
            className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-bold text-[var(--espresso)] leading-snug"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            אז מה הלא מלבי שלך?
          </motion.h2>

          <div className="flex flex-col gap-3 w-full px-4 md:px-8">
            {modes.map((mode, i) => (
              <motion.button
                key={mode.id}
                onClick={() => onStart(mode.id)}
                className="w-full py-3 px-5 text-[var(--espresso)] border border-[var(--espresso)]/80 cursor-pointer transition-all duration-300 hover:bg-[var(--espresso)] hover:text-[var(--cream)] hover:border-[var(--espresso)] hover:shadow-lg group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.15, duration: 0.4 }}
              >
                <span className="text-[15px] font-bold tracking-wide">
                  {mode.label}
                </span>
                <span className="block text-[11px] text-[var(--taupe)] group-hover:text-[var(--cream)]/70 mt-0.5">
                  {mode.sub}
                </span>
              </motion.button>
            ))}
          </div>

          <div className="flex flex-col items-center gap-3">
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <a
              href="https://wa.me/972534532277"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--taupe)] hover:text-[#25D366] transition-colors duration-300"
              aria-label="WhatsApp"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
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
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </motion.div>

          <motion.p
            className="text-[11px] tracking-[0.1em] text-[var(--taupe-dark)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            רחוב מצדה 17 | 053-453-2277
          </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
}
