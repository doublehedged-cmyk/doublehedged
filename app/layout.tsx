import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Double Hedged | Indian Stock Market Trading Education",
  description:
    "Double Hedged is a behavioral risk manager and trading education platform that helps Indian traders catch FOMO, revenge trading, weak setups, and excessive risk before money is at risk.",
  keywords: [
    "Double Hedged",
    "Indian stock market education",
    "NIFTY trading education",
    "BANKNIFTY options learning",
    "technical analysis India",
    "trading psychology",
    "risk management trading",
    "options trading education India",
    "trading course subscription India",
    "stock market learning app India",
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
