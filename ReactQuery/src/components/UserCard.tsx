import { FC } from "react";
import { UserType } from "../api/user.service";
import "../styles/User.css";

type UserProps = {
  user: UserType;
};

const UserCard: FC<UserProps> = ({ user }) => {
  return (
    <div className="user-card" key={user.id}>
      <p>Id: {user.id}</p>
      <p>First Name: {user.firstName}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserCard;
