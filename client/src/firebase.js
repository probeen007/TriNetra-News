// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "news-91603.firebaseapp.com",
  projectId: "news-91603",
  storageBucket: "news-91603.firebasestorage.app",
  messagingSenderId: "303296800592",
  appId: "1:303296800592:web:c0ec88ad8bc3ea8307ee55"

};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

