"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Upload(){

  const [name,setName]=useState("");
  const [wish,setWish]=useState("");
  const router = useRouter();

  const submit = async () => {

    const image = sessionStorage.getItem("photo");

    await fetch("/api/upload",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        image,
        name,
        wish
      })
    });

    alert("Memory uploaded!");
    router.push("/memories");
  };

  return(
    <main className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Add Your Wishes
      </h1>

      <input
        placeholder="Your Name"
        className="border p-2 w-full"
        onChange={(e)=>setName(e.target.value)}
      />

      <textarea
        placeholder="Your wishes..."
        className="border p-2 w-full mt-4"
        onChange={(e)=>setWish(e.target.value)}
      />

      <button
        onClick={submit}
        className="mt-6 bg-pink-600 text-white px-5 py-3 rounded">
        Upload Memory
      </button>

    </main>
  );
}