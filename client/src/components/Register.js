import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Typography, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import UpdateStudent from './UpdateStudent';
import { GlobalContext } from '../context';


function Register() {
  const formSchema = yup.object().shape({
    name: yup.string().required('Name is required').max(25, 'Name must be at most 25 characters').min(3, 'Name must be at least 3 characters'),
    email: yup.string().email('Invalid email format').required('Email is required')
  });

  const { students, setStudents, errorMessage, setErrorMessage, successMessage, setSuccessMessage, apiURL } = useContext(GlobalContext);
  const [openSnackbar, setOpenSnackbar] = useState(false);


  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: ''
    },
    validationSchema: formSchema,
    onSubmit: (formData, { resetForm }) => {
      fetch(`${apiURL}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((r) => {
          if (!r.ok) {
            throw new Error('Network response was not ok');
          }
          return r.json();
        })
        .then((signup) => {
          resetForm();
          setSuccessMessage(`${signup.name} has been registered!`);
          setStudents([...students, signup])
          setOpenSnackbar(true);
        })
        .catch((error) => {
          console.log('Error submitting form:', error);
          setSuccessMessage('');
          setErrorMessage(error.message);
        });
    }
  });

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Full viewport height
      backgroundColor: '#f0f0f0', // Optional: just to visualize the container
    },
  };

  return (
    <>
    <div style={styles.container}>
      <Button variant="outlined" color="primary">Student</Button>
      <Button variant="outlined" color="primary">Course</Button>
      <Button variant="outlined" color="primary">Instructor</Button>
    </div>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h5" gutterBottom>
          Create New Student
        </Typography>
        {errorMessage && (
          <Typography variant="body2" color="error" gutterBottom>
            {errorMessage}
          </Typography>
        )}
        <TextField
          id="name"
          name="name"
          label="Name"
          variant="outlined"
          fullWidth
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          margin="normal"
        />
        <TextField
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          fullWidth
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </MuiAlert>
      </Snackbar>
      <br />
      <UpdateStudent />
    </>
  );
}

export default Register;
