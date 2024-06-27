import React from "react";
import { styled } from '@mui/system';
import { Card, CardContent, Typography } from '@mui/material';

const CourseCard = styled(Card)({
  marginBottom: 20,
  backgroundColor: 'inherit',
  color: 'inherit',
});

const Title = styled(Typography)({
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
});

const Description = styled(Typography)({
  marginBottom: 10,
});

const Instructor = styled(Typography)({
  fontStyle: 'italic',
  marginBottom: 5,
});

const Department = styled(Typography)({
  marginBottom: 5,
});

const Students = styled(Typography)({
  marginBottom: 10,
});

function Course({ description, id, instructorName, departmentName, name, students }) {
  const studentNames = students.map(student => student.name).join(', ');

  return (
    <CourseCard elevation={3}>
      <CardContent>
        <Title>{name}</Title>
        <Description>{description}</Description>
        <Instructor>Instructor: {instructorName}</Instructor>
        <Department>Department: {departmentName}</Department>
        <Students>Students: {studentNames}</Students>
      </CardContent>
    </CourseCard>
  );
}

export default Course;
