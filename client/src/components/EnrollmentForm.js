import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';


const EnrollmentForm = () => {

  const formSchema = yup.object().shape({
    student: yup.number().integer().positive().required(),
    course: yup.number().integer().positive().required(),
    grade: yup.number().integer().required().max(100).min(0)
  })

  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      student: '',
      course: '',
      grade: '',
    },
    validationSchema: formSchema,
    onSubmit: (formData, { resetForm }) => {
      try {

        fetch("http://127.0.0.1:5555/enrollments", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
        .then((r) => r.json())
        .then((data) => {
          resetForm()
          setErrorMessage('')
        })
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrorMessage('Error, Student/course combination does not exist.')
      }
    }
  })


  return (
    <div>
      <h2>Set Student Final Grade</h2>
      <form onSubmit={formik.handleSubmit}>
        <label>Student </label>
        <input
          id="student"
          name="student"
          onChange={formik.handleChange}
          value={formik.values.student}
          placeholder='Enter the student id'
          />
        <p style={{color: "red" }}> {formik.errors.student}</p>
        <label>Course </label>
        <input
          id="course"
          name="course"
          onChange={formik.handleChange}
          value={formik.values.course}
          placeholder='Enter the course id'
          />
        <p style={{color: "red" }}> {formik.errors.course}</p>

        <label>Grade </label>
        <input
          id="grade"
          name="grade"
          onChange={formik.handleChange}
          value={formik.values.grade}
          placeholder='Enter the grade id'
          />
        <p style={{color: "red" }}> {formik.errors.grade}</p>
        
        <button type="submit">Submit</button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    </div>
    )
}


export default EnrollmentForm;