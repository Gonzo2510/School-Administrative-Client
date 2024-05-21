import React, { useEffect, useState } from "react";


function Instructor({ name, courses}) {

    return (
      <ul className="ins_card_item">
        <div className="card">
          <div className="card_title">{name}</div>
          <p className="card_courses">Courses: {courses.map((c)=> <li>{c.name}</li>)}</p>
        </div>
      </ul>
    )
  }

  export default Instructor;