import React, { useEffect, useState } from "react";


function Course({ description, id, instructorName, departmentName, name, students }) {
    return (
      <li className="course_card_item" data-id={id}>
        <div className="card">
          <div className="card_title">{name}</div>
          <p className="card_description">{description}</p>
          <p className="card_instructor">Instructor: {instructorName}</p>
          <p className="card_department">Department: {departmentName}</p> 
          <p className="card_students">{students}</p>
        </div>
      </li>
    )
  }
  export default Course;