import { z } from "zod";

export const AnswerSchema = z.object({
  id: z.string(),
  text: z.string(),
  emoji: z.string(),
});

export const QuestionSchema = z.object({
  id: z.number(),
  question: z.string(),
  emoji: z.string(),
  answers: z.array(AnswerSchema).min(2).max(5),
});

export type Answer = z.infer<typeof AnswerSchema>;
export type Question = z.infer<typeof QuestionSchema>;

export const questions: Question[] = [
  {
    id: 1,
    question: "ניסית מלבי פעם?",
    emoji: "◐",
    answers: [
      { id: "1a", text: "כן, בא לי משהו חדש", emoji: "↗" },
      { id: "1b", text: "לא, תנו לי קלאסיקה", emoji: "●" },
    ],
  },
  {
    id: 2,
    question: "מתוק או עם טוויסט?",
    emoji: "◑",
    answers: [
      { id: "2a", text: "מתוק", emoji: "◉" },
      { id: "2b", text: "חמצמץ", emoji: "◈" },
      { id: "2c", text: "מלוח-מתוק", emoji: "◆" },
    ],
  },
  {
    id: 3,
    question: "קראנצ'י או חלק?",
    emoji: "◒",
    answers: [
      { id: "3a", text: "פריך", emoji: "▤" },
      { id: "3b", text: "קרמי", emoji: "▬" },
      { id: "3c", text: "שילוב", emoji: "▥" },
    ],
  },
];

// Validate all questions at build time
questions.forEach((q) => QuestionSchema.parse(q));
