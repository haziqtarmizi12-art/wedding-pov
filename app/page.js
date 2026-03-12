"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden">

      {/* Poster Image */}
      <img
        src="/poster.jpg"
        alt="Wedding Poster"
        className="absolute w-full h-full object-cover"
      />

      {/* Buttons */}
      <div
        className="absolute w-full flex flex-col items-center gap-4"
        style={{ top: "47%" }}
      >

        {/* Take Photos (Glowing) */}
        <Link href="/capture">
          <button className="bg-white text-black px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:scale-105 transition animate-pulse">
            Take Photos →
          </button>
        </Link>

        {/* Gallery */}
        <Link href="/memories">
          <button className="bg-black/60 backdrop-blur-md text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:scale-105 transition">
            View Gallery
          </button>
        </Link>

      </div>

    </main>
  );
}