"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default function Memories() {

  const [memories, setMemories] = useState([]);
  const [view, setView] = useState("grid");

  useEffect(() => {
    const loadMemories = async () => {

      const q = query(
        collection(db, "memories"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map(doc => doc.data());

      setMemories(data);
    };

    loadMemories();
  }, []);

  return (

    <main className="min-h-screen bg-gradient-to-b from-[#6B0F1A] via-[#8C1C2A] to-[#B23A48] text-white">

      {/* HEADER */}
      <div className="sticky top-0 z-20 backdrop-blur bg-[#6B0F1A]/80 p-4 shadow-lg">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold">Memories</h1>
            <p className="text-sm opacity-80">Your Wedding Gallery</p>
          </div>

          <div className="flex gap-2">

            <button
              onClick={() => setView("grid")}
              className={`px-3 py-1 rounded ${
                view === "grid"
                  ? "bg-white text-black"
                  : "bg-[#8C1C2A]"
              }`}
            >
              Grid
            </button>

            <button
              onClick={() => setView("list")}
              className={`px-3 py-1 rounded ${
                view === "list"
                  ? "bg-white text-black"
                  : "bg-[#8C1C2A]"
              }`}
            >
              List
            </button>

          </div>

        </div>

        {/* SHARE BUTTON */}
        <div className="mt-4">

          <Link href="/capture">

            <button className="w-full py-3 rounded-xl bg-[#B23A48] font-semibold animate-pulse shadow-lg">
              Start Sharing Your POV
            </button>

          </Link>

        </div>

      </div>

      {/* GALLERY */}

      <div className={`p-6 ${
        view === "grid"
          ? "grid grid-cols-2 gap-6"
          : "flex flex-col gap-6"
      }`}>

        {memories.map((m, i) => (

          <div
            key={i}
            className={`bg-white text-black rounded-xl shadow-xl p-3 transform ${
              i % 2 === 0 ? "rotate-2" : "-rotate-2"
            }`}
          >

            <img
              src={m.imageUrl}
              className="rounded-lg w-full mb-3"
            />

            <p className="font-semibold">{m.name}</p>

            <p className="text-xs text-gray-500">
              {new Date(m.createdAt).toLocaleDateString()}
            </p>

          </div>

        ))}

      </div>

      {/* FLOATING SHARE BUTTON */}

      <Link href="/capture">

        <button className="fixed bottom-8 right-6 bg-white text-[#6B0F1A] w-16 h-16 rounded-full shadow-xl text-3xl flex items-center justify-center animate-bounce">

          +

        </button>

      </Link>

    </main>

  );
}