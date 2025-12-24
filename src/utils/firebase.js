// src/utils/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Determine if we're in production based on hostname
const isProduction = window.location.hostname !== 'localhost' &&
                     window.location.hostname !== '127.0.0.1' &&
                     !window.location.hostname.includes('192.168');

// Firebase configuration
// Note: Firebase API keys are meant to be public and are secured through Firebase Security Rules
// See: https://firebase.google.com/docs/projects/api-keys
const firebaseConfig = isProduction ?
    // Production configuration (used when deployed to your domain)
    {
        apiKey: "AIzaSyBg7ATlx_7KStIB0eP8JBTr9ZRo2DXRRJ4",
        authDomain: "scouts-app-d6a34.firebaseapp.com",
        projectId: "scouts-app-d6a34",
        storageBucket: "scouts-app-d6a34.firebasestorage.app",
        messagingSenderId: "953318099513",
        appId: "1:953318099513:web:8d85a1124714070a14dbe8",
        measurementId: "G-2KMCY3VCB1"
    } :
    // Development configuration (uses environment variables for local development)
    {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
    };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
