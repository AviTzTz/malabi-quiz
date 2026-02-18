"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
}

/** Color palettes for malabi bowl — randomly picked each quiz session */
const LAYER_PALETTES = [
  ["#f5f0e8", "#e8a0b0", "#a8c5a0"],  // classic: cream, strawberry, pistachio
  ["#f5f0e8", "#c9a87c", "#e8a0b0"],  // biscoff: cream, caramel, strawberry
  ["#f5f0e8", "#a8c5a0", "#d4708a"],  // garden: cream, pistachio, rose
  ["#f5f0e8", "#b8937a", "#f0e6d3"],  // chocolate: cream, cocoa, coconut
  ["#f5f0e8", "#e8c875", "#c9a87c"],  // golden: cream, mango, dulce de leche
  ["#f5f0e8", "#d4708a", "#c9a87c"],  // sunset: cream, rose, caramel
];

const TOPPING_PALETTES = [
  // classic: chocolate, pistachio, coconut, rose, chocolate
  [{ color: "#6b4226" }, { color: "#7da66e" }, { color: "#f0e6d3" }, { color: "#d4708a" }, { color: "#6b4226" }],
  // nutty: pistachio, almond, hazelnut, pistachio, coconut
  [{ color: "#7da66e" }, { color: "#d4b896" }, { color: "#8b6914" }, { color: "#7da66e" }, { color: "#f0e6d3" }],
  // berry: raspberry, strawberry, coconut, blueberry, raspberry
  [{ color: "#c43b6b" }, { color: "#e8a0b0" }, { color: "#f0e6d3" }, { color: "#6b5b95" }, { color: "#c43b6b" }],
  // tropical: mango, coconut, passion fruit, kiwi, mango
  [{ color: "#e8c875" }, { color: "#f0e6d3" }, { color: "#c9785d" }, { color: "#7da66e" }, { color: "#e8c875" }],
];

const TOPPING_POSITIONS = [
  { cx: 24, cy: 17.5, r: 2.2 },
  { cx: 31, cy: 15.5, r: 1.8 },
  { cx: 36, cy: 17, r: 1.5 },
  { cx: 41, cy: 15.5, r: 1.8 },
  { cx: 48, cy: 17.5, r: 2.2 },
];

/**
 * Malabi bowl SVG that fills up as the user progresses through questions.
 * Colors are randomized each session for variety.
 */
function MalabiBowl({
  fillLevel,
  total,
}: {
  fillLevel: number;
  total: number;
}) {
  const w = 72;
  const h = 52;

  const fillTop = 16;
  const fillBottom = 40;
  const fillHeight = fillBottom - fillTop;
  const layerH = fillHeight / total;

  // Pick random palettes once per mount
  const { layerColors, toppingSpecs } = useMemo(() => {
    const layers = LAYER_PALETTES[Math.floor(Math.random() * LAYER_PALETTES.length)];
    const toppings = TOPPING_PALETTES[Math.floor(Math.random() * TOPPING_PALETTES.length)];
    return {
      layerColors: layers,
      toppingSpecs: TOPPING_POSITIONS.map((pos, i) => ({ ...pos, color: toppings[i].color })),
    };
  }, []);

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
    >
      <defs>
        <clipPath id="bowl-clip">
          <ellipse cx="36" cy="38" rx="24" ry="8" />
          <rect x="12" y="16" width="48" height="22" />
          <ellipse cx="36" cy="16" rx="28" ry="7" />
        </clipPath>
      </defs>

      {/* Fill layers */}
      <g clipPath="url(#bowl-clip)">
        {Array.from({ length: total }, (_, i) => {
          const isFilled = i < fillLevel;
          const y = fillBottom - (i + 1) * layerH;

          return (
            <motion.rect
              key={i}
              x="8"
              y={y}
              width="56"
              height={layerH + 1}
              fill={layerColors[i % layerColors.length]}
              initial={false}
              animate={{
                opacity: isFilled ? 1 : 0,
                scaleY: isFilled ? 1 : 0,
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: isFilled ? 0.1 : 0,
              }}
              style={{ transformOrigin: `center ${y + layerH}px` }}
            />
          );
        })}
      </g>

      {/* Bowl body */}
      <path
        d="M8 18 C8 18, 10 42, 18 44 Q36 48, 54 44 C62 42, 64 18, 64 18"
        stroke="var(--espresso)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Bowl rim */}
      <ellipse
        cx="36"
        cy="18"
        rx="28"
        ry="6"
        stroke="var(--espresso)"
        strokeWidth="2"
        fill="none"
      />

      {/* Inner rim highlight */}
      <ellipse
        cx="36"
        cy="18"
        rx="24"
        ry="4.5"
        stroke="var(--sand)"
        strokeWidth="0.8"
        fill="none"
        opacity="0.5"
      />

      {/* Toppings when full */}
      {fillLevel >= total && (
        <g>
          {toppingSpecs.map((t, i) => (
            <motion.circle
              key={i}
              cx={t.cx}
              cy={t.cy}
              r={t.r}
              fill={t.color}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 + i * 0.1, duration: 0.3 }}
            />
          ))}
        </g>
      )}
    </svg>
  );
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const fillLevel = current;

  return (
    <div className="w-full max-w-xs mx-auto mb-6">
      <MalabiBowl fillLevel={fillLevel} total={total} />

      <p className="text-center text-[11px] tracking-[0.2em] text-[var(--taupe)] mt-2">
        שאלה {current} מתוך {total}
      </p>
    </div>
  );
}
