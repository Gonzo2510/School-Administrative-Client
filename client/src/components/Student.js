import React from 'react';
import { styled } from '@mui/system';
import { Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const StudentCard = styled('ul')({
  listStyle: 'none',
  padding: 0,
  marginBottom: 20,
});

const Card = styled('div')({
  backgroundColor: 'inherit',
  color: 'inherit',
  padding: 20,
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
});

const Title = styled('div')({
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
});

const Email = styled('p')({
  marginBottom: 10,
});

function Student({ id, name, email, onDelete }) {
  return (
    <StudentCard className="student_card_item">
      <Card className="card">
        <Title className="card_title">{name}</Title>
        <Email className="card_email">Email: {email}</Email>
        <Button onClick={() => onDelete(id)} variant="outlined" startIcon={<DeleteIcon />}>
          Delete
        </Button>
      </Card>
    </StudentCard>
  );
}

export default Student;
