"use client";

import Webcam from "react-webcam";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Capture() {

  const webcamRef = useRef(null);
  const shutterSound = useRef(null);
  const router = useRouter();

  const [cameraOn, setCameraOn] = useState(false);
  const [facingMode, setFacingMode] = useState("environment");
  const [countdown, setCountdown] = useState(null);

  // ✅ preload shutter sound (required for mobile browsers)
  useEffect(() => {
    shutterSound.current = new Audio("/sounds/shutter.mp3");
    shutterSound.current.preload = "auto";
  }, []);

  // ✅ Start camera (mobile permission requirement)
  const startCamera = () => {
    setCameraOn(true);
  };

  // ✅ Switch front/back camera
  const switchCamera = () => {
    setFacingMode(prev =>
      prev === "environment" ? "user" : "environment"
    );
  };

  // ✅ Flip image back to normal (because preview is mirrored)
  const flipImage = (dataUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = dataUrl;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

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

  // ✅ Take photo
  const takePhoto = async () => {

    // 📸 shutter sound
    if (shutterSound.current) {
      shutterSound.current.currentTime = 0;
      shutterSound.current.play().catch(() => {});
    }

    // 📳 vibration feedback
    if ("vibrate" in navigator) {
      navigator.vibrate(120);
    }

    let image = webcamRef.current.getScreenshot();

    // fix mirror only for front camera
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
            mirrored={facingMode === "user"}   // ✅ mirror preview only
            className="w-full max-w-md rounded-xl"
          />

          {/* COUNTDOWN */}
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