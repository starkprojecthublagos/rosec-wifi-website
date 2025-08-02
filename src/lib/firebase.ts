// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "rosec-connect",
  "appId": "1:901723644785:web:1d9dac8110d733b7e40cd0",
  "storageBucket": "rosec-connect.firebasestorage.app",
  "apiKey": "AIzaSyBwW6vZlZT5SCxcKFbgCLmgX7E7giO63Uw",
  "authDomain": "rosec-connect.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "901723644785"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
