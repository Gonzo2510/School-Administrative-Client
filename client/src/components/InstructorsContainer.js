import React, { useEffect, useState } from "react";
import Instructor from "./Instructor";


function InstructorsContainer() {
    const [instructorsArr, setInstructorsArr] = useState([])

    useEffect(()=>{
      fetch("http://127.0.0.1:5555/instructors")
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => a.name.localeCompare(b.name))
        setInstructorsArr(sortedData)
      })
    }, [])

    const renderedInstructorsArr = instructorsArr.map((instructorObj) =>
    <Instructor
        key = {instructorObj.id}
        name = {instructorObj.name}
        courses = {instructorObj.courses}
    />
    )

    return(
        <>
        <h2>Instructors</h2>
        {renderedInstructorsArr}
        </>
    )
}

export default InstructorsContainer;