import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import Body from "./components/Body.tsx";
import Users from "./components/Users";
import SingleUser from "./components/SingleUser.tsx";
import Employee from "./components/Employee.tsx";
import TodoList from "./components/TodoList.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Body />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "users/:id",
        element: <SingleUser />,
      },
      {
        path: "employee",
        element: <Employee />,
      },
      {
        path: "todos",
        element: <TodoList />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
