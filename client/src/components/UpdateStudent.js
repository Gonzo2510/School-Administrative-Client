import React, { useState, useEffect} from 'react';
import { Formik, FormikConsumer, useFormik } from 'formik';
import * as yup from 'yup';


function UpdateStudent() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetch("http://127.0.0.1:5555/students")
          .then((response) => response.json())
          .then((data) => setStudents(data))
          .catch((error) => console.error('Error fetching students:', error));
    }, []);

    
    const formSchema = yup.object().shape({
        name: yup.string().required("Name is required").max(25, 'Name must be at most 25 characters').min(3, 'Name must be at least 3 characters'),
        email: yup.string().email('Invalid email format').required("Email is required")
      });

    const formik = useFormik({
        initialValues: {
          name: '',
          email: ''
        },
        validationSchema: formSchema,
        onSubmit: (formData, { resetForm }) => {
          fetch(`http://127.0.0.1:5555/students/${selectedStudent.id}`, {
            method: "PATCH",
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
          .then((update) => {
            resetForm();
            setSuccessMessage(`${update.name} has been updated!`);
            setErrorMessage('')
            setStudents(students.map(student => student.id === update.id ? update : student))
          })
          .catch((error) => {
            console.log('Error submitting form:', error);
            setSuccessMessage('')
            setErrorMessage(error.message);
          });
        }
      });

    const handleStudentChange = (e) => {
        const selectedId = e.target.value
        const student = students.find(s => s.id === parseInt(selectedId));
        setSelectedStudent(student)
        formik.setValues({
            name: student ? student.name : '',
            email: student ? student.email : ''
        })
    }

    return (
        <div>
            <h2>Update Existing Student</h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label>Student </label>
                    <select
                        id="student"
                        name="student"
                        value={selectedStudent ? selectedStudent.id : ''}
                        onChange={handleStudentChange}
                        >
                        <option value="" label="Select student" />
                        {students.map((student) => (
                            <option key={student.id} value={student.id}>
                                {student.name}
                            </option>
                        ))}
                    </select>
                </div>
                <br/>
                <div>
                    <label>New Name </label>
                    <input
                        type="text"
                        id="name"
                        name='name'
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div>{formik.errors.name}</div>
                    ) : null}
                </div>
                <br/>
                <div>
                    <label>New Email </label>
                    <input
                        type="email"
                        id="email"
                        name='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div>{formik.errors.email}</div>
                    ) : null}
                </div>
                <br/>
                <button type="submit">Update Student</button>
            </form>
            {successMessage && <div>{successMessage}</div>}
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    )

}

export default UpdateStudent;