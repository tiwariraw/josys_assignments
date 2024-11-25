import axios from "axios";

export interface UserType {
  id: string;
  firstName: string;
  email: string;
}

export const fetchUsers = async (): Promise<UserType[]> => {
  const res = await axios.get("https://dummyjson.com/users");
  return res.data.users;
};

export const addUser = async (user: UserType): Promise<UserType> => {
  const res = await axios.post("https://dummyjson.com/users/add", user);
  return res.data.users;
};
