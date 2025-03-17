// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "sinehan.dev",
  description: "Showcasing my work and thoughts.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-white text-black ${inter.className}`}>
        {/* <Navbar /> */}
        <main>{children}</main>
      </body>
    </html>
  );
}

//The layout.tsx file wraps all pages (in the app directory).
// Setting bg-white and text-black from Tailwind keeps the theme clean and minimal—fits the philosophy vibe.
// Next 13 uses Server Components by default in app, which is good for performance and SSR.

//By default, Server Components in the app dir are static unless you fetch dynamic data.
// You can force SSR by using export const dynamic = 'force-dynamic' or similar config at the top of a page.
// For now, the homepage can stay static (fast and good for performance). If we integrate a blog feed or external data, we’ll talk about SSR or incremental static regeneration.
