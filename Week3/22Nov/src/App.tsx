import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import "./index.css";

const App: FC = () => {
  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
