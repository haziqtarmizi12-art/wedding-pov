"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "../lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export default function Memories() {

  const [memories, setMemories] = useState([]);
  const [view, setView] = useState("list");

  const emojis = [
    "🌷","🌻","🌼","💐","🌺","🌹","🪷",
    "❤️","💕","♥️","💙","💗","💖"
  ];

  useEffect(() => {

    const q = query(
      collection(db, "memories"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        tilt: (Math.random() * 4 - 2).toFixed(2),
        emoji: emojis[Math.floor(Math.random() * emojis.length)]
      }));

      setMemories(data);

    });

    return () => unsubscribe();

  }, []);

  return (

    <main className="min-h-screen bg-gradient-to-br from-[#3b0a14] via-[#5b0f1f] to-[#1b0207] text-white">

      {/* Sticky Header */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/20">

        <div className="max-w-xl mx-auto px-5 py-4 flex justify-between items-center">

          <div>
            <h1 className="text-xl font-semibold">
              Memories
            </h1>
            <p className="text-sm text-white/70">
              Haziq & Abbydatul
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2">

            <button
              onClick={() => setView("grid")}
              className={`px-3 py-1 rounded-lg ${
                view === "grid"
                  ? "bg-white/30"
                  : "bg-white/10"
              }`}
            >
              ⬛
            </button>

            <button
              onClick={() => setView("list")}
              className={`px-3 py-1 rounded-lg ${
                view === "list"
                  ? "bg-white/30"
                  : "bg-white/10"
              }`}
            >
              ☰
            </button>

          </div>

        </div>

      </div>


      {/* Breathing Take Photo Button */}

      <div className="flex justify-center mt-6">

        <Link href="/capture">

          <button className="
            bg-white
            text-black
            px-6
            py-3
            rounded-full
            font-semibold
            shadow-xl
            animate-pulse
            hover:scale-105
            transition
          ">
            📸 Take Photos
          </button>

        </Link>

      </div>


      {/* Memories Gallery */}

      <div
        className={`max-w-xl mx-auto p-6 ${
          view === "grid"
            ? "grid grid-cols-2 gap-6"
            : "flex flex-col gap-8"
        }`}
      >

        {memories.map((m) => (

          <div
            key={m.id}
            style={{ transform: `rotate(${m.tilt}deg)` }}
            className="bg-white text-black rounded-xl shadow-2xl overflow-hidden"
          >

            <img
              src={m.imageUrl}
              className="w-full"
            />

            <div className="p-5 text-center">

              <p className="italic text-lg leading-relaxed text-gray-800">
                “{m.name}”
              </p>

              <div className="mt-3 text-2xl">
                {m.emoji}
              </div>

            </div>

          </div>

        ))}

      </div>


      {/* Floating + Button */}

      <Link href="/capture">

        <button
          className="
          fixed
          bottom-6
          right-6
          w-16
          h-16
          rounded-full
          bg-gradient-to-br
          from-[#8b1e3f]
          to-[#c13c62]
          text-white
          text-3xl
          shadow-2xl
          flex
          items-center
          justify-center
          hover:scale-110
          transition
        "
        >
          +
        </button>

      </Link>

    </main>
  );
}