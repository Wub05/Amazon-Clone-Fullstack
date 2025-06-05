// Modular ways of import....there is a legacy way also
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const API_KEY = import.meta.env.VITE_API_KEY; //api key imported

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "clone-43875.firebaseapp.com",
  projectId: "clone-43875",
  storageBucket: "clone-43875.firebasestorage.app",
  messagingSenderId: "444816878034",
  appId: "1:444816878034:web:98d1ea8f4fd2de61be000b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
