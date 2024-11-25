import axios from "axios";

const BASE_URL = `http://localhost:3001/customers`;
// const BASE_URL: string | undefined = process.env.REACT_APP_API_URL;

export interface Customer {
  CustomerId: number;
  Name: string;
  City: string;
  ContactNumber: string;
  Year: number;
  Photo: string;
  TotalPurchasesPerYear: number;
}

const getAllCustomers = async (): Promise<Customer[]> => {
  //   const response = await axios.get<Customer[]>(`${BASE_URL}?_sort=CustomerId`);
  const response = await axios.get<Customer[]>(`${BASE_URL}`);
  return response.data;
};

const getCustomerById = async (id: number): Promise<Customer> => {
  const response = await axios.get<Customer>(`${BASE_URL}/${id}`);
  return response.data;
};

const createCustomer = async (customerObj: Customer): Promise<Customer> => {
  const response = await axios.post<Customer>(`${BASE_URL}`, customerObj);
  return response.data;
};

const updateCustomer = async (customerObj: Customer): Promise<Customer> => {
  const response = await axios.put<Customer>(
    `${BASE_URL}/${customerObj.CustomerId}`,
    customerObj
  );
  return response.data;
};

const deleteCustomer = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};

export const customerService = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
