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
    "AIzaSyAEZle8cXfvZqNB84EHiCO-pxhoFT2ZXDM",

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

  measurementId:
    "G-HRTQGBFBCC",

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