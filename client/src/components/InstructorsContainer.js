import React, { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import Instructor from "./Instructor";
import { GlobalContext } from "../context";

function InstructorsContainer() {
  const { instructors } = useContext(GlobalContext);

  const renderedInstructorsArr = instructors.map((instructorObj) => (
    <Grid item xs={12} md={6} lg={4} key={instructorObj.id}>
      <Instructor
        id={instructorObj.id}
        name={instructorObj.name}
        courses={instructorObj.courses}
      />
    </Grid>
  ));

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
