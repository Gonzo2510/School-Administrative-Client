import React, { useContext } from "react";
import Course from "./Course";
import { GlobalContext } from "../context";
import { Grid, Typography } from '@mui/material';

function CourseContainer() {
  const { courses, handleDeleteCourse, loading } = useContext(GlobalContext);

  if (loading) {
    return <div style={{ fontSize: '24px', textAlign: 'center' }}>The database is spinning up. The data will appear within 60 seconds.</div>;
  }

  return (
    <>
      <Typography variant="h2" gutterBottom>Courses</Typography>
      <Grid container spacing={3}>
        {courses.map((courseObj) => (
          <Grid item xs={12} sm={6} md={3} key={courseObj.id}>
            <Course
              id={courseObj.id}
              description={courseObj.description}
              instructorName={courseObj.instructor ? courseObj.instructor.name : ''}
              departmentName={courseObj.department ? courseObj.department.name : ''}
              name={courseObj.name}
              students={courseObj.students}
              onDelete={handleDeleteCourse}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default CourseContainer;
