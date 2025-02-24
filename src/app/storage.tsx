import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { get } from "http";
import { getURL } from "next/dist/shared/lib/utils";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  storageBucket: 'schottler3.firebasestorage.app'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

// Create a storage reference from our storage service
const storageRef = ref(storage);

async function getImageUrl(imagePath: string) {
    // Create a reference to the specific image
    const imageRef = ref(storage, imagePath);
    
    try {
      // Get the download URL
      const url = await getDownloadURL(imageRef);
      return url;
    } catch (error) {
      console.error("Error getting download URL: ", error);
      throw error;
    }
}

export default { getImageUrl };