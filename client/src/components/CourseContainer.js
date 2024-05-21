import React, { useEffect, useState } from "react";
import Course from "./Course";


function CourseContainer() {
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