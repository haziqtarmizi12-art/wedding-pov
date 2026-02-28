"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function base64ToFile(base64, filename) {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

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

    if (!photo) return;

    const file = base64ToFile(photo, "capture.jpg");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("wish", wish);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    console.log(result);

    router.push("/memories");
  };

  return (
    <div className="p-6 flex flex-col items-center">

      {photo && (
        <img src={photo} className="mb-4 rounded-xl w-full max-w-sm"/>
      )}

      <input
        placeholder="Your Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        className="border p-2 mb-2 w-full max-w-sm"
      />

      <input
        placeholder="Your Wish"
        value={wish}
        onChange={(e)=>setWish(e.target.value)}
        className="border p-2 mb-4 w-full max-w-sm"
      />

      <button
        onClick={handleUpload}
        className="bg-pink-600 text-white px-6 py-3 rounded-xl"
      >
        Upload Memory
      </button>

    </div>
  );
}