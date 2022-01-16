// Import the functions you need from the SDKs you need
import { App, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, CollectionReference, DocumentData } from "firebase-admin/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Initialize Firebase

const serviceAccount = require("C:/git/stays/stays-platform/stays-platform-firebase-adminsdk-lqrl0-17f55baaf8.json");
const admin = require('firebase-admin');
export const app: App = initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
export const firestore = getFirestore(app);
export const auth = getAuth(app);
// This is just a helper to add the type to the db responses
export const createCollection = <T = DocumentData>(collectionName: string) => {
    return firestore.collection(collectionName) as CollectionReference<T>
  }
