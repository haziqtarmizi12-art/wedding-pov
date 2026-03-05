"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot
} from "firebase/firestore";

export default function Memories() {

  const [memories, setMemories] = useState([]);
  const [view, setView] = useState("list"); // ⭐ default LIST

  useEffect(() => {

    const q = query(
      collection(db, "memories"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        tilt: (Math.random() * 6 - 3).toFixed(2)
      }));

      setMemories(data);

    });

    return () => unsubscribe();

  }, []);

  return (

    <main className="min-h-screen bg-gradient-to-br from-[#3b0a14] via-[#5b0f1f] to-[#1b0207] text-white">

      {/* HEADER */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">

        <div className="max-w-4xl mx-auto px-5 py-4 flex justify-between items-center">

          <div>
            <h1 className="text-xl font-semibold">MEMORIES</h1>
            <p className="text-sm text-white/70">ABBY & HAZIQ</p>
          </div>

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


      {/* CONTENT */}
      <div className="max-w-4xl mx-auto p-5">

        {/* Share POV Button */}
        <Link href="/capture">

          <div className="flex justify-center mb-8">

            <button className="
              bg-gradient-to-r
              from-[#8b1e3f]
              to-[#b8335a]
              px-6 py-3
              rounded-full
              shadow-xl
              text-white
              text-lg
              animate-pulse
              hover:scale-105
              transition
            ">
              Share Your POV
            </button>

          </div>

        </Link>


        {/* GALLERY */}

        <div
          className={
            view === "grid"
              ? "grid grid-cols-2 gap-6"
              : "flex flex-col gap-6"
          }
        >

          {memories.map((m) => (

            <div
              key={m.id}
              style={{ transform: `rotate(${m.tilt}deg)` }}
              className="
                bg-white
                text-black
                rounded-lg
                shadow-2xl
                p-3
                hover:scale-105
                transition
              "
            >

              <img
                src={m.imageUrl}
                className="rounded-md w-full"
              />

              <div className="pt-3 text-center">

                <p className="font-semibold">
                  {m.name || "Guest"}
                </p>

                {m.wish && (
                  <p className="text-sm text-gray-600">
                    {m.wish}
                  </p>
                )}

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* FLOATING PLUS BUTTON */}

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