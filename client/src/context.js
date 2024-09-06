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
  const [loading, setLoading] = useState(true)

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
      setLoading(false)
    } catch (error) {
      console.error('Error fetching students:', error);
      setLoading(false)
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${apiURL}/courses`);
      const data = await response.json();
      setCourses(data);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching courses:', error);
      setLoading(false)
    }
  };

  const fetchInstructors = async () => {
    try {
      const response = await fetch(`${apiURL}/instructors`);
      const data = await response.json();
      const sortedData = data.sort((a, b) => a.name.localeCompare(b.name))
      setInstructors(sortedData)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching courses:', error);
      setLoading(false)
    }
  };


  const handleDeleteStudent = (id) => {
    fetch(`${apiURL}/student/${id}`, {
        method: "DELETE",
    }).then(() => {
        setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
        fetchCourses()
    });
  };

  const handleDeleteCourse = (id) => {
    fetch(`${apiURL}/course/${id}`, {
        method: "DELETE",
    }).then(() => {
        setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
        fetchCourses()
    });
  };

  const handleDeleteInstructor = (id) => {
    fetch(`${apiURL}/instructor/${id}`, {
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
      setCourses,
      instructors,
      setInstructors, 
      departments, 
      handleDeleteStudent,
      handleDeleteCourse,
      handleDeleteInstructor,  
      errorMessage, 
      setErrorMessage, 
      successMessage, 
      setSuccessMessage,
      fetchCourses,
      apiURL,
      loading
     }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
