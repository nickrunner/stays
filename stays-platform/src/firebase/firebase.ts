// Import the functions you need from the SDKs you need
import { App, applicationDefault, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, CollectionReference, DocumentData } from "firebase-admin/firestore";
import {default as serviceAccountJson} from "../../stays-platform-firebase-adminsdk-lqrl0-e56f5dcabc.json";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Initialize Firebase
const admin = require('firebase-admin');
export const app: App = initializeApp({
    credential: admin.credential.cert(serviceAccountJson)
});
export const firestore = getFirestore(app);
export const auth = getAuth(app);
// This is just a helper to add the type to the db responses
export const createCollection = <T = DocumentData>(collectionName: string) => {
    return firestore.collection(collectionName) as CollectionReference<T>
  }
