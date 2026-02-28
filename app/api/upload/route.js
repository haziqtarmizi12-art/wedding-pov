export const runtime = "nodejs";

import { storage, db } from "lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export async function POST(req) {
  try {
    const data = await req.formData();

    const file = data.get("file");
    const name = data.get("name");

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    // create unique filename
    const fileName = `${Date.now()}-${file.name}`;

    // upload to Firebase Storage
    const storageRef = ref(storage, `memories/${fileName}`);

    const bytes = await file.arrayBuffer();

    await uploadBytes(storageRef, new Uint8Array(bytes));

    // ⭐ THIS PART FIXES YOUR ISSUE
    const downloadURL = await getDownloadURL(storageRef);

    // save to Firestore
    await addDoc(collection(db, "memories"), {
      name: name || "Guest",
      imageUrl: downloadURL,
      createdAt: Date.now(),
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error(error);
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}