// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { default as config } from "../config.json";
import { default as firebaseDevConfig } from "../secrets/stays_dev_creds.json";
import { default as firebaseProdConfig } from "../secrets/stays_prod_creds.json";
// Initialize Firebase

export let app: FirebaseApp;

switch (config.env) {
  case "dev":
    app = initializeApp(firebaseDevConfig);
    break;
  case "prod":
    app = initializeApp(firebaseProdConfig);
    break;
  default:
    throw new Error("Invalid config: " + config.env);
}

export const auth = getAuth(app);
