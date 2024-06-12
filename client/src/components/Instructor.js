import React, { useEffect, useState } from "react";


function Instructor({ name, courses, key }) {

    return (
      <ul className="instructor_card_item" data-id={key}>
        <div className="card">
          <div className="card_title">{name}</div>
          <div className="card_courses">
            <p>Courses:</p>
            <ul>
            {courses.map((c)=> <li>{c.name}</li>)}
            </ul>
          </div>
        </div>
      </ul>
    )
  }

  export default Instructor;