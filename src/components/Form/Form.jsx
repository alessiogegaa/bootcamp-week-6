import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  MenuItem,
  Alert,
} from "@mui/material";
import "./Form.css";
const Form = () => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      birthday: null,
      email: "",
      mobilePhone: "",
      citizenship: "",
      placeOfBirth: "",
      documentType: "",
      idPersonalNo: "",
      maritalStatus: "",

      fatherName: "",
      fatherPhone: "",
      fatherProfession: "",
      fatherWork: "",
      motherName: "",
      motherPhone: "",
      motherProfession: "",
      motherWork: "",
    },
  });

  const [formAnimation, setFormAnimation] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setFormAnimation("active");
    }, 100);
  }, [currentStep]);

  const onSubmit = (data) => {
    setSubmitted(true);
    console.log(data);
    reset();
    setCurrentStep(1);
  };

  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid) {
      setFormAnimation("slide-right");
      setTimeout(() => {
        setCurrentStep((prevStep) => prevStep + 1);
        setFormAnimation("");
      }, 500);
    } else {
      console.log("There are validation errors.");
    }
  };

  const handleBack = () => {
    setFormAnimation("slide-left");
    setTimeout(() => {
      setCurrentStep((prevStep) => prevStep - 1);
      setFormAnimation("");
    }, 500);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="sm">
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            p: 4,
            bgcolor: "background.paper",
            mt: 5,
          }}
          className={`form-container ${formAnimation}`}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Register
          </Typography>
          {submitted && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Registration successful!
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            {currentStep === 1 && (
              <>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="firstName"
                  {...register("firstName", {
                    required: "Field is required",
                    minLength: {
                      value: 2,
                      message: "Enter a valid name",
                    },
                  })}
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName?.message}
                />
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="lastName"
                  {...register("lastName", {
                    required: "Field is required",
                    minLength: {
                      value: 2,
                      message: "Enter a valid last name",
                    },
                  })}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "Field is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Gender"
                      select
                      fullWidth
                      margin="normal"
                      error={!!errors.gender}
                      helperText={errors.gender?.message}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </TextField>
                  )}
                />
                <Controller
                  name="birthday"
                  control={control}
                  rules={{ required: "Field is required" }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Birthday"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          margin="normal"
                          error={!!errors.birthday}
                          helperText={errors.birthday?.message}
                        />
                      )}
                      sx={{width: '100%'}}
                      onChange={(newValue) => field.onChange(newValue)}
                    />
                  )}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="email"
                  {...register("email", {
                    required: "Field is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />

                <TextField
                  label="Mobile Phone"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="mobilePhone"
                  {...register("mobilePhone", {
                    required: "Field is required",
                    maxLength: {
                      value: 10,
                      message: "Please enter a valid phone number",
                    },
                  })}
                  placeholder="06x xx xx xxx"
                  error={!!errors.mobilePhone}
                  helperText={errors.mobilePhone?.message}
                />
                <TextField
                  label="Citizenship"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="citizenship"
                  {...register("citizenship", {
                    required: "Field is required",
                    maxLength: {
                      value: 10,
                      message: "Please enter a valid citizenship",
                    },
                  })}
                  error={!!errors.citizenship}
                  helperText={errors.citizenship?.message}
                />
                <TextField
                  label="Place of Birth"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="placeOfBirth"
                  {...register("placeOfBirth", {
                    required: "Field is required",
                    maxLength: {
                      value: 10,
                      message: "Please enter a valid place of birth",
                    },
                  })}
                  error={!!errors.placeOfBirth}
                  helperText={errors.placeOfBirth?.message}
                />

                <Controller
                  name="documentType"
                  control={control}
                  rules={{ required: "Field is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Document Type"
                      select
                      fullWidth
                      margin="normal"
                      error={!!errors.documentType}
                      helperText={errors.documentType?.message}
                    >
                      <MenuItem value="ID card">ID card</MenuItem>
                      <MenuItem value="Passport">Passport</MenuItem>
                    </TextField>
                  )}
                />
                <TextField
                  label="ID Personal No."
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="idPersonalNo"
                  {...register("idPersonalNo", {
                    required: "Field is required",
                    maxLength: {
                      value: 10,
                      message: "Please enter a valid personal id",
                    },
                  })}
                  error={!!errors.idPersonalNo}
                  helperText={errors.idPersonalNo?.message}
                />
                <Controller
                  name="maritalStatus"
                  control={control}
                  rules={{
                    required: "Field is required",
                    maxLength: { value: 10, message: "Max length is 10" },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Marital Status"
                      select
                      fullWidth
                      margin="normal"
                      error={!!errors.maritalStatus}
                      helperText={errors.maritalStatus?.message}
                    >
                      <MenuItem value="Single">Single</MenuItem>
                      <MenuItem value="Married">Married</MenuItem>
                      <MenuItem value="Divorced">Divorced</MenuItem>
                      <MenuItem value="Widowed">Widowed</MenuItem>
                    </TextField>
                  )}
                />
              </>
            )}

            {currentStep === 2 && (
              <>
                <TextField
                  label="Father Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="fatherName"
                  {...register("fatherName", {
                    required: "Field is required",
                    maxLength: {
                      value: 10,
                      message: "Please enter a valid father name",
                    },
                  })}
                  error={!!errors.fatherName}
                  helperText={errors.fatherName?.message}
                />
                <TextField
                  label="Father Phone"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="fatherPhone"
                  {...register("fatherPhone", {
                    required: "Field is required",
                    maxLength: {
                      value: 10,
                      message: "Please enter a valid phone number",
                    },
                  })}
                  error={!!errors.fatherPhone}
                  helperText={errors.fatherPhone?.message}
                />
                <TextField
                  label="Father Profession"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="fatherProfession"
                  {...register("fatherProfession", {
                    required: "Field is required",
                    maxLength: {
                      value: 10,
                      message: "Please enter a valid citizenship",
                    },
                  })}
                  error={!!errors.fatherProfession}
                  helperText={errors.fatherProfession?.message}
                />
                <TextField
                  label="Father Work"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="fatherWork"
                  {...register("fatherWork", {
                    required: "Field is required",
                    maxLength: 10,
                  })}
                  error={!!errors.fatherWork}
                  helperText={errors.fatherWork?.message}
                />
                <TextField
                  label="Mother Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="motherName"
                  {...register("motherName", {
                    required: "Field is required",
                    maxLength: {
                      value: 10,
                      message: "Enter a valid name",
                    },
                  })}
                  error={!!errors.motherName}
                  helperText={errors.motherName?.message}
                />
                <TextField
                  label="Mother Phone"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="motherPhone"
                  {...register("motherPhone", {
                    required: "Field is required",
                    maxLength: {
                      value: 10,
                      message: "Enter a valid phone",
                    },
                  })}
                  error={!!errors.motherPhone}
                  helperText={errors.motherPhone?.message}
                />
                <TextField
                  label="Mother Profession"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="motherProfession"
                  {...register("motherProfession", {
                    required: "Field is required",
                    maxLength: {
                      value: 10,
                      message: "Enter a valid information",
                    },
                  })}
                  error={!!errors.motherProfession}
                  helperText={errors.motherProfession?.message}
                />
                <TextField
                  label="Mother Work"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="motherWork"
                  {...register("motherWork", {
                    required: "Field is required",
                    maxLength: {
                      value: 10,
                      message: "Enter a valid info",
                    },
                  })}
                  error={!!errors.motherWork}
                  helperText={errors.motherWork?.message}
                />
              </>
            )}

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              {currentStep > 1 && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleBack()}
                >
                  Back
                </Button>
              )}
              {currentStep < 2 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleNext()}
                >
                  Next
                </Button>
              ) : (
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              )}
            </Box>
          </form>
        </Box>
      </Container>
    </LocalizationProvider>
  );
};

export default Form;