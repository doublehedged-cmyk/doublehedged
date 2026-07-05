import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trading Learning Academy",
  description:
    "A premium trading education page focused on market foundations, technical analysis, risk management, psychology, and responsible practice.",
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
