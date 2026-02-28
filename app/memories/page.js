"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "lib/firebase";
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

export default function Memories() {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load memories from Firestore
  useEffect(() => {
    const loadMemories = async () => {
      try {
        const q = query(
          collection(db, "memories"),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMemories(data);
      } catch (err) {
        console.error("Error loading memories:", err);
      }

      setLoading(false);
    };

    loadMemories();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-pink-50 py-10 px-4">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-pink-700">
          Memories
        </h1>

        <p className="text-gray-600 mt-2">
          Share your beautiful moments together
        </p>

        <Link href="/capture">
          <button className="mt-6 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full shadow-lg transition">
            Add Your POV
          </button>
        </Link>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-gray-500">
          Loading memories...
        </p>
      )}

      {/* POLAROID GALLERY */}
      <div className="max-w-md mx-auto flex flex-col items-center gap-12">

        {memories.map((m, index) => {
          // Alternate tilt
          const rotation =
            index % 2 === 0
              ? "rotate-[-3deg]"
              : "rotate-[3deg]";

          return (
            <div
              key={m.id}
              className={`bg-white p-4 rounded-xl shadow-xl ${rotation}
              transition duration-300 hover:rotate-0 hover:scale-105`}
              style={{ width: "85%" }}
            >
              {/* IMAGE */}
              {m.imageUrl && (
                <img
                  src={m.imageUrl}
                  alt="memory"
                  className="w-full object-cover rounded-md"
                />
              )}

              {/* TEXT */}
              <div className="text-center mt-3">
                <p className="font-semibold text-gray-800">
                  {m.name || "Anonymous"}
                </p>

                {m.wish && (
                  <p className="text-sm text-gray-500 mt-1">
                    {m.wish}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* EMPTY STATE */}
      {!loading && memories.length === 0 && (
        <p className="text-center text-gray-400 mt-10">
          No memories yet. Be the first to upload ❤️
        </p>
      )}
    </main>
  );
}