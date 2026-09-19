import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const missingKeys = Object.entries(firebaseConfig)
    .filter(([, value]) => !value)
    .map(([key]) => key);

export const firebaseConfigError = 
    missingKeys.length > 0
        ? `Missing Configuration: ${missingKeys.join(", ")}. Advice: Copy configurations from firebase console to .env then restart "npm run dev".`
        : null;

const app = initializeApp(firebaseConfig);

export const db = firebaseConfigError ? null : getFirestore(app);
export const auth = firebaseConfigError ? null : getAuth(app);
export default app;