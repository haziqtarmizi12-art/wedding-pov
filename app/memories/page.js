"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "../../lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default function Memories() {

  const [memories, setMemories] = useState([]);

  useEffect(() => {

    const loadMemories = async () => {
      try {
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

      } catch (error) {
        console.error("Error loading memories:", error);
      }
    };

    // first load
    loadMemories();

    // ✅ LIVE GALLERY AUTO REFRESH (every 5 seconds)
    const interval = setInterval(loadMemories, 5000);

    return () => clearInterval(interval);

  }, []);

  return (
    <main className="min-h-screen bg-pink-50 p-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-center mb-2">
        Wedding Memories
      </h1>

      <p className="text-center text-gray-600 mb-6">
        Scan • Capture • Share your moments ❤️
      </p>

      {/* UPLOAD BUTTON */}
      <div className="flex justify-center">
        <Link href="/capture">
          <button className="bg-pink-600 text-white px-6 py-3 rounded-xl mb-8">
            Upload Your POV
          </button>
        </Link>
      </div>

      {/* GALLERY GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

        {memories.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No memories yet...
          </p>
        )}

        {memories.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-xl shadow p-2"
          >
            {m.imageUrl && (
              <img
                src={m.imageUrl}
                alt="memory"
                className="rounded-lg mb-2 w-full object-cover"
              />
            )}

            <p className="font-semibold">
              {m.name || "Guest"}
            </p>

            {m.wish && (
              <p className="text-sm text-gray-600">
                {m.wish}
              </p>
            )}
          </div>
        ))}

      </div>

    </main>
  );
}