"use client";

import Webcam from "react-webcam";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Capture() {

  const webcamRef = useRef(null);
  const router = useRouter();

  const [facingMode, setFacingMode] = useState("user");
  const [countdown, setCountdown] = useState(null);

  const capture = () => {

    let count = 3;

    setCountdown(count);

    const timer = setInterval(() => {

      count--;

      if (count === 0) {

        clearInterval(timer);

        const image = webcamRef.current.getScreenshot();

        sessionStorage.setItem("photo", image);

        // vibration
        if (navigator.vibrate) navigator.vibrate(200);

        // shutter sound
        const audio = new Audio("/sounds/shutter.mp3");
        audio.play();

        router.push("/upload");

      }

      setCountdown(count);

    }, 1000);

  };

  const switchCamera = () => {
    setFacingMode(prev => prev === "user" ? "environment" : "user");
  };

  return (

    <main className="min-h-screen flex flex-col items-center justify-center
    bg-gradient-to-br from-[#3b0a14] via-[#5b0f1f] to-[#1b0207] text-white p-6">

      <h1 className="text-xl mb-4 font-semibold">
        Capture Your POV
      </h1>

      <div className="relative">

        {countdown !== null && countdown > 0 && (

          <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold z-10">
            {countdown}
          </div>

        )}

        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          mirrored={false}
          videoConstraints={{
            facingMode
          }}
          className="rounded-2xl shadow-2xl border-4 border-white/20"
        />

      </div>

      <div className="flex gap-6 mt-6">

        <button
          onClick={capture}
          className="bg-white text-black px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition"
        >
          Capture
        </button>

        <button
          onClick={switchCamera}
          className="bg-white/20 px-6 py-3 rounded-full"
        >
          Switch
        </button>

      </div>

    </main>
  );
}