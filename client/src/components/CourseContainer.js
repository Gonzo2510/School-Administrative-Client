import React, { useEffect, useState } from "react";
import Course from "./Course";


function CourseContainer() {
  console.log("Course Container")
  const [coursesArr, setCoursesArr] = useState([])

  useEffect(()=>{
    fetch("http://127.0.0.1:5555/courses")
    .then((response) => response.json())
    .then((data) => setCoursesArr(data))
  }, [])

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


    return (<>
      <h2>Courses</h2>
      <ul className="cards">
      {renderedCoursesArr}
      </ul>
    </>
    )
  }

  export default CourseContainer;