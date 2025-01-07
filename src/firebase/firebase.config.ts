// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxCeB7XbNBG1fg0IqV0lUfstF4zlntJDY",
  authDomain: "pawcare-f91c9.firebaseapp.com",
  projectId: "pawcare-f91c9",
  storageBucket: "pawcare-f91c9.firebasestorage.app",
  messagingSenderId: "626251363968",
  appId: "1:626251363968:web:83d0b446c48acc4a2c5865"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;