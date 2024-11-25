import { FC, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  TableRow,
  TableCell,
  Modal,
  Box,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { deleteEmployee, editEmployee } from "../api/employee.service";
import { EmpType } from "../api/employee.service";
import "../styles/Employee.css";

type EmployeeProps = {
  emp: EmpType;
};

const EmployeeRow: FC<EmployeeProps> = ({ emp }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState<EmpType>({
    name: emp.name,
    email: emp.email,
  });

  const queryClient = useQueryClient();

  const mutationDelete = useMutation({
    mutationFn: (id: string) => deleteEmployee(id),
    onSuccess: () => {
      // Invalidate and refetch the "employees" query
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: ({ id, data }: { id: string; data: EmpType }) =>
      editEmployee(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleUpdate = (emp: EmpType) => {
    mutationUpdate.mutate({ id: emp._id, data: formData });
    setIsEdit(false);
  };

  const handleDelete = (emp: EmpType) => {
    mutationDelete.mutate(emp._id);
  };

  return (
    <>
      <TableRow>
        <TableCell align="center">{emp.name}</TableCell>
        <TableCell align="center">{emp.email}</TableCell>
        <TableCell align="center">
          <button className="btn edit-btn" onClick={() => handleEdit()}>
            Edit
          </button>
          <button className="btn delete-btn" onClick={() => handleDelete(emp)}>
            Delete
          </button>
        </TableCell>
      </TableRow>

      {isEdit && (
        <Modal open={isEdit} onClose={() => setIsEdit(false)}>
          <Box position="absolute" top="25%" left="42%" className="modal">
            <Typography sx={{ marginBottom: "1rem", fontWeight: "bold" }}>
              Edit the employee details
            </Typography>

            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              sx={{ marginBlock: "1rem" }}
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => {
                  return { ...prev, name: e.target.value };
                })
              }
            />

            <TextField
              id="standard-basic"
              label="Designation"
              variant="standard"
              sx={{ marginBottom: "2rem" }}
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => {
                  return { ...prev, email: e.target.value };
                })
              }
            />

            <Box sx={{ textAlign: "right" }}>
              <Button
                variant="text"
                onClick={() => setIsEdit(false)}
                sx={{ marginRight: "0.5em" }}
              >
                Cancel
              </Button>

              <Button variant="contained" onClick={() => handleUpdate(emp)}>
                Update
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default EmployeeRow;
