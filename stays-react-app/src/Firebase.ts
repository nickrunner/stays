// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
  appId: "1:705294162386:web:3fbeddb4a0d53c9c84500b",
  measurementId: "G-70KRLSTSXC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);