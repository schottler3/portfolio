import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
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


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export const addMail = async (name: string, email: string, message: string) => {
    try {
        await addDoc(collection(db, "mail"), {
            to: "Lucas@LucasSchottler.dev",
            message: {
                subject: `Form From ${name} at ${email}`,
                text: message
            }
        });
        console.log("Email sent to Server");

        await addDoc(collection(db, "mail"), {
            to: email,
            message: {
                subject: "Email Received by Lucas Schottler",
                text: `Message: \n${message}`
            }
        });
        console.log("Email sent to client");
        return true;
    } catch (e: any) {
        console.error("Error adding document: ", e);
        return false;
    }
}

export { db };