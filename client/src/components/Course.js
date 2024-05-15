import React, { useEffect, useState } from "react";


function Course({ description, id, instructor, instructor_id, name, students }) {
    return (
      <li className="card_item">
        <div className="card">
          <div className="card_title">{name}</div>
          <p className="card_description">{description}</p>
          <p className="card_instructor">instructor</p>
          <p className="card_department">department</p>
          <p className="card_students">students</p>
        </div>
      </li>
    )
  }
  export default Course;