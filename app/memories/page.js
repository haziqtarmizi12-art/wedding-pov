"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "../../lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default function Memories() {

  const [memories, setMemories] = useState([]);

  useEffect(() => {

    const loadMemories = async () => {
      const q = query(
        collection(db, "memories"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMemories(data);
    };

    loadMemories();
    const interval = setInterval(loadMemories, 5000);

    return () => clearInterval(interval);

  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white px-4 py-10">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-semibold tracking-tight">
          Wedding Memories
        </h1>

        <p className="text-gray-500 mt-2">
          Capture moments • Share happiness ❤️
        </p>

        <Link href="/capture">
          <button className="mt-6 bg-pink-600 hover:bg-pink-700 transition text-white px-6 py-3 rounded-full shadow-lg">
            📸 Upload Your POV
          </button>
        </Link>
      </div>

      {/* GALLERY */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {memories.length === 0 && (
          <p className="col-span-full text-center text-gray-400">
            No memories yet...
          </p>
        )}

        {memories.map((m) => (
          <div
            key={m.id}
            className="bg-white/80 backdrop-blur rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
          >
            {m.imageUrl && (
              <img
                src={m.imageUrl}
                alt="memory"
                className="w-full aspect-square object-cover"
              />
            )}

            <div className="p-3">
              <p className="font-semibold text-sm">
                {m.name || "Guest"}
              </p>

              {m.wish && (
                <p className="text-xs text-gray-500 mt-1">
                  {m.wish}
                </p>
              )}
            </div>
          </div>
        ))}

      </div>

    </main>
  );
}