import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';



function Student({id, name, email, onDelete }) {

    return (
      <ul className="student_card_item">
        <div className="card">
          <div className="card_title">{name}</div>
          <p className="card_email">Email: {email}</p>
          <Button onClick={() => onDelete(id)} variant="contained">Delete</Button>
          {/* <button onClick={() => onDelete(id)}>Delete</button> */}
        </div>
      </ul>
    )
  }

  export default Student;