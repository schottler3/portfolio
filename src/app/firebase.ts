// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdHGttrdO2w6mwZoi7T4G6Xki-BBAWf5k",
  authDomain: "schottler3.firebaseapp.com",
  projectId: "schottler3",
  storageBucket: "schottler3.firebasestorage.app",
  messagingSenderId: "467935353527",
  appId: "1:467935353527:web:8959177620ba096c55cb32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Storage
export const storage = getStorage(app);