"use client";

import { useState, useCallback } from "react";
import Landing, { type LandingMode } from "@/components/Landing";
import Quiz from "@/components/Quiz";
import Loading from "@/components/Loading";
import Result from "@/components/Result";
import { calculateResult, getRandomMalabi } from "@/lib/calculateResult";
import { getDailyMalabi } from "@/data/daily";
import type { Malabi } from "@/data/malabis";

type Screen = "landing" | "quiz" | "loading" | "result";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [results, setResults] = useState<Malabi[]>([]);
  const [resultMode, setResultMode] = useState<LandingMode>("quiz");

  const handleStart = useCallback((mode: LandingMode) => {
    setResultMode(mode);

    if (mode === "quiz") {
      setScreen("quiz");
    } else if (mode === "fate") {
      setResults([getRandomMalabi()]);
      setScreen("loading");
    } else {
      // daily
      setResults([getDailyMalabi()]);
      setScreen("loading");
    }
  }, []);

  const handleQuizComplete = useCallback((answers: Record<number, string>) => {
    const topTwo = calculateResult(answers);
    setResults(topTwo);
    setScreen("loading");
  }, []);

  const handleLoadingDone = useCallback(() => {
    setScreen("result");
  }, []);

  const handleRestart = useCallback(() => {
    setResults([]);
    setScreen("landing");
  }, []);

  return (
    <main className="relative min-h-dvh overflow-hidden flex flex-col flex-1">
      {/* Persistent graffiti background across all screens */}
      <div className="fixed inset-0 z-0 bg-graffiti" />

      <div className="relative z-10 flex-1 flex flex-col">
        {screen === "landing" && <Landing onStart={handleStart} />}
        {screen === "quiz" && <Quiz onComplete={handleQuizComplete} />}
        {screen === "loading" && <Loading onDone={handleLoadingDone} />}
        {screen === "result" && results.length > 0 && (
          <Result results={results} mode={resultMode} onRestart={handleRestart} />
        )}
      </div>
    </main>
  );
}
