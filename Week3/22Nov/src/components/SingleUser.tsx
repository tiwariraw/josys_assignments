import { FC, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserType } from "./Users";
import "../styles/User.css";

const Users: FC = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserType>({
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
  });
  const [error, setError] = useState<string | null>(null);

  const fetcUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://reqres.in/api/users/${id}`);
      setLoading(false);
      setUser(res.data.data);
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
    fetcUser();
  }, []);

  return (
    <>
      {loading ? (
        <h3>Loading...</h3>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <div className="user-card single-user-card" key={user.id}>
          <img src={user.avatar} alt="avatar" />
          <p>First Name: {user.first_name}</p>
          <p>Last Name: {user.last_name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </>
  );
};

export default Users;
