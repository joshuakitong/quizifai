import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log("User Info:", user);
    return user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout Error:", error);
  }
};