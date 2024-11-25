import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addEmployee, EmpType } from "../api/employee.service";
import "../styles/Employee.css";

const AddEmployee = () => {
  const [formdata, setFormData] = useState<EmpType>({
    name: "",
    email: "",
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addEmployee,
    onSuccess: () => {
      // Invalidate and refetch the "users" query
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast("Employee added successfully", { autoClose: 3000 });
    },
  });

  const handleSubmit = () => {
    if (formdata.name === "" || formdata.email === "") {
      return;
    }
    mutation.mutate(formdata);
  };

  return (
    <div className="add-emp-container">
      <h3>Add an employee</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          value={formdata.name}
          onChange={(e) =>
            setFormData((prev: EmpType) => {
              return { ...prev, name: e.target.value };
            })
          }
        />
        <input
          type="text"
          value={formdata.email}
          placeholder="email"
          onChange={(e) =>
            setFormData((prev: EmpType) => {
              return { ...prev, email: e.target.value };
            })
          }
        />
        <button type="submit" disabled={mutation.isPending}>
          Add
        </button>
      </form>

      {mutation.isPending && <p>Adding employee...</p>}
      {mutation.error && <p>Error: {mutation.error.message}</p>}
    </div>
  );
};

export default AddEmployee;
