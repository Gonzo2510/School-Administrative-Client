import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { GlobalContext } from '../context';

function UpdateStudent() {

  const { students, setStudents, errorMessage, setErrorMessage, successMessage, setSuccessMessage, apiURL } = useContext(GlobalContext);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const updateFormSchema = yup.object().shape({
    name: yup.string().required('Name is required').max(25, 'Name must be at most 25 characters').min(3, 'Name must be at least 3 characters'),
    email: yup.string().email('Invalid email format').required('Email is required')
  });

  const formikCreate = useFormik({
    initialValues: {
      name: '',
      email: ''
    },
    validationSchema: updateFormSchema,
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

  const formikUpdate = useFormik({
    initialValues: {
      name: '',
      email: ''
    },
    validationSchema: updateFormSchema,
    onSubmit: (formData, { resetForm }) => {
      fetch(`${apiURL}/student/${selectedStudent.id}`, {
        method: 'PATCH',
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
        .then((update) => {
          resetForm();
          setSelectedStudent(null);
          setSuccessMessage(`${update.name} has been updated!`);
          setErrorMessage('');
          setStudents(students.map(student => student.id === update.id ? update : student));
          setOpenSnackbar(true);
        })
        .catch((error) => {
          console.log('Error submitting form:', error);
          setSuccessMessage('');
          setErrorMessage(error.message);
        });
    }
  });

  const handleStudentChange = (e) => {
    const selectedId = e.target.value;
    const student = students.find(s => s.id === parseInt(selectedId));
    setSelectedStudent(student);
    formikUpdate.setValues({
      name: student ? student.name : '',
      email: student ? student.email : ''
    });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };


  return (
    <>
      <form onSubmit={formikCreate.handleSubmit}>
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
        value={formikCreate.values.name}
        onChange={formikCreate.handleChange}
        error={formikCreate.touched.name && Boolean(formikCreate.errors.name)}
        helperText={formikCreate.touched.name && formikCreate.errors.name}
        margin="normal"
      />
      <TextField
        id="email"
        name="email"
        label="Email"
        variant="outlined"
        fullWidth
        value={formikCreate.values.email}
        onChange={formikCreate.handleChange}
        error={formikCreate.touched.email && Boolean(formikCreate.errors.email)}
        helperText={formikCreate.touched.email && formikCreate.errors.email}
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
      <div id='update_student'>
        <Typography variant="h5" gutterBottom>
          Update Existing Student
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formikUpdate.handleSubmit();
          }}
        >
          <FormControl fullWidth margin="normal">
            <InputLabel id="student-label">Student</InputLabel>
            <Select
              labelId="student-label"
              id="student"
              label="student"
              value={selectedStudent ? selectedStudent.id : ''}
              onChange={handleStudentChange}
            >
              <MenuItem value="" disabled>Select student</MenuItem>
              {students.map((student) => (
                <MenuItem key={student.id} value={student.id}>
                  {student.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="name"
            name='name'
            label="New Name"
            variant="outlined"
            fullWidth
            value={formikUpdate.values.name}
            onChange={formikUpdate.handleChange}
            onBlur={formikUpdate.handleBlur}
            error={formikUpdate.touched.name && Boolean(formikUpdate.errors.name)}
            helperText={formikUpdate.touched.name && formikUpdate.errors.name}
            margin="normal"
          />
          <TextField
            id="email"
            name='email'
            label="New Email"
            variant="outlined"
            fullWidth
            value={formikUpdate.values.email}
            onChange={formikUpdate.handleChange}
            onBlur={formikUpdate.handleBlur}
            error={formikUpdate.touched.email && Boolean(formikUpdate.errors.email)}
            helperText={formikUpdate.touched.email && formikUpdate.errors.email}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Update Student
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
        {errorMessage && (
          <Typography variant="body2" color="error" gutterBottom>
            {errorMessage}
          </Typography>
        )}
      </div>
    </>

  );
}

export default UpdateStudent;
