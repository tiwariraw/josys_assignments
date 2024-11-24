import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  return (
    <div className="header">
      <img
        src="https://josys.com/wp-content/uploads/2023/12/josys-logo.svg"
        alt="josys-logo"
      />
      <ul className="nav">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/employee">Employee</Link>
        </li>
        <li>
          <Link to="/todos">Todos</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
