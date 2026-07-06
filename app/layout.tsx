import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Double Hedged | Indian Stock Market Trading Education",
  description:
    "Double Hedged is a premium Indian trading education platform for market structure, technical analysis, options logic, futures discipline, risk control, psychology, and chart-based decision-making.",
  keywords: [
    "Double Hedged",
    "Indian stock market education",
    "NIFTY trading education",
    "BANKNIFTY options learning",
    "technical analysis India",
    "trading psychology",
    "risk management trading",
    "options trading education India",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
