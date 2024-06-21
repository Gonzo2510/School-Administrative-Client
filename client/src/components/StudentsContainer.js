import React, { useContext } from "react";
import Student from "./Student";
import { GlobalContext } from "../context";


function StudentsContainer({ searchTerm }) {
    const { students, handleDeleteStudent } = useContext(GlobalContext);

    const filteredStudentsArr = students.filter((student) =>
        searchTerm === "" || (student.name && student.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const renderedStudentsArr = filteredStudentsArr.map((studentObj) => (
        <Student
            key={studentObj.id}
            id={studentObj.id}
            name={studentObj.name}
            email={studentObj.email}
            onDelete={handleDeleteStudent}
        />
    ));
    
    return <>{renderedStudentsArr}</>;
}

export default StudentsContainer;