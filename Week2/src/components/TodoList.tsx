import { useState } from "react";
import { TextField, Button } from "@mui/material";
import SingleTodo from "./SingleTodo";
import "../styles/TodoList.css";

export interface Todo {
  title: string;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoText, setTodoText] = useState("");

  const addTodo = () => {
    if (todoText !== "") {
      setTodos((prev) => [
        ...prev,
        {
          title: todoText,
        },
      ]);
      setTodoText("");
    }
  };

  const deleteTodo = (todo: Todo) => {
    const updatedTodo = todos.filter((todoEl) => todoEl.title !== todo.title);
    setTodos(updatedTodo);
  };

  return (
    <>
      <h3 className="title">TodoList</h3>
      <div className="todo-list">
        <div className="todo-inp-btn-container">
          <TextField
            id="standard-basic"
            label="Enter a todo"
            variant="standard"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={addTodo}
            sx={{ marginLeft: "2rem" }}
          >
            Add
          </Button>
        </div>
        <div className="todos-container">
          {todos?.map((todo) => (
            <div className="single-todo">
              <SingleTodo todo={todo} />
              <Button
                variant="contained"
                onClick={() => deleteTodo(todo)}
                sx={{ marginRight: "2rem" }}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TodoList;
