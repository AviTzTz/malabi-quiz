import { z } from "zod";

// Weighted scoring: each answer maps to malabi IDs with different weights
// 3 = strong match, 2 = good match, 1 = slight match
const WeightedEntrySchema = z.object({
  id: z.string(),
  weight: z.number().min(1).max(3),
});

const WeightedScoringMapSchema = z.record(
  z.string(),
  z.array(WeightedEntrySchema)
);

export type WeightedEntry = z.infer<typeof WeightedEntrySchema>;

export const scoringMap: Record<string, WeightedEntry[]> = {
  // ===== Q1: ניסית מלבי פעם? =====

  // "כן, בא לי משהו חדש"
  "1a": [
    { id: "dubai-chocolate", weight: 3 },
    { id: "knafeh", weight: 3 },
    { id: "tiramisu", weight: 3 },
    { id: "smores", weight: 3 },
    { id: "sinful", weight: 2 },
    { id: "bamba", weight: 2 },
    { id: "movie", weight: 2 },
    { id: "crunch-munch", weight: 2 },
    { id: "lemon-pie", weight: 2 },
    { id: "cinnabon", weight: 1 },
    { id: "banoffee", weight: 1 },
    { id: "apple-pie", weight: 1 },
    { id: "cheesecake", weight: 1 },
  ],

  // "לא, תנו לי קלאסיקה"
  "1b": [
    { id: "classic", weight: 3 },
    { id: "dulce", weight: 3 },
    { id: "cornflakes", weight: 3 },
    { id: "cinnabon", weight: 2 },
    { id: "banoffee", weight: 2 },
    { id: "apple-pie", weight: 1 },
    { id: "cheesecake", weight: 1 },
  ],

  // ===== Q2: מתוק או עם טוויסט? =====

  // "מתוק"
  "2a": [
    { id: "dulce", weight: 3 },
    { id: "sinful", weight: 3 },
    { id: "banoffee", weight: 3 },
    { id: "cinnabon", weight: 3 },
    { id: "bamba", weight: 2 },
    { id: "cornflakes", weight: 2 },
    { id: "smores", weight: 2 },
    { id: "knafeh", weight: 2 },
    { id: "classic", weight: 1 },
    { id: "cheesecake", weight: 1 },
  ],

  // "חמצמץ"
  "2b": [
    { id: "lemon-pie", weight: 3 },
    { id: "apple-pie", weight: 3 },
    { id: "cheesecake", weight: 3 },
    { id: "tiramisu", weight: 2 },
    { id: "classic", weight: 2 },
    { id: "banoffee", weight: 1 },
  ],

  // "מלוח-מתוק"
  "2c": [
    { id: "movie", weight: 3 },
    { id: "crunch-munch", weight: 3 },
    { id: "dubai-chocolate", weight: 3 },
    { id: "bamba", weight: 2 },
    { id: "knafeh", weight: 2 },
    { id: "sinful", weight: 1 },
  ],

  // ===== Q3: קראנצ'י או חלק? =====

  // "פריך"
  "3a": [
    { id: "cornflakes", weight: 3 },
    { id: "crunch-munch", weight: 3 },
    { id: "knafeh", weight: 3 },
    { id: "dubai-chocolate", weight: 3 },
    { id: "cinnabon", weight: 2 },
    { id: "bamba", weight: 2 },
    { id: "smores", weight: 1 },
  ],

  // "קרמי"
  "3b": [
    { id: "classic", weight: 3 },
    { id: "dulce", weight: 3 },
    { id: "lemon-pie", weight: 3 },
    { id: "tiramisu", weight: 3 },
    { id: "cheesecake", weight: 2 },
    { id: "banoffee", weight: 2 },
    { id: "apple-pie", weight: 1 },
  ],

  // "שילוב"
  "3c": [
    { id: "apple-pie", weight: 3 },
    { id: "smores", weight: 3 },
    { id: "sinful", weight: 3 },
    { id: "movie", weight: 3 },
    { id: "banoffee", weight: 2 },
    { id: "bamba", weight: 2 },
    { id: "cheesecake", weight: 1 },
    { id: "cornflakes", weight: 1 },
  ],
};

// Validate scoring map at build time
WeightedScoringMapSchema.parse(scoringMap);
