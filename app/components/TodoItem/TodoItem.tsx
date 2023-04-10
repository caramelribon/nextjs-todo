import styles from "./TodoItem.module.scss";
import { TodoItemProps } from "./TodoItem.types";
import { CheckBox } from "../elements";
import DateTime from "../../utils/datetime";
import { useState } from "react";
import Trash from "../../assets/icons/trash.svg";

const TodoItem = (props: TodoItemProps) => {
  const { item, ...rest } = props;
  const date = DateTime(item.date);
  const [isChecked, setIsChecked] = useState(item.isDone);

  const handleIsChecked = () => {
    setIsChecked(!isChecked);
  };
  const deleteTodoItem = () => {
    console.log("deleteTodoItem");
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
