import React, { createContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetches
  useEffect(() => {
    fetch("http://127.0.0.1:5555/students")
        .then((response) => response.json())
        .then((data) => setStudents(data));
  }, []);

    useEffect(()=>{
    fetch("http://127.0.0.1:5555/courses")
    .then((response) => response.json())
    .then((data) => setCourses(data))
  }, [])

  useEffect(()=>{
    fetch("http://127.0.0.1:5555/instructors")
    .then((response) => response.json())
    .then((data) => {
      const sortedData = data.sort((a, b) => a.name.localeCompare(b.name))
      setInstructors(sortedData)
    })
  }, [])


  const handleDeleteStudent = (id) => {
    fetch(`http://127.0.0.1:5555/students/${id}`, {
        method: "DELETE",
    }).then(() => {
        setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
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
      errorMessage, 
      setErrorMessage, 
      successMessage, 
      setSuccessMessage
     }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
