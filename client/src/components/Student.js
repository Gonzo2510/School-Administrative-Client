import React from "react";


function Student({id, name, email, onDelete }) {

    return (
      <ul className="student_card_item">
        <div className="card">
          <div className="card_title">{name}</div>
          <p className="card_email">Email: {email}</p>
          <button button onClick={() => onDelete(id)}>Delete</button>
        </div>
      </ul>
    )
  }

  export default Student;