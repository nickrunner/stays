// Import the functions you need from the SDKs you need
import { App, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, CollectionReference, DocumentData } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import {default as serviceAccountJson} from "../../stays-dev-firebase-adminsdk-uwz4z-a24f839c4d.json";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Initialize Firebase
const admin = require('firebase-admin');
export const app: App = initializeApp({
    credential: admin.credential.cert(serviceAccountJson),
    storageBucket: "stays-dev.appspot.com"
});
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
// This is just a helper to add the type to the db responses
export const createCollection = <T = DocumentData>(collectionName: string) => {
    return firestore.collection(collectionName) as CollectionReference<T>
  }
