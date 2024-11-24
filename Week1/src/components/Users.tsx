import { FC, useState, useEffect } from "react";
import axios from "axios";

type User = {
  id: number;
  firstName: string;
};

const Users: FC = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetcUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://dummyjson.com/users");
      setLoading(false);
      setUsers(res.data.users);
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
    <div className="users">
      <h1 className="title">List of users</h1>
      {loading ? (
        <h3>Loading...</h3>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        users?.map((user) => <h3 key={user?.id}>{user?.firstName}</h3>)
      )}
    </div>
  );
};

export default Users;
