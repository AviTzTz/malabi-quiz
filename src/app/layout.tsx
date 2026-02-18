import type { Metadata } from "next";
import { Assistant } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  variable: "--font-assistant",
});

const gveret = localFont({
  src: "../../public/fonts/GveretLevin-Regular.ttf",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Friends - חידון הטעם שלי | גלו איזה מלבי מתאים לכם",
  description:
    "ענו על 3 שאלות קצרות וגלו איזה מלבי מתאים בדיוק לכם! חידון הטעם של Friends.",
  openGraph: {
    title: "Friends - חידון הטעם שלי",
    description: "גלו איזה מלבי מתאים בדיוק לכם!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${assistant.variable} ${gveret.variable} font-sans antialiased min-h-dvh flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
