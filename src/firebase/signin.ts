import app from "./config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

export default async function signIn(email: string, password: string) {
  try {
    const auth = getAuth(app);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    console.log(error);
  }
}
