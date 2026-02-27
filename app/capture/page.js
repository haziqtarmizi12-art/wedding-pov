"use client";

import Webcam from "react-webcam";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function Capture() {

  const webcamRef = useRef(null);
  const router = useRouter();

  const capture = () => {
    const image = webcamRef.current.getScreenshot();
    sessionStorage.setItem("photo", image);
    router.push("/upload");
  };

  return (
    <div className="flex flex-col items-center">
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg"/>
      <button onClick={capture}
        className="mt-4 bg-pink-600 text-white px-4 py-2">
        Capture
      </button>
    </div>
  );
}