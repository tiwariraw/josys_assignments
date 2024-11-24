import { FC } from "react";
import { Todo } from "./TodoList";

interface SingleTodoProps {
  todo: Todo;
}

const SingleTodo: FC<SingleTodoProps> = ({ todo }) => {
  return (
    <>
      <p className="todo-title">{todo?.title}</p>
    </>
  );
};

export default SingleTodo;
