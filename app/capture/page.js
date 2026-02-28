"use client";

import Webcam from "react-webcam";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Capture() {

  const webcamRef = useRef(null);
  const router = useRouter();

  const [cameraOn, setCameraOn] = useState(false);

  const startCamera = () => {
    setCameraOn(true);
  };

  const capture = () => {
    const image = webcamRef.current.getScreenshot();
    sessionStorage.setItem("photo", image);
    router.push("/upload");
  };

  return (
    <div className="flex flex-col items-center p-6">

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
            videoConstraints={{
              facingMode: "environment" // back camera on phone
            }}
            className="rounded-xl"
          />

          <button
            onClick={capture}
            className="mt-4 bg-pink-600 text-white px-6 py-3 rounded-xl"
          >
            Capture
          </button>
        </>
      )}

    </div>
  );
}