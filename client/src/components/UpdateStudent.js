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
  const { students, setStudents } = useContext(GlobalContext);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const formSchema = yup.object().shape({
    name: yup.string().required('Name is required').max(25, 'Name must be at most 25 characters').min(3, 'Name must be at least 3 characters'),
    email: yup.string().email('Invalid email format').required('Email is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: ''
    },
    validationSchema: formSchema,
    onSubmit: (formData, { resetForm }) => {
      fetch(`http://127.0.0.1:5555/students/${selectedStudent.id}`, {
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
    formik.setValues({
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
    <div id='update_student'>
      <Typography variant="h5" gutterBottom>
        Update Existing Student
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
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
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          margin="normal"
        />
        <TextField
          id="email"
          name='email'
          label="New Email"
          variant="outlined"
          fullWidth
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
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
  );
}

export default UpdateStudent;
