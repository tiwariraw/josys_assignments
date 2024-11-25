import { FC } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import EmployeeList from "./components/EmployeeList";

const App: FC = () => {
  return (
    <div className="App">
      <EmployeeList />
      <ToastContainer />
    </div>
  );
};

export default App;
