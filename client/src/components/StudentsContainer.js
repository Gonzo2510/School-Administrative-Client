import React, { useEffect, useState } from "react";
import Student from "./Student";


function StudentsContainer() {
    const [studentsArr, setStudentsArr] = useState([])

    useEffect(()=>{
      fetch("http://127.0.0.1:5555/students")
      .then((response) => response.json())
      .then((data) => setStudentsArr(data))
    }, [])

    const renderedStudentsArr = studentsArr.map((studentObj) =>
    <Student
        key = {studentObj.id}
        name = {studentObj.name}
        email = {studentObj.email}
    />
    )

    return(
        <>
        <h2>Students</h2>
        {renderedStudentsArr}
        </>
    )
}

export default StudentsContainer;