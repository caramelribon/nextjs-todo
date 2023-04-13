import { Todo } from "../../types/Todo.types";
export type TodoItemProps = {
  item: Todo;
  onChange: (todo: Todo) => Promise<void>;
  deleteTodo: (todo: Todo) => Promise<void>;
};
