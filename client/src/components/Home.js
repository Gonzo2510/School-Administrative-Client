import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import StudentsContainer from "./StudentsContainer";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Typography variant="h2" gutterBottom>Students</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={8}>
            <TextField
              fullWidth
              type="text"
              label="Student Name"
              variant="outlined"
              value={searchTerm}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
      <StudentsContainer searchTerm={searchTerm} />
    </>
  );
}

export default Home;
