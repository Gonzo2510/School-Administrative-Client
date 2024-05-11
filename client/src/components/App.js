import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

function App() {

  const [studentsArr, setStudentsArr] = useState([])

useEffect(() => {
  fetch("http://127.0.0.1:5555/students")
  .then((resp) => resp.json())
  .then((data) => setStudentsArr(data))
})





  return(<> 
    <h1>Project Client</h1>
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


