"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export default function Memories() {

  const [memories, setMemories] = useState([]);

  // Emoji list for random decoration
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

    <main className="min-h-screen bg-gradient-to-br from-[#3b0a14] via-[#5b0f1f] to-[#1b0207] text-white p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6 max-w-xl mx-auto">

        <h1 className="text-2xl font-semibold">
          Wedding Memories
        </h1>

        <Link href="/capture">
          <button className="bg-white text-black px-4 py-2 rounded-full font-semibold">
            + Share
          </button>
        </Link>

      </div>


      {/* Guestbook Memories */}

      <div className="flex flex-col gap-8 max-w-xl mx-auto">

        {memories.map((m) => (

          <div
            key={m.id}
            style={{ transform: `rotate(${m.tilt}deg)` }}
            className="bg-white text-black rounded-xl shadow-2xl overflow-hidden"
          >

            {/* Photo */}
            <img
              src={m.imageUrl}
              className="w-full"
            />

            {/* Wish Message */}
            <div className="p-6 text-center">

              <p className="italic text-lg leading-relaxed text-gray-800">
                “{m.name}”
              </p>

              {/* Random Emoji */}
              <div className="mt-4 text-3xl">
                {m.emoji}
              </div>

            </div>

          </div>

        ))}

      </div>

    </main>
  );
}