"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Capture() {

  const router = useRouter();
  const fileInputRef = useRef(null);

  const openCamera = () => {
    fileInputRef.current.click();
  };

  const handlePhoto = (event) => {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {

      sessionStorage.setItem("photo", reader.result);

      router.push("/upload");

    };

    reader.readAsDataURL(file);

  };

  return (

    <main className="min-h-screen flex flex-col items-center justify-center
    bg-gradient-to-br from-[#3b0a14] via-[#5b0f1f] to-[#1b0207] text-white p-6">

      <h1 className="text-2xl font-semibold mb-6">
        Capture Your POV
      </h1>

      <button
        onClick={openCamera}
        className="
        bg-gradient-to-r
        from-[#8b1e3f]
        to-[#c13c62]
        px-8
        py-4
        rounded-full
        text-lg
        shadow-xl
        hover:scale-105
        transition
        "
      >
        Open Camera
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handlePhoto}
        className="hidden"
      />

    </main>

  );
}