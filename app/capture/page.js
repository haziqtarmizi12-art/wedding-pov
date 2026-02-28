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
  const [flash, setFlash] = useState(false);

  // start camera (required for mobile permission)
  const startCamera = () => {
    setCameraOn(true);
  };

  // switch camera
  const switchCamera = () => {
    setFacingMode(prev =>
      prev === "environment" ? "user" : "environment"
    );
  };

  // countdown capture
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

  // take photo
  const takePhoto = () => {
    setFlash(true);

    setTimeout(() => setFlash(false), 150);

    const image = webcamRef.current.getScreenshot();

    sessionStorage.setItem("photo", image);

    setTimeout(() => {
      router.push("/upload");
    }, 200);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black relative">

      {/* FLASH EFFECT */}
      {flash && (
        <div className="absolute inset-0 bg-white opacity-80 z-50"></div>
      )}

      {!cameraOn && (
        <button
          onClick={startCamera}
          className="bg-pink-600 text-white px-6 py-3 rounded-xl"
        >
          Start Camera
        </button>
      )}

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