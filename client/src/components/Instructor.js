import React, { useEffect, useState } from "react";


function Instructor({ name, department }) {

    return (
      <ul className="ins_card_item">
        <div className="card">
          <div className="card_title">{name}</div>
          <p className="card_department">Department: {department}</p>
        </div>
      </ul>
    )
  }

  export default Instructor;