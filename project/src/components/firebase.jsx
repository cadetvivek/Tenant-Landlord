import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyA4Y7pmXnTVUiRt-iH93Nbq5wVpcSMsnwY",
  authDomain: "landlord-tenant-89afd.firebaseapp.com",
  databaseURL: "https://landlord-tenant-89afd-default-rtdb.firebaseio.com",
  projectId: "landlord-tenant-89afd",
  storageBucket: "landlord-tenant-89afd.appspot.com", // Corrected storageBucket
  messagingSenderId: "594864317891",
  appId: "1:594864317891:web:c60c6ab4d2732ad61c8976",
  measurementId: "G-8E7W48LG1T",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app); // Initialize Firebase Storage

export { database, storage };
