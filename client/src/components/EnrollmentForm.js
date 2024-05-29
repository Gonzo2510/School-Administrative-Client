import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';


const EnrollmentForm = () => {

  const formSchema = yup.object().shape({
    student: yup.number().integer().positive().required(),
    course: yup.number().integer().positive().required(),
    grade: yup.number().integer().required().max(100).min(0)
  })

  const formik = useFormik({
    initialValues: {
      student: '',
      course: '',
      grade: '',
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      console.log(values)
    }
  })

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label>Student </label>
        <input
          id="student"
          name="student"
          onChange={formik.handleChange}
          value={formik.values.student}
          placeholder='Enter the student id'
          />
        <br/>
        <label>Course </label>
        <input
          id="course"
          name="course"
          onChange={formik.handleChange}
          value={formik.values.course}
          placeholder='Enter the course id'
          />

        <br/>
        <label>Grade </label>
        <input
          id="grade"
          name="grade"
          onChange={formik.handleChange}
          value={formik.values.grade}
          placeholder='Enter the grade id'
          />
        
        <button type="submit">Submit</button>
      </form>
    </div>
    )
}


export default EnrollmentForm;