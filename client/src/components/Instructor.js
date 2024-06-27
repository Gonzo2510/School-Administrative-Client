import React from "react";
import { Card, CardContent, Typography, List, ListItem, ListItemText } from "@mui/material";

function Instructor({ name, courses, id }) {
  return (
    <Card className="instructor_card_item" data-id={id}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {name}
        </Typography>
        <div className="card_courses">
          <Typography variant="subtitle1">Courses:</Typography>
          <List>
            {courses.map((c) => (
              <ListItem key={c.id}>
                <ListItemText primary={c.name} />
              </ListItem>
            ))}
          </List>
        </div>
      </CardContent>
    </Card>
  );
}

export default Instructor;
