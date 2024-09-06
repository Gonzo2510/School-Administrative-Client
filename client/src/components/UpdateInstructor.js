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

function UpdateInstructor() {

  const { instructors, setInstructors, errorMessage, setErrorMessage, successMessage, setSuccessMessage, apiURL } = useContext(GlobalContext);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const updateFormSchema = yup.object().shape({
    name: yup.string().required('Name is required').max(25, 'Name must be at most 25 characters').min(3, 'Name must be at least 3 characters'),
  });

  const formikCreate = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: updateFormSchema,
    onSubmit: (formData, { resetForm }) => {
      fetch(`${apiURL}/instructors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((r) => {
          if (!r.ok) {
            console.log(r)
            throw new Error('Network response was not ok');
          }
          return r.json();
        })
        .then((signup) => {
          resetForm();
          setSuccessMessage(`${signup.name} has been registered!`);
          setInstructors([...instructors, signup])
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
    },
    validationSchema: updateFormSchema,
    onSubmit: (formData, { resetForm }) => {
      fetch(`${apiURL}/instructor/${selectedInstructor.id}`, {
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
          setSelectedInstructor(null);
          setSuccessMessage(`${update.name} has been updated!`);
          setErrorMessage('');
          setInstructors(instructors.map(instructor => instructor.id === update.id ? update : instructor));
          setOpenSnackbar(true);
        })
        .catch((error) => {
          console.log('Error submitting form:', error);
          setSuccessMessage('');
          setErrorMessage(error.message);
        });
    }
  });

  const handleInstructorChange = (e) => {
    const selectedId = e.target.value;
    const instructor = instructors.find(s => s.id === parseInt(selectedId));
    setSelectedInstructor(instructor);
    formikUpdate.setValues({
      name: instructor ? instructor.name : '',
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
        Create New Instructor
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
      <div id='update_instructor'>
        <Typography variant="h5" gutterBottom>
          Update Existing Instructor
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formikUpdate.handleSubmit();
          }}
        >
          <FormControl fullWidth margin="normal">
            <InputLabel id="instructor-label">Instructor</InputLabel>
            <Select
              labelId="instructor-label"
              id="instructor"
              label="instructor"
              value={selectedInstructor ? selectedInstructor.id : ''}
              onChange={handleInstructorChange}
            >
              <MenuItem value="" disabled>Select instructor</MenuItem>
              {instructors.map((instructor) => (
                <MenuItem key={instructor.id} value={instructor.id}>
                  {instructor.name}
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
          <Button type="submit" variant="contained" color="primary">
            Update Instructor
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

export default UpdateInstructor;
