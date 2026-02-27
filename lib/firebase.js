import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAfUPcuTJGbQ5C_USGvfLYxMP4PD6QFnBU",
  authDomain: "wedding-pov-1f6f7.firebaseapp.com",
  projectId: "wedding-pov-1f6f7",
  storageBucket: "wedding-pov-1f6f7.firebasestorage.app",
  messagingSenderId: "113175261577",
  appId: "1:113175261577:web:2b768843189fb74542b158",
  measurementId: "G-7D91NXZ7WR"
};

// ✅ Prevent Firebase from initializing multiple times (Next.js requirement)
const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

// ✅ Firestore database
const db = getFirestore(app);

// ✅ Firebase Storage
const storage = getStorage(app);

// ✅ export so other files can use
export { db, storage };