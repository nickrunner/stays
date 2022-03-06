/* eslint-disable @typescript-eslint/no-var-requires */
// Import the functions you need from the SDKs you need
import { App, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { CollectionReference, DocumentData, getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

import { default as config } from "../../config.json";
import { default as devServiceAccountJson } from "../../secrets/stays-dev-firebase-adminsdk.json";
import { default as prodServiceAccountJson } from "../../secrets/stays-prod-firebase-adminsdk.json";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

let serviceAccountJson;
switch (config.env) {
  case "dev":
    serviceAccountJson = devServiceAccountJson;
    break;
  case "prod":
    serviceAccountJson = prodServiceAccountJson;
    break;
  default:
    throw new Error("Invalid config: " + config.env);
}

// Initialize Firebase
const admin = require("firebase-admin");
export const app: App = initializeApp({
  credential: admin.credential.cert(serviceAccountJson),
  storageBucket: "stays-dev.appspot.com"
});
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
// This is just a helper to add the type to the db responses
export const createCollection = <T = DocumentData>(collectionName: string) => {
  return firestore.collection(collectionName) as CollectionReference<T>;
};
