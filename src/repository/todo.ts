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
  serverTimestamp,
  Timestamp,
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

    const todosCollectionRef = collection(db, `users/${userId}/todos`);

    const newTodoDocRef = await addDoc(todosCollectionRef, {
      ...todo,
      date: serverTimestamp(),
    });
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
      const { note, date, isDone } = doc.data();
      if (note === undefined || date === undefined || isDone === undefined) {
        throw new Error("Invalid data");
      }
      if (
        typeof note !== "string" ||
        typeof isDone !== "boolean" ||
        !(date instanceof Timestamp)
      ) {
        throw new Error("Invalid data");
      }
      return {
        id: doc.id,
        note: note,
        isDone: isDone,
        date: date.toDate(),
      };
    });
    return todos;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

async function changeTodoState(userId: string, todoId: string) {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      throw new Error("User not found");
    }
    const todoRef = doc(userDocRef, "todos", todoId);
    const todoDoc = await getDoc(todoRef);
    if (!todoDoc.exists()) {
      throw new Error("Todo not found");
    }
    const { note, date, isDone } = todoDoc.data();
    if (note === undefined || date === undefined || isDone === undefined) {
      throw new Error("Invalid data");
    }
    if (
      typeof note !== "string" ||
      typeof isDone !== "boolean" ||
      !(date instanceof Timestamp)
    ) {
      throw new Error("Invalid data");
    }
    await setDoc(todoRef, { ...todoDoc.data(), isDone: !isDone });
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

export default { setTodo, getTodos, changeTodoState, deleteTodo };
