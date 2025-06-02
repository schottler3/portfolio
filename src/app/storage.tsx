import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

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