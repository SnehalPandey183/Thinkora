// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "myai-650b7.firebaseapp.com",
  projectId: "myai-650b7",
  storageBucket: "myai-650b7.firebasestorage.app",
  messagingSenderId: "3056904498",
  appId: "1:3056904498:web:1cf3f4af9da0863f88cf2b",
  measurementId: "G-WB2D4C6TRP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const googleProvider=new GoogleAuthProvider()