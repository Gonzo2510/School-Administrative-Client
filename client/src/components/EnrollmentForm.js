// import React from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';

// const EnrollmentForm = ({ students = [], courses = [], onSubmit }) => {
//   return (
//     <Formik
//       initialValues={{ studentId: '', courseId: '', grade: '' }}
//       validate={(values) => {
//         const errors = {};
//         if (!values.studentId) {
//           errors.studentId = 'Required';
//         } else if (!Number.isInteger(Number(values.studentId))) {
//           errors.studentId = 'Must be a number';
//         }

//         if (!values.courseId) {
//           errors.courseId = 'Required';
//         } else if (!Number.isInteger(Number(values.courseId))) {
//           errors.courseId = 'Must be a number';
//         }

//         if (!values.grade) {
//           errors.grade = 'Required';
//         } else if (!/^[A-F]$/.test(values.grade)) {
//           errors.grade = 'Invalid grade format';
//         }

//         return errors;
//       }}
//       onSubmit={(values, { setSubmitting }) => {
//         onSubmit(values);
//         setSubmitting(false);
//       }}
//     >
//       {({ isSubmitting }) => (
//         <Form>
//           <div>
//             <label htmlFor="studentId">Student</label>
//             <Field as="select" name="studentId">
//               <option value="" label="Select student" />
//               {students.map((student) => (
//                 <option key={student.id} value={student.id}>
//                   {student.name}
//                 </option>
//               ))}
//             </Field>
//             <ErrorMessage name="studentId" component="div" />
//           </div>

//           <div>
//             <label htmlFor="courseId">Course</label>
//             <Field as="select" name="courseId">
//               <option value="" label="Select course" />
//               {courses.map((course) => (
//                 <option key={course.id} value={course.id}>
//                   {course.title}
//                 </option>
//               ))}
//             </Field>
//             <ErrorMessage name="courseId" component="div" />
//           </div>

//           <div>
//             <label htmlFor="grade">Grade</label>
//             <Field name="grade" type="text" />
//             <ErrorMessage name="grade" component="div" />
//           </div>

//           <button type="submit" disabled={isSubmitting}>
//             Submit
//           </button>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default EnrollmentForm;

import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

const EnrollmentForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ name: '' }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Required';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" />
            <ErrorMessage name="name" component="div" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default EnrollmentForm;