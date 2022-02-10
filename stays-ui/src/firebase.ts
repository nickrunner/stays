// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {default as firebase} from "../stays_platform_creds.json";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOTx6Bq-gIQDdfPDcxMGtZ0EC0FPGUTqg",
  authDomain: "stays-platform.firebaseapp.com",
  projectId: "stays-platform",
  storageBucket: "stays-platform.appspot.com",
  messagingSenderId: "705294162386",
  appId: "1:705294162386:web:a2c429f8ecc866a284500b",
  measurementId: "G-KH2T7DPT0Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);


