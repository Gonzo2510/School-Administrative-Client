import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

function Register() {
  const formSchema = yup.object().shape({
    name: yup.string().required("Name is required").max(25, 'Name must be at most 25 characters').min(3, 'Name must be at least 3 characters'),
    email: yup.string().email('Invalid email format').required("Email is required")
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  
  const formik = useFormik({
    initialValues: {
      name: '',
      email: ''
    },
    validationSchema: formSchema,
    onSubmit: (formData, { resetForm }) => {
      fetch("http://127.0.0.1:5555/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
      })
      .catch((error) => {
        console.log('Error submitting form:', error);
        setSuccessMessage('')
        setErrorMessage(error.message);
      });
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>Create New Student</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <div>
        <label>Name </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <p style={{ color: "red" }}>{formik.errors.name}</p>
      </div>
      <div>
        <label>Email </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <p style={{ color: "red" }}>{formik.errors.email}</p>
      </div>
      <button type="submit">Register</button>
      <p style={{ color: "green" }}>{successMessage}</p>
    </form>
  );
}

export default Register;
