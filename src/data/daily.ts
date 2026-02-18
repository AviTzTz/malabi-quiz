import { malabis, type Malabi } from "./malabis";

/**
 * "זה לא מלבי היום" — the featured malabi.
 * Change the ID below to update which malabi is featured.
 * Must match an id from malabis.ts
 */
const DAILY_MALABI_ID = "dubai-chocolate";

export function getDailyMalabi(): Malabi {
  const found = malabis.find((m) => m.id === DAILY_MALABI_ID);
  if (!found) {
    throw new Error(`Daily malabi "${DAILY_MALABI_ID}" not found in malabis list`);
  }
  return found;
}
