import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const EnrollmentForm = ({ students, courses, onSubmit }) => {
  return (
    <Formik
      initialValues={{ studentId: '', courseId: '', grade: '' }}
      validationSchema={Yup.object({
        studentId: Yup.number().required('Required'),
        courseId: Yup.number().required('Required'),
        grade: Yup.string()
          .matches(/^[A-F]$/, 'Invalid grade format')
          .required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      <Form>
        <div>
          <label htmlFor="studentId">Student</label>
          <Field as="select" name="studentId">
            <option value="" label="Select student" />
            {students.map(student => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </Field>
          <ErrorMessage name="studentId" />
        </div>

        <div>
          <label htmlFor="courseId">Course</label>
          <Field as="select" name="courseId">
            <option value="" label="Select course" />
            {courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </Field>
          <ErrorMessage name="courseId" />
        </div>

        <div>
          <label htmlFor="grade">Grade</label>
          <Field name="grade" type="text" />
          <ErrorMessage name="grade" />
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default EnrollmentForm;
