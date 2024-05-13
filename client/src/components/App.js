import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";


function NavBar() {
  return (
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Students</a></li>
        <li><a href="#">Courses</a></li>
        <li><a href="#">Instructors</a></li>
      </ul>
    </nav>
  );
}
// export default NavBar;

function Course() {
  fetch("http://127.0.0.1:5555/courses")


  return (
    <li className="cards_item">
      <div className="card">
        <div className="card_title">Course Name</div>
        <p className="card_description">Course Description</p>
        <p className="card_instructor">Instructor</p>
        <p className="card_department">Department</p>
      </div>

    </li>
  )
}
// export default Course;


function CourseContainer() {

  return (
    <>
    </>
  )
}
// export default CoursesContainer




function App() {

  return(<> 
    <Header/>
    <NavBar/>
    <CourseContainer/>
    <h1>Project Client</h1>
    <h1>Home</h1>
    <div className="container">
            <h1>High School Course Signup List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Instructor</th>
                        <th>Available Seats</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Mathematics</td>
                        <td>John Smith</td>
                        <td>20</td>
                        <td><button className="button">Sign Up</button></td>
                    </tr>
                    {/* Add more course rows here */}
                </tbody>
            </table>
        </div>

  </>);
}

export default App;


