// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbvdmTs0kAC4PNBqFONJbbdZOZiWxrTsQ",
  authDomain: "cloth-ecommerce-a6c11.firebaseapp.com",
  projectId: "cloth-ecommerce-a6c11",
  storageBucket: "cloth-ecommerce-a6c11.firebasestorage.app",
  messagingSenderId: "619967994299",
  appId: "1:619967994299:web:f81d2e96783d00849f4c9e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;