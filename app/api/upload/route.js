import { storage, db } from "lib/firebase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export async function POST(req) {
  try {
    console.log("✅ Upload API HIT");

    // Get data from frontend
    const body = await req.json();
    const { image, name } = body;

    if (!image) {
      return Response.json(
        { error: "No image received" },
        { status: 400 }
      );
    }

    // ===== ITEM 5: Upload image & save memory =====

// Create unique file name
const fileName = `memories/${Date.now()}.jpg`;

// Create Firebase Storage reference
const storageRef = ref(storage, fileName);

// Upload base64 image to Firebase Storage
await uploadString(storageRef, image, "data_url");

// Get downloadable URL from Firebase
const downloadURL = await getDownloadURL(storageRef);

console.log("Image uploaded:", downloadURL);

// Save image info into Firestore database
await addDoc(collection(db, "memories"), {
  imageUrl: downloadURL,
  name: name || "Anonymous",
  createdAt: serverTimestamp(),
});

console.log("Memory saved to Firestore");
    return Response.json({ success: true });

  } catch (error) {
    console.error("❌ Upload failed:", error);

    return Response.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}