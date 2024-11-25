import axios from "axios";

export interface EmpType {
  name: string;
  email: string;
}

export const fetchEmployees = async (): Promise<EmpType[]> => {
  const res = await axios.get("http://localhost:3000/api/users");
  return res.data;
};

export const addEmployee = async (emp: EmpType): Promise<EmpType> => {
  const res = await axios.post("http://localhost:3000/api/users", emp);
  return res.data;
};

export const editEmployee = async (
  id: string,
  emp: EmpType
): Promise<EmpType> => {
  const res = await axios.put(`http://localhost:3000/api/users/${id}`, emp);
  return res.data;
};

export const deleteEmployee = async (id: string): Promise<EmpType> => {
  const res = await axios.delete(`http://localhost:3000/api/users/${id}`);
  return res.data;
};
