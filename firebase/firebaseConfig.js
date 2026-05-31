import {
  initializeApp,
} from "firebase/app";

import {
  getAuth,
} from "firebase/auth";

import {
  getFirestore,
} from "firebase/firestore";

// FIREBASE CONFIG

const firebaseConfig = {
  apiKey:
    process.env.EXPO_PUBLIC_FIREBASE_API_KEY,

  authDomain:
    "aarthika2-a12ed.firebaseapp.com",

  projectId:
    "aarthika2-a12ed",

  storageBucket:
    "aarthika2-a12ed.firebasestorage.app",

  messagingSenderId:
    "557922423769",

  appId:
    "1:557922423769:web:d97bd1d331823c294d7fc8",
};

// INITIALIZE APP

const app =
  initializeApp(
    firebaseConfig
  );

// AUTH

export const auth =
  getAuth(app);

// FIRESTORE

export const db =
  getFirestore(app);

export default app;