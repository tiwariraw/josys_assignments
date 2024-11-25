import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Grid2,
} from "@mui/material";

type FormData = {
  ownerName: string;
  contactNumber: string;
  vehicleModel: string;
  registrationNumber: string;
  vehicleColor: string;
};

const VehicleRegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form Submitted Successfully:", data);
    reset();
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Typography variant="h5" gutterBottom>
          Vehicle Registration Form
        </Typography>

        <TextField
          fullWidth
          label="Owner Name"
          variant="outlined"
          margin="normal"
          {...register("ownerName", { required: "Owner Name is required" })}
          error={!!errors.ownerName}
          helperText={errors.ownerName?.message}
        />

        <TextField
          fullWidth
          label="Contact Number"
          variant="outlined"
          margin="normal"
          {...register("contactNumber", {
            required: "Contact Number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Contact Number must be a 10 digit number",
            },
          })}
          error={!!errors.contactNumber}
          helperText={errors.contactNumber?.message}
        />

        <TextField
          fullWidth
          label="Vehicle Model"
          variant="outlined"
          margin="normal"
          {...register("vehicleModel", {
            required: "Vehicle Model is required",
          })}
          error={!!errors.vehicleModel}
          helperText={errors.vehicleModel?.message}
        />

        <TextField
          fullWidth
          label="Registration Number"
          variant="outlined"
          margin="normal"
          {...register("registrationNumber", {
            required: "Registration Number is required",
            pattern: {
              value: /^TS[0-9]{2}[A-Z]{2}[0-9]{4}$/,
              message: "Registration Number must follow TS09EA1234 format",
            },
          })}
          error={!!errors.registrationNumber}
          helperText={errors.registrationNumber?.message}
        />

        <TextField
          fullWidth
          label="Vehicle Color"
          variant="outlined"
          margin="normal"
          {...register("vehicleColor", {
            required: "Vehicle Color is required",
          })}
          error={!!errors.vehicleColor}
          helperText={errors.vehicleColor?.message}
        />

        <Grid2 container justifyContent="center" mt={2}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid2>
      </Box>
    </Container>
  );
};

export default VehicleRegistrationForm;
