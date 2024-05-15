import React, { useEffect, useState } from "react";


function Student({ name, email }) {

    return (
        <li className="student_card_item">
            <div className="card">
            <div className="card_title">{name}</div>
            <p className="card_email">{email}</p>
            </div>
      </li>
    )
  }

  export default Student;