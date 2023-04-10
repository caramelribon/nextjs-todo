import app from "./config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

export default async function signUp(email: string, password: string) {
  try {
    const auth = getAuth(app);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    console.log(error);
  }
}
