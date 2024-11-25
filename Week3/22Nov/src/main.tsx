import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import Body from "./components/Body.tsx";
import SingleUser from "./components/SingleUser.tsx";
import About from "./components/About.tsx";
import Contact from "./components/Contact.tsx";
import FallbackUI from "./components/FallbackUI.tsx";

// lazy loading
const Users = lazy(() => import("./components/Users"));

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
        element: (
          <Suspense fallback={<FallbackUI />}>
            <Users />
          </Suspense>
        ),
      },
      {
        path: "users/:id",
        element: <SingleUser />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
