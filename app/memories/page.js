"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "lib/firebase";
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

      const data = snapshot.docs.map(doc => doc.data());

      setMemories(data);
    };

    loadMemories();

  }, []);

  return (
    <main className="min-h-screen bg-pink-50 p-6">

      <h1 className="text-3xl font-bold mb-6">
        Memories
      </h1>

      <Link href="/capture">
        <button className="bg-pink-600 text-white px-5 py-3 rounded-xl mb-6">
          Upload Your POV
        </button>
      </Link>

      <div className="grid grid-cols-2 gap-4">

        {memories.map((m, index) => (
          <div key={index} className="bg-white rounded-xl shadow p-2">

            <img
              src={m.image}
              className="rounded-lg mb-2"
            />

            <p className="font-semibold">{m.name}</p>
            <p className="text-sm text-gray-600">{m.wish}</p>

          </div>
        ))}

      </div>

    </main>
  );
}