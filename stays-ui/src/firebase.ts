// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {default as firebaseConfig} from "./secrets/stays_dev_creds.json";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


