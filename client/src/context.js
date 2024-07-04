import React, { createContext, useState, useEffect } from 'react';

const GlobalContext = createContext();
const apiURL = 'postgresql://project_5_db_4k8v_user:t8oXtYeWj7z28AXSpNAl2EHswpLTaIIX@dpg-cq2pe1g8fa8c73ant3og-a.oregon-postgres.render.com/project_5_db_4k8v'

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
      setSuccessMessage,
      fetchCourses,
      apiURL
     }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
