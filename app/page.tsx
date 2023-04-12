"use client";
import { Main, Title, RadioButton, TodoItem, Form, Button } from "./components";
import { useAuthContext } from "../src/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import todoFunc from "../src/repository/todo";
import { Todo } from "./types/Todo.types";

const radioLabels = [
  { value: "all", label: "すべて" },
  { value: "incomplete", label: "未完了" },
  { value: "complete", label: "完了" },
];

const Home = () => {
  const { user } = useAuthContext();
  console.log(user);
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [showTodos, setShowTodos] = useState<Todo[] | []>([]);

  useEffect(() => {
    if (user === null) router.push("/login");
    if (user !== null) {
      const fetchData = async () => {
        const todosData = await todoFunc.getTodos(user.id);
        setTodos(todosData);
      };
      fetchData();
    }
  }, [user, router]);

  const [selectValue, setSelectValue] = useState<string>("all");
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectValue(e.target.value);
    const selectTodos = todos.filter((todo) => {
      if (e.target.value === "all") return todo;
      if (e.target.value === "incomplete") return todo.isDone === false;
      if (e.target.value === "complete") return todo.isDone === true;
    });
    setShowTodos(selectTodos);
  };

  const [inputValue, setInputValue] = useState<string>("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

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
    }
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
            <div className={styles.list__wrapper}>
              {showTodos.map((todo) => (
                <TodoItem key={todo.id} item={todo} />
              ))}
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
              onClick={addTodo}
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
