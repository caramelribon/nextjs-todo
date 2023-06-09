"use client";
import {
  Main,
  Title,
  RadioButton,
  TodoItem,
  Form,
  Button,
  ColumTitle,
} from "./components";
import { useAuthContext } from "../src/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import todoFunc from "../src/repository/todo";
import userFunc from "../src/repository/user";
import { Todo } from "./types/Todo.types";

const radioLabels = [
  { value: "all", label: "すべて" },
  { value: "incomplete", label: "未完了" },
  { value: "complete", label: "完了" },
];

const Home = () => {
  // userの状態管理
  const { user } = useAuthContext();
  const router = useRouter();

  // todoの状態管理
  const [todos, setTodos] = useState<Todo[] | []>([]);

  // 表示するtodoの状態管理
  const [showTodos, setShowTodos] = useState<Todo[] | []>([]);

  // ラジオボタンの状態管理
  const [selectValue, setSelectValue] = useState<string>("all");

  // 入力フォームの状態管理
  const [inputValue, setInputValue] = useState<string>("");

  // ログインしていない場合はログインページに遷移
  useEffect(() => {
    if (user === null) router.push("/login");
    if (user !== null) {
      const fetchData = async () => {
        const todosData = await todoFunc.getTodos(user.id);
        setTodos(todosData);
        setShowTodos(todosData);
      };
      fetchData();
    }
  }, [user]);

  // ラジオボタンの状態によって表示するtodoを変更
  useEffect(() => {
    const selectTodos = todos.filter((todo) => {
      if (selectValue === "all") return todo;
      if (selectValue === "incomplete") return todo.isDone === false;
      if (selectValue === "complete") return todo.isDone === true;
    });
    setShowTodos(selectTodos);
  }, [selectValue, todos]);

  // ラジオボタンの状態を変更
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectValue(e.target.value);
  };

  // todoの状態を変更
  const handleStateChange = async (id: string) => {
    if (user !== null) {
      await todoFunc.changeTodoState(user.id, id);
      const allTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isDone: !todo.isDone };
        }
        return todo;
      });
      setTodos(allTodos);
    }
  };

  // todoを削除
  const deleteTodo = async (id: string) => {
    if (user !== null) {
      await todoFunc.deleteTodo(user.id, id);
      const allTodos = todos.filter((todo) => todo.id !== id);
      setTodos(allTodos);
    }
  };

  // 入力フォームの状態を変更
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // todoを追加
  const addTodo = async () => {
    if (inputValue === "") {
      return;
    }
    if (user !== null) {
      const newTodo = await todoFunc.setTodo(user.id, {
        date: new Date(),
        note: inputValue,
        isDone: false,
      });
      if (!newTodo) return;
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  // ログアウト
  const signOut = async () => {
    await userFunc.signOut();
    alert("ログアウトしました");
  };

  return (
    <Main>
      <div className={styles.top__wrapper}>
        <Title title="チュートリアルToDoリスト" tag="h1" />
        {user ? (
          <>
            <p className={styles.mt48}>{user.name}さん</p>
            <Title className={styles.mt48} title="ToDoリスト" tag="h2" />
            <div className={styles.radio__wrapper}>
              {radioLabels.map(({ label, value }) => (
                <RadioButton
                  key={value}
                  label={label}
                  value={value}
                  checked={selectValue === value}
                  onChange={handleRadioChange}
                />
              ))}
            </div>
            <div className={styles.mt24}>
              <ColumTitle />
              <div className={styles.mt16}>
                {showTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    item={todo}
                    onChange={(todo: Todo) => handleStateChange(todo.id)}
                    deleteTodo={(todo: Todo) => deleteTodo(todo.id)}
                  />
                ))}
              </div>
            </div>
            <Title className={styles.mt48} title="新しい作業の追加" tag="h2" />
            <div className={styles.form__wrapper}>
              <Form
                label="メモ"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
              />
              <Button
                className={styles.form__button}
                color="blue"
                size="small"
                onClick={addTodo}
              >
                追加
              </Button>
            </div>
            <Button
              className={styles.mt48}
              color="blue"
              size="large"
              onClick={signOut}
            >
              ログアウト
            </Button>
          </>
        ) : (
          <></>
        )}
      </div>
    </Main>
  );
};

export default Home;
