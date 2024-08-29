import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Typography, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import UpdateStudent from './UpdateStudent';
import { GlobalContext } from '../context';


function Register() {

  


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
      <Button variant="outlined" color="primary">Student</Button>
      <Button variant="outlined" color="primary">Course</Button>
      <Button variant="outlined" color="primary">Instructor</Button>
    </div>
      <br />
      <UpdateStudent/>
    </>
  );
}

export default Register;
