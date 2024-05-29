import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';


const EnrollmentForm = () => {

  const formSchema = yup.object().shape({
    student: yup.number().positive().required(),
    course: yup.number().positive().required(),
    grade: yup.number().required().max(100).min(0)
  })

  const formik = useFormik({
    initialValues: {
      student: '',
      course: '',
      grade: ''
    },
    validationSchema: formSchema,
    onsubmit: (values) => {
      console.log(values)
    }
  })

  return (
    <div>
      <form onsubmit={formik.handleSubmit}>
        <label>Student</label>
        <input
          id="email"
          value={formik.values.student}
          onChange={formik.handleChange}
          type='number'
          placeholder='Enter the student id'
          />
        

        <button type="submit">
              Submit
            </button>
      </form>
    </div>
    )
}


export default EnrollmentForm;