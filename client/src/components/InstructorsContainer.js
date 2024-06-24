import React, { useContext } from "react";
import Instructor from "./Instructor";
import { GlobalContext } from "../context";


function InstructorsContainer() {
  const { instructors } = useContext(GlobalContext)

    const renderedInstructorsArr = instructors.map((instructorObj) =>
    <Instructor
        key = {instructorObj.id}
        id = {instructorObj.id}
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