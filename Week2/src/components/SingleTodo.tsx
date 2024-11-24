import { FC } from "react";
import { Todo } from "./TodoList";

const SingleTodo: FC<Todo> = ({ todo }) => {
  return (
    <>
      <p className="todo-title">{todo?.title}</p>
    </>
  );
};

export default SingleTodo;
