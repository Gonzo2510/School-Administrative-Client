import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CourseContainer from "./CourseContainer";
import NavBar from "./NavBar";


function App() {

  const [coursesArr, setCoursesArr] = useState([])
  const [studentsArr, setStudentsArr] = useState([])
  const [instructorsArr, setInstructorsArr] = useState([])

  useEffect(()=>{
    fetch("http://127.0.0.1:5555/courses")
    .then((response) => response.json())
    .then((data) => setCoursesArr(data))
  }, [])
  
  useEffect(()=>{
    fetch("http://127.0.0.1:5555/students")
    .then((response) => response.json())
    .then((data) => setStudentsArr(data))
  }, [])
  
  useEffect(()=>{
    fetch("http://127.0.0.1:5555/instructors")
    .then((response) => response.json())
    .then((data) => setInstructorsArr(data))
  }, [])

  
  
  return(<> 
    <h1>Project Client</h1>

    <Router>
        <NavBar />
        <Switch>
            {/* <Route exact path="/" component={Home} /> */}
            {/* <Route path="/login" component={Login} /> */}
            <Route path="/coursecontainer" component={CourseContainer} />
            {/* <Route path="/register" component={Register} /> */}
            {/* <Route path="/logout" component={Logout} /> */}
            {/* <Route path="/profile" component={UserProfile} /> */}
        </Switch>
    </Router>


    <h2>Courses</h2>
    <CourseContainer coursesArr = {coursesArr} />
  </>);
}

export default App;





{/* <Router>
<nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

      </ul>
    </nav>
<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/login" component={Login} />
</Switch>
</Router> */}


