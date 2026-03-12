"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Upload() {

  const router = useRouter();

  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [wish, setWish] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("photo");
    if (saved) {
      setPhoto(saved);
    }
  }, []);

  const handleUpload = async () => {

    setLoading(true);

    const blob = await fetch(photo).then(r => r.blob());
    const file = new File([blob], "photo.jpg", { type: "image/jpeg" });

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("wish", wish);

    await fetch("/api/upload", {
      method: "POST",
      body: formData
    });

    router.push("/memories");
  };

  if (!photo) return null;

  return (
    <main className="min-h-screen flex items-center justify-center
    bg-gradient-to-br from-[#3b0a14] via-[#5b0f1f] to-[#1b0207] p-6">

      <div className="bg-[#c38a8f]/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 w-full max-w-md">

        <h1 className="text-xl font-semibold mb-4 text-center text-white">
          Share Your Memory
        </h1>

        <img
          src={photo}
          className="rounded-xl mb-4 border-4 border-white shadow-lg"
        />

        <input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-white/40 bg-white/80 rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-[#8b1e3f]"
        />

        <textarea
          placeholder="Write a wish for the couple..."
          value={wish}
          onChange={(e) => setWish(e.target.value)}
          className="w-full border border-white/40 bg-white/80 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#8b1e3f]"
        />

        <p className="text-sm text-center text-white/90 mb-3">
          Leave a memory for the couple 💌
        </p>

        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full bg-gradient-to-r
          from-[#8b1e3f]
          to-[#c13c62]
          text-white
          py-3
          rounded-lg
          font-semibold
          hover:scale-105
          transition"
        >
          {loading ? "Uploading..." : "Upload Memory"}
        </button>

      </div>

    </main>
  );
}