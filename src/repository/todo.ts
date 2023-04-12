import app from "../firebase/config";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  addDoc,
  getDocs,
  deleteDoc,
  collection,
  query,
} from "firebase/firestore";
import { Todo } from "../../app/types/Todo.types";

const db = getFirestore(app);

async function setTodo(userId: string, todo: Omit<Todo, "id">) {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      throw new Error("User not found");
    }

    const todosCollectionRef = collection(userDocRef, "todos");
    const todosQuerySnapshot = await getDocs(todosCollectionRef);
    if (todosQuerySnapshot.empty) {
      await setDoc(todosCollectionRef.doc(), { created: true });
    }

    const newTodoDocRef = await addDoc(todosCollectionRef, todo);
    return {
      id: newTodoDocRef.id,
      ...todo,
    };
  } catch (error) {
    console.log(error);
  }
}

async function getTodos(userId: string): Promise<Todo[]> {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      throw new Error("User not found");
    }
    const todosCollectionRef = collection(userDocRef, "todos");
    const todosQuerySnapshot = await getDocs(query(todosCollectionRef));
    const todos = todosQuerySnapshot.docs.map((doc) => {
      const docData = doc.data();
      return { id: doc.id, ...docData } as Todo;
    });
    return todos;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

async function completeTodo(userId: string, todoId: string) {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      throw new Error("User not found");
    }
    const todosCollectionDocRef = doc(userDocRef, "todos", todoId);
    await setDoc(todosCollectionDocRef, { isDone: true });
  } catch (error) {
    console.log(error);
  }
}

async function deleteTodo(userId: string, todoId: string) {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      throw new Error("User not found");
    }
    const todosCollectionDocRef = doc(userDocRef, "todos", todoId);
    await deleteDoc(todosCollectionDocRef);
  } catch (error) {
    console.log(error);
  }
}

export default { setTodo, getTodos, completeTodo, deleteTodo };
