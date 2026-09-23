// Shared Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCA212oYhwdJjb4aLMCWOIJXb2xRwzQylc",
  authDomain: "teatrocapstone.firebaseapp.com",
  projectId: "teatrocapstone",
  storageBucket: "teatrocapstone.appspot.com",
  messagingSenderId: "434560617971",
  appId: "1:434560617971:web:47a8f9c132d014f4429686",
  measurementId: "G-W6221CLGNG"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
