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
    console.log(todosQuerySnapshot.docs);
    const todos = todosQuerySnapshot.docs.map((doc) => {
      const docData = doc.data();
      return { id: doc.id, ...docData, date: docData.date.toDate() } as Todo;
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
    const todoData = todoDoc.data();
    await setDoc(todoRef, { ...todoData, isDone: !todoData.isDone });
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
