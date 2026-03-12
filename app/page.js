"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <img
        src="/poster.jpg"
        className="absolute w-full h-full object-cover"
        alt="Wedding Poster"
      />

      {/* DARK OVERLAY (optional for better button visibility) */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* TAKE PHOTO BUTTON */}
      <div className="absolute bottom-12 w-full flex justify-center">
        <Link href="/capture">
          <button className="bg-white text-black px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:scale-105 transition">
            Take Photos →
          </button>
        </Link>
      </div>

    </main>
  );
}