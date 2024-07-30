import React, { createContext, useState, useEffect } from 'react';

const GlobalContext = createContext();
const apiURL = 'https://project-5-backend.onrender.com'

const GlobalProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetches
  useEffect(() => {
    fetchStudents();
    fetchCourses();
    fetchInstructors()
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${apiURL}/students`);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${apiURL}/courses`);
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchInstructors = async () => {
    try {
      const response = await fetch(`${apiURL}/instructors`);
      const data = await response.json();
      const sortedData = data.sort((a, b) => a.name.localeCompare(b.name))
      setInstructors(sortedData)
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };


  const handleDeleteStudent = (id) => {
    fetch(`${apiURL}/students/${id}`, {
        method: "DELETE",
    }).then(() => {
        setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
        fetchCourses()
    });
  };

  const handleDeleteCourse = (id) => {
    fetch(`${apiURL}/courses/${id}`, {
        method: "DELETE",
    }).then(() => {
        setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
        fetchCourses()
    });
  };

  const handleDeleteInstructor = (id) => {
    fetch(`${apiURL}/instructors/${id}`, {
        method: "DELETE",
    }).then(() => {
        setInstructors((prevInstructors) => prevInstructors.filter((instructor) => instructor.id !== id));
        fetchInstructors()
    });
  };




  return (
    <GlobalContext.Provider value={{ 
      students, 
      setStudents,
      courses, 
      instructors, 
      departments, 
      handleDeleteStudent,
      handleDeleteCourse,
      handleDeleteInstructor,  
      errorMessage, 
      setErrorMessage, 
      successMessage, 
      setSuccessMessage,
      fetchCourses,
      apiURL
     }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
