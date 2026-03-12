"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden">

      {/* Poster */}
      <img
        src="/poster.jpg"
        alt="Wedding Poster"
        className="absolute w-full h-full object-cover"
      />

      {/* Take Photo Button */}
      <div className="absolute w-full flex justify-center" style={{ top: "65%" }}>
        <Link href="/capture">
          <button className="bg-white text-black px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:scale-105 transition">
            Take Photos →
          </button>
        </Link>
      </div>

    </main>
  );
}