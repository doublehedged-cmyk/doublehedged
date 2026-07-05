import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bonsai Japan Testing Page",
  description:
    "A clean bonsai testing start page featuring Japanese bonsai plants, tree care notes, and a simple input area.",
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
