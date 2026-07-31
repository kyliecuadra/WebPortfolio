import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kylie Cuadra — Software Developer",
  description:
    "Java backend systems, AI-powered tooling, and full-stack web platforms built by Kylie Cuadra.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
