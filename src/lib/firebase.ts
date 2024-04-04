// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9JNjBP8V68g5a5PUzEmV4f4xOGTOTVRU",
  authDomain: "svelte-linktree-app.firebaseapp.com",
  projectId: "svelte-linktree-app",
  storageBucket: "svelte-linktree-app.appspot.com",
  messagingSenderId: "633618768281",
  appId: "1:633618768281:web:b3a0126be2ba2331d2b308"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
