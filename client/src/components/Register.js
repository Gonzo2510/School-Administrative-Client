import React, { useState, useContext } from 'react';
// import { useFormik } from 'formik';
// import * as yup from 'yup';
import { TextField, Button, Typography, Snackbar } from '@mui/material';
// import MuiAlert from '@mui/material/Alert';
import UpdateStudent from './UpdateStudent';
import UpdateCourse from './UpdateCourse';
import UpdateInstructor from './UpdateInstructor';
// import { GlobalContext } from '../context';


function Register() {

  const [activeComponent, setActiveComponent] = useState('student')  

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
  };

  return (
    <>
    <div style={styles.container}>
      <Button variant="outlined" color="primary" onClick={() => handleButtonClick('student')}>Student</Button>
      <Button variant="outlined" color="primary" onClick={() => handleButtonClick('course')}>Course</Button>
      <Button variant="outlined" color="primary" onClick={() => handleButtonClick('instructor')}>Instructor</Button>
    </div>
      <br />
      {activeComponent === 'student' && <UpdateStudent />}
      {activeComponent === 'course' && <UpdateCourse />}
      {activeComponent === 'instructor' && <UpdateInstructor />}
    </>
  );
}

export default Register;
