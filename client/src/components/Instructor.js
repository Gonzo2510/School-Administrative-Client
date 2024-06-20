import React, { useEffect, useState } from "react";


function Instructor({ name, courses, id }) {

    return (
      <ul className="instructor_card_item" data-id={id}>
        <div className="card">
          <div className="card_title">{name}</div>
          <div className="card_courses">
            <p>Courses:</p>
            <ul>
            {courses.map((c) => <li key={c.id}>{c.name}</li>)}
            </ul>
          </div>
        </div>
      </ul>
    )
  }

  export default Instructor;