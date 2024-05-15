import React, { useEffect, useState } from "react";


function Instructor({ instructor, department }) {

    return (
      <li className="ins_card_item">
        <div className="card">
          <div className="card_title">{instructor}</div>
          <p className="card_department">{department}</p>
        </div>
      </li>
    )
  }

  export default Instructor;