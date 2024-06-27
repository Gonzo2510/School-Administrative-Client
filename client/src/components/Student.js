import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';



function Student({id, name, email, onDelete }) {

    return (
      <ul className="student_card_item">
        <div className="card">
          <div className="card_title">{name}</div>
          <p className="card_email">Email: {email}</p>
          <Button onClick={() => onDelete(id)} variant="outlined" startIcon={<DeleteIcon />}>Delete</Button>
        </div>
      </ul>
    )
  }

  export default Student;