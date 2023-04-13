import styles from "./TodoItem.module.scss";
import { TodoItemProps } from "./TodoItem.types";
import { CheckBox } from "../elements";
import DateToString from "../../utils/datetime";
import { useState, useEffect } from "react";
import Trash from "../../assets/icons/trash.svg";

const TodoItem = (props: TodoItemProps) => {
  const { item, onChange, deleteTodo, ...rest } = props;
  const [width, setWidth] = useState(window.innerWidth);
  const [date, setDate] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // クリーンアップ関数
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window]);

  useEffect(() => {
    const dateString =
      width >= 480
        ? DateToString.DateTimeWithYear(item.date)
        : DateToString.DateTime(item.date);
    setDate(dateString);
  }, [width]);

  // チェックボックスの状態管理
  const [isChecked, setIsChecked] = useState(item.isDone);

  // チェックボックスの状態を変更
  const handleIsChecked = () => {
    setIsChecked(!isChecked);
    onChange(item);
  };

  // todoを削除
  const deleteTodoItem = () => {
    deleteTodo(item);
  };

  return (
    <li className={styles.item} {...rest}>
      <CheckBox
        className={styles.item__checkbox}
        isChecked={isChecked}
        onChange={handleIsChecked}
      />
      <p className={styles.item__date}>{date}</p>
      <p className={styles.item__note}>{item.note}</p>
      <button className={styles.item__deleteButton} onClick={deleteTodoItem}>
        <Trash />
      </button>
    </li>
  );
};

export default TodoItem;
