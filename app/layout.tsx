import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "DuoDecide | UX Western Visayas",
  description:
    "An interactive UX voting game where you choose the better design. Test your UI/UX knowledge with side-by-side comparisons. Powered by UX Western Visayas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${hankenGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-hanken bg-surface text-on-surface">
        {children}
      </body>
    </html>
  );
}
