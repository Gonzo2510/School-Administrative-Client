import React, { useEffect, useState } from "react";
import Student from "./Student";

function StudentsContainer({ searchTerm }) {
    const [studentsArr, setStudentsArr] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5555/students")
            .then((response) => response.json())
            .then((data) => setStudentsArr(data));
    }, []);

    const handleDelete = (id) => {
        fetch(`/api/students/${id}`, {
            method: "DELETE",
        }).then(() => {
            setStudentsArr(studentsArr.filter((student) => student.id !== id));
        });
    };

    const filteredStudentsArr = studentsArr.filter((student) =>
        searchTerm === "" || (student.name && student.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const renderedStudentsArr = filteredStudentsArr.map((studentObj) => (
        <Student
            key={studentObj.id}
            id={studentObj.id}
            name={studentObj.name}
            email={studentObj.email}
            onDelete={handleDelete}
        />
    ));

    return <>{renderedStudentsArr}</>;
}

export default StudentsContainer;
