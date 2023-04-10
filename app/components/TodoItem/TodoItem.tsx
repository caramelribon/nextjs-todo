import styles from "./TodoItem.module.scss";
import { TodoItemProps } from "./TodoItem.types";
import { CheckBox } from "../elements";

const TodoItem = (props: TodoItemProps) => {
  const { item, ...rest } = props;

  return <div className={styles.todoItem} {...rest}></div>;
};

export default TodoItem;
