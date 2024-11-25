import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import styled from "@emotion/styled";
import { EmpType, fetchEmployees } from "../api/employee.service";
import "../styles/Employee.css";
import EmployeeRow from "./EmployeeRow";
import EmpOperations from "./EmpOperations";

const DarkTableCell = styled(TableCell)({
  backgroundColor: "#222",
  color: "white",
});

const Users: FC = () => {
  const { data, error, isLoading } = useQuery<EmpType[], Error>({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  return (
    <div>
      <h1 className="title">List of employees</h1>
      <EmpOperations />

      <div className="employees">
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
          <TableContainer
            component={Paper}
            className="table-container"
            sx={{ width: "80vw" }}
          >
            <Table aria-label="employee table" stickyHeader>
              <TableHead>
                <TableRow>
                  <DarkTableCell align="center">Employee Name</DarkTableCell>
                  <DarkTableCell align="center">Employee Email</DarkTableCell>
                  <DarkTableCell align="center">Actions</DarkTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data?.map((emp: EmpType) => (
                  <EmployeeRow emp={emp} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default Users;
