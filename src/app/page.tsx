"use client";

import Button from "@/components/Button";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-gray-900 space-y-4">
      <h1 className="text-3xl font-bold text-white">
        sinehan&apos;s nextjs template 🚀
      </h1>
      <Button variant="primary" onClick={() => alert("stop clicking me!")}>
        Click me
      </Button>
    </main>
  );
}
