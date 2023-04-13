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
    const userDoc = await getDoc(docRef);
    if (!userDoc.exists()) {
      throw new Error("User not found");
    }
    const { name } = userDoc.data();
    if (name === undefined) {
      throw new Error("Invalid data");
    }
    if (typeof name !== "string") {
      throw new Error("Invalid data");
    }
    return { name: name };
  } catch (error) {
    return null;
  }
}

async function signOut() {
  try {
    await auth.signOut();
  } catch (error) {
    throw error;
  }
}

export default { signUp, signIn, setUser, getUser, signOut };
