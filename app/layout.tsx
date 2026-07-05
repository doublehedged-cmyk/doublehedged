import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Indian Bonsai Artists Page",
  description:
    "A clean bonsai page featuring Indian bonsai artists, tropical tree species, care notes, and a simple bonsai note area.",
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
