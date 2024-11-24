import { FC } from "react";
import { UserType } from "./Users";
import "../styles/User.css";

type UserProps = {
  user: UserType;
};

const UserCard: FC<UserProps> = ({ user }) => {
  return (
    <div className="user-card" key={user.id}>
      <img src={user.avatar} alt="avatar" />
      <p>First Name: {user.first_name}</p>
      <p>Last Name: {user.last_name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserCard;
