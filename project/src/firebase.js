

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // Realtime Database
import { getStorage } from "firebase/storage"; 
// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIhkIIetkryXPkkJ4j5a2McIyIL6kmxLo",
  authDomain: "chatapp-fe0f0.firebaseapp.com",
  projectId: "chatapp-fe0f0",
  storageBucket: "chatapp-fe0f0.appspot.com", // Fixed this
  messagingSenderId: "377221128961",
  appId: "1:377221128961:web:53688162260e78f4e13100",
  measurementId: "G-8E7W48LG1T",
  databaseURL: "https://chatapp-fe0f0-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestore Database
const auth = getAuth(app); // Firebase Authentication
const rtdb = getDatabase(app); // Realtime Database
// const storage = getStorage(app);
const database = getDatabase(app);

export { db, auth, rtdb,database };


