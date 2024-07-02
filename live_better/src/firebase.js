// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_SECRET_KEY,
  authDomain: "mern-realestate-28cf5.firebaseapp.com",
  projectId: "mern-realestate-28cf5",
  storageBucket: "mern-realestate-28cf5.appspot.com",
  messagingSenderId: "367605343522",
  appId: "1:367605343522:web:d8298bcd6ff742edf3317b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);