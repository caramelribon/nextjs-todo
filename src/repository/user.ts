import app from "../firebase/config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { User } from "../../app/types/User.types";

const auth = getAuth(app);
const db = getFirestore(app);

async function signUp(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user.uid;
  } catch (error) {
    throw error;
  }
}

async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user.uid;
  } catch (error) {
    throw error;
  }
}

async function setUser(user: Omit<User, "email" | "password">) {
  try {
    const docRef = doc(db, "users", user.id);
    await setDoc(docRef, { name: user.name });
  } catch (error) {
    console.log(error);
  }
}

async function getUser(id: string) {
  try {
    const docRef = doc(db, "users", id);
    const userData = await getDoc(docRef);
    return userData.data();
  } catch (error) {
    return null;
  }
}

export default { signUp, signIn, setUser, getUser };
