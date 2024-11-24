import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserCard from "./UserCard";
import "../styles/User.css";

export interface UserType {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

const Users: FC = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserType[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetcUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://reqres.in/api/users/");
      setLoading(false);
      setUsers(res.data.data);
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        console.log("An unknown error occured");
      }
    }
  };

  useEffect(() => {
    fetcUsers();
  }, []);

  return (
    <div>
      <h1 className="title">List of users</h1>
      <div className="users">
        {loading ? (
          <h3>Loading...</h3>
        ) : error ? (
          <h3>{error}</h3>
        ) : (
          users?.map((user) => (
            <Link to={`/users/${user.id}`}>
              <UserCard user={user} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Users;
