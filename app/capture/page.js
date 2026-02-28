"use client";

import Webcam from "react-webcam";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Capture() {

  const webcamRef = useRef(null);
  const router = useRouter();

  const [cameraOn, setCameraOn] = useState(false);
  const [facingMode, setFacingMode] = useState("environment");
  const [countdown, setCountdown] = useState(null);

  // ✅ Start camera (required for mobile browsers)
  const startCamera = () => {
    setCameraOn(true);
  };

  // ✅ Switch front/back camera
  const switchCamera = () => {
    setFacingMode(prev =>
      prev === "environment" ? "user" : "environment"
    );
  };

  // ✅ Flip image (fix mirrored selfie)
  const flipImage = (dataUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = dataUrl;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        // mirror horizontally
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(img, 0, 0);

        resolve(canvas.toDataURL("image/jpeg"));
      };
    });
  };

  // ✅ Countdown before capture
  const startCapture = () => {
    let time = 3;
    setCountdown(time);

    const timer = setInterval(() => {
      time--;

      if (time === 0) {
        clearInterval(timer);
        setCountdown(null);
        takePhoto();
      } else {
        setCountdown(time);
      }
    }, 1000);
  };

  // ✅ Take photo with sound + vibration
  const takePhoto = async () => {

    // 📸 shutter sound
    const shutter = new Audio("/sounds/shutter.mp3");
    shutter.play().catch(() => {});

    // 📳 vibration (if supported)
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }

    let image = webcamRef.current.getScreenshot();

    // fix mirror for front camera
    if (facingMode === "user") {
      image = await flipImage(image);
    }

    sessionStorage.setItem("photo", image);

    setTimeout(() => {
      router.push("/upload");
    }, 200);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black relative">

      {/* START CAMERA BUTTON */}
      {!cameraOn && (
        <button
          onClick={startCamera}
          className="bg-pink-600 text-white px-6 py-3 rounded-xl"
        >
          Start Camera
        </button>
      )}

      {/* CAMERA VIEW */}
      {cameraOn && (
        <>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode }}
            className="w-full max-w-md rounded-xl"
          />

          {/* COUNTDOWN DISPLAY */}
          {countdown && (
            <div className="absolute text-white text-7xl font-bold">
              {countdown}
            </div>
          )}

          {/* CONTROLS */}
          <div className="flex gap-4 mt-6">

            <button
              onClick={switchCamera}
              className="bg-white px-4 py-2 rounded-xl"
            >
              🔄 Switch
            </button>

            <button
              onClick={startCapture}
              className="bg-pink-600 text-white px-6 py-3 rounded-full"
            >
              Capture
            </button>

          </div>
        </>
      )}

    </div>
  );
}