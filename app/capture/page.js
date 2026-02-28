"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function Capture() {
  const inputRef = useRef(null);
  const router = useRouter();

  const openCamera = () => {
    inputRef.current.click();
  };

  const handleCapture = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // convert file to base64
    const reader = new FileReader();

    reader.onloadend = () => {
      sessionStorage.setItem("photo", reader.result);
      router.push("/upload");
    };

    reader.readAsDataURL(file);
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-pink-50 p-6">

      <h1 className="text-3xl font-bold text-pink-700 mb-8">
        Take a Photo
      </h1>

      {/* Hidden camera input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleCapture}
        className="hidden"
      />

      {/* Camera Button */}
      <button
        onClick={openCamera}
        className="bg-pink-600 text-white px-8 py-4 rounded-full shadow-xl text-lg"
      >
        Open Camera 📷
      </button>

      <p className="text-gray-500 mt-6 text-center">
        Your phone camera will open automatically
      </p>

    </main>
  );
}