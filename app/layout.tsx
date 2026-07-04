import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Double Hedge Trading Academy",
  description:
    "A premium trading education platform teaching technical analysis, risk management, trading psychology, and options trading.",
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
