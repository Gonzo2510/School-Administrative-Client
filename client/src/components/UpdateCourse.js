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

function UpdateCourse() {

  const { courses, setCourses, errorMessage, setErrorMessage, successMessage, setSuccessMessage, apiURL } = useContext(GlobalContext);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const updateFormSchema = yup.object().shape({
    name: yup.string().required('Name is required').max(25, 'Name must be at most 25 characters').min(3, 'Name must be at least 3 characters'),
    description: yup.string().min(2, 'Description length too short').max(120, 'Description length exceeded.').required('Description is required')
  });

  const formikCreate = useFormik({
    initialValues: {
      name: '',
      description: ''
    },
    validationSchema: updateFormSchema,
    onSubmit: (formData, { resetForm }) => {
      fetch(`${apiURL}/courses`, {
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
          setCourses([...courses, signup])
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
      description: ''
    },
    validationSchema: updateFormSchema,
    onSubmit: (formData, { resetForm }) => {
      fetch(`${apiURL}/course/${selectedCourse.id}`, {
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
          setSelectedCourse(null);
          setSuccessMessage(`${update.name} has been updated!`);
          setErrorMessage('');
          setCourses(courses.map(course => course.id === update.id ? update : course));
          setOpenSnackbar(true);
        })
        .catch((error) => {
          console.log('Error submitting form:', error);
          setSuccessMessage('');
          setErrorMessage(error.message);
        });
    }
  });

  const handleCourseChange = (e) => {
    const selectedId = e.target.value;
    const course = courses.find(s => s.id === parseInt(selectedId));
    setSelectedCourse(course);
    formikUpdate.setValues({
      name: course ? course.name : '',
      description: course ? course.description : ''
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
        Create New Course
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
        id="description"
        name="description"
        label="Description"
        variant="outlined"
        fullWidth
        value={formikCreate.values.description}
        onChange={formikCreate.handleChange}
        error={formikCreate.touched.description && Boolean(formikCreate.errors.description)}
        helperText={formikCreate.touched.description && formikCreate.errors.description}
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
      <div id='update_course'>
        <Typography variant="h5" gutterBottom>
          Update Existing Course
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            formikUpdate.handleSubmit();
          }}
        >
          <FormControl fullWidth margin="normal">
            <InputLabel id="course-label">Course</InputLabel>
            <Select
              labelId="course-label"
              id="course"
              label="course"
              value={selectedCourse ? selectedCourse.id : ''}
              onChange={handleCourseChange}
            >
              <MenuItem value="" disabled>Select course</MenuItem>
              {courses.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.name}
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
            id="description"
            name='description'
            label="New Description"
            variant="outlined"
            fullWidth
            value={formikUpdate.values.description}
            onChange={formikUpdate.handleChange}
            onBlur={formikUpdate.handleBlur}
            error={formikUpdate.touched.description && Boolean(formikUpdate.errors.description)}
            helperText={formikUpdate.touched.description && formikUpdate.errors.description}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Update Course
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

export default UpdateCourse;
