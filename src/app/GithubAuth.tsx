import { getAuth, signInWithPopup, GithubAuthProvider, signOut } from "firebase/auth";

const auth = getAuth();
const provider = new GithubAuthProvider();
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(result);
    if (credential) {
      const token = credential.accessToken;
      console.log("GitHub Access Token:", token);
    }

    // The signed-in user info.
    const user = result.user;
    console.log("Signed-in user info:", user);
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error: any) => {
    // Handle Errors here.
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    // The email of the user's account used.
    const email = error.customData.email;
    console.error("User email:", email);
    // The AuthCredential type that was used.
    const credential = GithubAuthProvider.credentialFromError(error);
    console.error("Auth credential:", credential);
    // ...
  });

signOut(auth).then(() => {
    // Sign-out successful.
  }).catch(() => {
    console.error("An error happened upon sign out of github auth.");
  });