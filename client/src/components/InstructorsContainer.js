import React, { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import Instructor from "./Instructor";
import { GlobalContext } from "../context";

function InstructorsContainer() {
  const { instructors, handleDeleteInstructor, loading } = useContext(GlobalContext);

  const renderedInstructorsArr = instructors.map((instructorObj) => (
    <Grid item xs={12} md={6} lg={4} key={instructorObj.id}>
      <Instructor
        id={instructorObj.id}
        name={instructorObj.name}
        courses={instructorObj.courses}
        onDelete={handleDeleteInstructor}
      />
    </Grid>
  ));

  if (loading) {
    return <div style={{ fontSize: '24px', textAlign: 'center' }}>The database is spinning up. The data will appear within 60 seconds.</div>;
  }
  
  return (
    <>
      <Typography variant="h2" gutterBottom>Instructors</Typography>
      <Grid container spacing={2}>
        {renderedInstructorsArr}
      </Grid>
    </>
  );
}

export default InstructorsContainer;
