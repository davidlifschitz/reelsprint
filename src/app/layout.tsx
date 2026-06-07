import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReelSprint — Local Business Promo Video Packs",
  description: "Generate TikTok and Reels-ready promo packs for local businesses."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
