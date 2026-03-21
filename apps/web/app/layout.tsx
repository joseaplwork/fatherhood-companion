import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fatherhood Companion",
  description:
    "A pnpm monorepo with a Next.js web app and a Storybook UI package.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
