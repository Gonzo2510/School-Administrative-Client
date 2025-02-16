import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { GlobalContext } from '../context';
import { TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const EnrollmentForm = () => {
  const { students, courses, errorMessage, setErrorMessage, successMessage, setSuccessMessage, fetchCourses, apiURL } = useContext(GlobalContext);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

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
        const selectedCourse = courses.find((course) => course.id === parseInt(formData.course));

        if (!selectedStudent || !selectedCourse) {
          throw new Error('Invalid student or course selection');
        }

        const postData = {
          student_id: selectedStudent.id,
          course_id: selectedCourse.id,
          grade: formData.grade,
        };

        const response = await fetch(`${apiURL}/enrollments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postData),
      });

        const data = await response.json();

        if (!response.ok) {
            const errorMessageFromBackend = data.error || data.message;
            throw new Error(errorMessageFromBackend || 'Failed to submit form.');
        }

        resetForm();
        setSelectedStudent(null);
        setSelectedCourse(null);
        setErrorMessage('');
        setSuccessMessage(`Submitted ${postData.grade} for ${selectedStudent.name} in ${selectedCourse.name}.`);
        setOpenSnackbar(true);
        fetchCourses()

      } catch (error) {
        console.error('Error submitting form:', error);
        setSuccessMessage('');
        setErrorMessage(error.message || 'Error creating enrollment.');
      }
    },
  });

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleStudentChange = (e) => {
    const selectedId = e.target.value;
    const student = students.find(s => s.id === parseInt(selectedId));
    setSelectedStudent(student);
    formik.setFieldValue('student', selectedId);
  };

  const handleCourseChange = (e) => {
    const selectedId = e.target.value;
    const course = courses.find(c => c.id === parseInt(selectedId));
    setSelectedCourse(course);
    formik.setFieldValue('course', selectedId);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Set Student Current Grade
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="student-label">Student</InputLabel>
          <Select
            labelId="student-label"
            id="student"
            label="student"
            value={formik.values.student}
            onChange={handleStudentChange}
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
            label="course"
            value={formik.values.course}
            onChange={handleCourseChange}
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
