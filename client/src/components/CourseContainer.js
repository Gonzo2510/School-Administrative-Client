import React, { useEffect, useState, useContext } from "react";
import Course from "./Course";
import { GlobalContext } from "../context";


function CourseContainer() {
  const { courses } = useContext(GlobalContext);

  const renderedCoursesArr = courses.map((courseObj) => (
      <Course
          key = {courseObj.id}
          description = {courseObj.description}
          instructorName = {courseObj.instructor.name}
          departmentName = {courseObj.department.name}
          name = {courseObj.name}
          students = {courseObj.students}
      />
    ))


    return (<>
      <h2>Courses</h2>
      <ul className="cards">
      {renderedCoursesArr}
      </ul>
    </>
    )
  }
  
  export default CourseContainer;