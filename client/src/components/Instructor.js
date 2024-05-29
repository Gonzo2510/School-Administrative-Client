import React, { useEffect, useState } from "react";


function Instructor({ name, courses, key }) {

    return (
      <ul className="instructor_card_item" data-id={key}>
        <div className="card">
          <div className="card_title">{name}</div>
          <p className="card_courses">Courses: {courses.map((c)=> <li>{c.name}</li>)}</p>
        </div>
      </ul>
    )
  }

  export default Instructor;