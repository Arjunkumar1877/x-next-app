// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "x-next-423418.firebaseapp.com",
  projectId: "x-next-423418",
  storageBucket: "x-next-423418.appspot.com",
  messagingSenderId: "593222000489",
  appId: "1:593222000489:web:4a1081612f3209e159e7f8",
  measurementId: "G-533Q9J034H"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);