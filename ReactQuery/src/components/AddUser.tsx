import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { addUser, UserType } from "../api/user.service";
import "../styles/User.css";

const AddUser = () => {
  const [formdata, setFormData] = useState<UserType>({
    id: "",
    firstName: "",
    email: "",
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      // Invalidate and refetch the "users" query
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleSubmit = () => {
    if (formdata.firstName === "" || formdata.email === "") {
      return;
    }
    mutation.mutate(formdata);
  };

  return (
    <div className="add-user-container">
      <h3>Add a user</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="id"
          value={formdata.id}
          onChange={(e) =>
            setFormData((prev: UserType) => {
              return { ...prev, id: e.target.value };
            })
          }
        />
        <input
          type="text"
          placeholder="name"
          value={formdata.firstName}
          onChange={(e) =>
            setFormData((prev: UserType) => {
              return { ...prev, firstName: e.target.value };
            })
          }
        />
        <input
          type="text"
          value={formdata.email}
          placeholder="email"
          onChange={(e) =>
            setFormData((prev: UserType) => {
              return { ...prev, email: e.target.value };
            })
          }
        />
        <button type="submit" disabled={mutation.isPending}>
          Add
        </button>
      </form>

      {mutation.isPending && <p>Adding user...</p>}
      {mutation.error && <p>Error: {mutation.error.message}</p>}
    </div>
  );
};

export default AddUser;
