import React, { useState, useEffect } from 'react';
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

const EnrollmentForm = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Fetch students and courses
  useEffect(() => {
    fetch('http://127.0.0.1:5555/students')
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error('Error fetching students:', error));

    fetch('http://127.0.0.1:5555/courses')
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error('Error fetching courses:', error));
  }, []);

  const formSchema = yup.object().shape({
    student: yup.string().required('Student is required'),
    course: yup.string().required('Course is required'),
    grade: yup.number().required('Grade is required').max(100, 'Grade must be between 0 and 100').min(0, 'Grade must be between 0 and 100'),
  });

  const formik = useFormik({
    initialValues: {
      student: '',
      course: '',
      grade: '',
    },
    validationSchema: formSchema,
    onSubmit: async (formData, { resetForm }) => {
      try {
        const selectedStudent = students.find((student) => student.id === parseInt(formData.student));
        const selectedCourse = courses.find((course) => course.id === parseInt(formData.course));

        if (!selectedStudent || !selectedCourse) {
          throw new Error('Invalid student or course selection');
        }

        const postData = {
          student_id: selectedStudent.id,
          course_id: selectedCourse.id,
          grade: formData.grade,
        };

        const response = await fetch('http://127.0.0.1:5555/enrollments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        });

        if (!response.ok) {
          throw new Error('Failed to submit form. Please check if the student/course combination exists.');
        }

        const data = await response.json();
        resetForm();
        setErrorMessage('');
        setSuccessMessage(`Submitted ${postData.grade} for ${selectedStudent.name} in ${selectedCourse.name}.`);
        setOpenSnackbar(true);
      } catch (error) {
        console.error('Error submitting form:', error);
        setSuccessMessage('');
        setErrorMessage('Error, Student/course combination does not exist.');
      }
    },
  });

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Set Student Final Grade
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="student-label">Student</InputLabel>
          <Select
            labelId="student-label"
            id="student"
            name="student"
            value={formik.values.student}
            onChange={formik.handleChange}
            error={formik.touched.student && Boolean(formik.errors.student)}
          >
            <MenuItem value="" disabled>Select student</MenuItem>
            {students.map((student) => (
              <MenuItem key={student.id} value={student.id}>
                {student.name}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.student && formik.errors.student && (
            <Typography variant="body2" color="error">
              {formik.errors.student}
            </Typography>
          )}
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="course-label">Course</InputLabel>
          <Select
            labelId="course-label"
            id="course"
            name="course"
            value={formik.values.course}
            onChange={formik.handleChange}
            error={formik.touched.course && Boolean(formik.errors.course)}
          >
            <MenuItem value="" disabled>Select course</MenuItem>
            {courses.map((course) => (
              <MenuItem key={course.id} value={course.id}>
                {course.name}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.course && formik.errors.course && (
            <Typography variant="body2" color="error">
              {formik.errors.course}
            </Typography>
          )}
        </FormControl>
        <TextField
          id="grade"
          name="grade"
          label="Grade"
          type="number"
          fullWidth
          value={formik.values.grade}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.grade && Boolean(formik.errors.grade)}
          helperText={formik.touched.grade && formik.errors.grade}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
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
        <Typography variant="body2" color="error">
          {errorMessage}
        </Typography>
      )}
    </div>
  );
};

export default EnrollmentForm;
