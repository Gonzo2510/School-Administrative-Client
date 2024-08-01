import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import Student from './Student';
import { GlobalContext } from '../context';

function StudentsContainer({ searchTerm }) {
  const { students, handleDeleteStudent, loading } = useContext(GlobalContext);

  const filteredStudentsArr = students.filter(
    student =>
      searchTerm === '' || (student.name && student.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return <div style={{ fontSize: '24px', textAlign: 'center' }}>The database is spinning up. The data will appear within 60 seconds.</div>;
  }

  return (
    <Grid container spacing={2}>
      {filteredStudentsArr.map(studentObj => (
        <Grid item key={studentObj.id} xs={12} sm={6} md={4} lg={3}>
          <Student
            id={studentObj.id}
            name={studentObj.name}
            email={studentObj.email}
            onDelete={handleDeleteStudent}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default StudentsContainer;
