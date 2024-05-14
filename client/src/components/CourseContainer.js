import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Course from "./Course";



function CourseContainer( { coursesArr } ) {

    const renderedCoursesArr = coursesArr.map((courseObj) => (
    <Course
        key = {courseObj.id}
        description = {courseObj.description}
        instructor = {courseObj.instructor}
        instructor_id = {courseObj.instructor_id}
        name = {courseObj.name}
        students = {courseObj.students}
    />
    ))


    return (
      <ul className="cards">
      {renderedCoursesArr}
      </ul>
    )
  }


  export default CourseContainer;