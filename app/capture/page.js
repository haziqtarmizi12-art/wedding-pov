"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Upload() {

  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [wish, setWish] = useState("");
  const router = useRouter();

  useEffect(() => {
    const savedPhoto = sessionStorage.getItem("photo");
    setPhoto(savedPhoto);
  }, []);

  const handleUpload = async () => {

    // ✅ convert base64 → blob
    const res = await fetch(photo);
    const blob = await res.blob();

    const formData = new FormData();
    formData.append("file", blob, "capture.jpg");
    formData.append("name", name);
    formData.append("wish", wish);

    // ✅ IMPORTANT: NO headers here
    const upload = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await upload.json();

    console.log(result);

    router.push("/memories");
  };

  return (
    <div className="p-6 flex flex-col items-center">

      {photo && (
        <img src={photo} className="mb-4 rounded-xl"/>
      )}

      <input
        placeholder="Your Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        className="border p-2 mb-2"
      />

      <input
        placeholder="Your Wish"
        value={wish}
        onChange={(e)=>setWish(e.target.value)}
        className="border p-2 mb-4"
      />

      <button
        onClick={handleUpload}
        className="bg-pink-600 text-white px-4 py-2 rounded-xl"
      >
        Upload Memory
      </button>

    </div>
  );
}