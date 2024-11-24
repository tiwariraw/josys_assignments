import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Modal,
  Box,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import styled from "@emotion/styled";
import { data } from "../utils/empdata.js";
import { useState } from "react";

type EmployeeType = {
  id: string;
  name: string;
  designation: string;
};

const DarkTableCell = styled(TableCell)({
  backgroundColor: "#222",
  color: "white",
});

const Employee = () => {
  const [employeeData, setEmployeeData] = useState(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<EmployeeType>({
    id: "",
    name: "",
    designation: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  const openEmployeeFormModal = () => {
    setIsModalOpen(true);
  };
  const closeEmployeeFormModal = () => {
    setIsModalOpen(close);
  };

  const addEmployee = () => {
    const { id, name, designation } = formData;
    setEmployeeData((prev) => [
      ...prev,
      {
        id: id,
        name: name,
        designation: designation,
      },
    ]);
    setFormData({
      id: "",
      name: "",
      designation: "",
    });
    setIsModalOpen(false);
  };

  const handleEdit = (emp: EmployeeType) => {
    setIsEdit(true);
    setIsModalOpen(true);
    setFormData({
      id: emp.id,
      name: emp.name,
      designation: emp.designation,
    });
  };

  const updateEmployee = () => {
    setEmployeeData((prev) =>
      prev.map((emp: EmployeeType) =>
        emp.id === formData.id ? { ...emp, ...formData } : emp
      )
    );
    setIsModalOpen(false);
    setFormData({ id: "", name: "", designation: "" });
    setIsEdit(false);
  };

  const handleDelete = (emp: EmployeeType) => {
    const updatedEmployeeData = employeeData.filter(
      (empData: EmployeeType) => empData.id !== emp.id
    );
    setEmployeeData(updatedEmployeeData);
  };

  return (
    <>
      <div className="emp-header">
        <h1>Employee Details</h1>
        <button className="btn add-emp-btn" onClick={openEmployeeFormModal}>
          Add employee
        </button>
      </div>

      <TableContainer
        component={Paper}
        className="table-container"
        sx={{ width: "80vw" }}
      >
        <Table aria-label="employee table" stickyHeader>
          <TableHead>
            <TableRow>
              <DarkTableCell>Employee Id</DarkTableCell>
              <DarkTableCell>Employee Name</DarkTableCell>
              <DarkTableCell>Designation</DarkTableCell>
              <DarkTableCell>Tasks</DarkTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeData.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No employee exists
                </TableCell>
              </TableRow>
            )}

            {employeeData?.map((emp: EmployeeType) => (
              <TableRow key={emp.id}>
                <TableCell>{emp.id}</TableCell>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.designation}</TableCell>
                <TableCell>
                  <button
                    className="btn edit-btn"
                    onClick={() => handleEdit(emp)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn delete-btn"
                    onClick={() => handleDelete(emp)}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isModalOpen && (
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Box position="absolute" top="25%" left="42%" className="modal">
            <Typography sx={{ marginBottom: "1rem", fontWeight: "bold" }}>
              {isEdit ? "Update the employee" : "Add an employee"}
            </Typography>

            <TextField
              id="standard-basic"
              label="Id"
              variant="standard"
              value={formData.id}
              onChange={(e) =>
                setFormData((prev) => {
                  return { ...prev, id: e.target.value };
                })
              }
            />

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
              value={formData.designation}
              onChange={(e) =>
                setFormData((prev) => {
                  return { ...prev, designation: e.target.value };
                })
              }
            />

            <Box sx={{ textAlign: "right" }}>
              <Button
                variant="text"
                color="grey"
                onClick={closeEmployeeFormModal}
                sx={{ marginRight: "0.5em" }}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                onClick={isEdit ? updateEmployee : addEmployee}
              >
                {isEdit ? "Update" : "Add"}
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default Employee;
