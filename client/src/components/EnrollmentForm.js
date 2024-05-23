import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';


const EnrollmentForm = () => {

  return (
    <div>
      <h1>Enrollment Form</h1>
      <Formik
        initialValues={{ student: '', course: '', grade: '' }}
        validationSchema={yup.object({
          student: yup.number().required('Required').integer().positive().min(0),
          course: yup.number().required('Required').integer().positive().min(0),
          grade: yup.number().required('Required').integer().positive().min(0).max(100)
        })}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="student">Student ID</label>
              <Field name="student" type="number" />
              <ErrorMessage name="student" component="div" />
            </div>

            <div>
              <label htmlFor="course">Course ID</label>
              <Field name="course" type="number" />
              <ErrorMessage name="course" component="div" />
            </div>

            <div>
              <label htmlFor="grade">Grade</label>
              <Field name="grade" type="number" />
              <ErrorMessage name="grade" component="div" />
            </div>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EnrollmentForm;
