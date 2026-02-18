import { malabis, type Malabi } from "@/data/malabis";
import { scoringMap } from "@/data/scoring";

/** Pick a single random malabi — for "fate" mode */
export function getRandomMalabi(): Malabi {
  const index = Math.floor(Math.random() * malabis.length);
  return malabis[index];
}

export function calculateResult(answers: Record<number, string>): [Malabi, Malabi] {
  const scores: Record<string, number> = {};

  // Initialize all malabi scores to 0
  malabis.forEach((m) => {
    scores[m.id] = 0;
  });

  // Calculate weighted scores based on answers
  Object.entries(answers).forEach(([, answerId]) => {
    const entries = scoringMap[answerId] || [];
    entries.forEach(({ id, weight }) => {
      scores[id] = (scores[id] || 0) + weight;
    });
  });

  // Add small randomization to break ties and create variety
  // Range: 0 to 1.5 — enough to shuffle close scores but not override strong matches
  Object.keys(scores).forEach((id) => {
    scores[id] += Math.random() * 1.5;
  });

  // Sort malabis by score descending
  const sorted = [...malabis].sort((a, b) => (scores[b.id] || 0) - (scores[a.id] || 0));

  // Return top 2 results
  return [sorted[0], sorted[1]];
}
