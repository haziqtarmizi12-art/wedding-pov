"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Memories() {

  const [memories, setMemories] = useState([]);

  useEffect(() => {
    fetch("/api/memories")
      .then(res => res.json())
      .then(data => setMemories(data));
  }, []);

  return (

    <main className="min-h-screen
    bg-gradient-to-br from-[#3b0a14] via-[#5b0f1f] to-[#1b0207]
    p-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Wedding Memories 📸
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {memories.map((memory, index) => (

            <div
              key={index}
              className="bg-[#c38a8f]/90 backdrop-blur-md rounded-xl shadow-lg overflow-hidden"
            >

              <img
                src={memory.imageUrl}
                className="w-full h-56 object-cover"
              />

              <div className="p-4">

                <p className="font-semibold text-white">
                  {memory.name}
                </p>

                {memory.wish && (
                  <p className="text-sm text-white/90 mt-1 italic">
                    "{memory.wish}"
                  </p>
                )}

              </div>

            </div>

          ))}

        </div>

        <div className="flex justify-center mt-10">

          <Link href="/">

            <button
              className="bg-gradient-to-r
              from-[#8b1e3f]
              to-[#c13c62]
              text-white
              px-6
              py-3
              rounded-lg
              font-semibold
              hover:scale-105
              transition"
            >
              Take Another Photo
            </button>

          </Link>

        </div>

      </div>

    </main>

  );
}