import React from "react";
import Instructor from "./Instructor";


function InstructorsContainer() {
    const renderedInstructorsArr = instructorArr.map((instructorObj) =>
    <Instructor
        key = {instructorObj.id}
        name = {instructorObj.name}
    />
)
}