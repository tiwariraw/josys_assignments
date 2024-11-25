import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import UserCard from "./UserCard";
import { UserType, fetchUsers } from "../api/user.service";
import AddUser from "./AddUser";
import "../styles/User.css";

const Users: FC = () => {
  const { data, error, isLoading } = useQuery<UserType[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return (
    <div>
      <h1 className="title">List of users</h1>
      <AddUser />

      <div className="users">
        {isLoading ? (
          <ClipLoader
            color={"#8b5cf6"}
            loading={isLoading}
            size={150}
            aria-label="Loading Spinner"
          />
        ) : error ? (
          <h3>{error.message}</h3>
        ) : (
          data?.map((user) => <UserCard user={user} />)
        )}
      </div>
    </div>
  );
};

export default Users;
