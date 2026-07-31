import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://kylie.dev"; // TODO: replace with the real deployed domain

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Kylie Cuadra — Software Developer",
  description:
    "Java backend systems, AI-powered tooling, and full-stack web platforms built by Kylie Cuadra.",
  applicationName: "kylie.dev",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Kylie Cuadra — Software Developer",
    description:
      "Java backend systems, AI-powered tooling, and full-stack web platforms built by Kylie Cuadra.",
    url: SITE_URL,
    siteName: "kylie.dev",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Kylie Cuadra — Software Developer",
    description:
      "Java backend systems, AI-powered tooling, and full-stack web platforms built by Kylie Cuadra.",
  },
};

export const viewport = {
  themeColor: "#0a0d12",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
