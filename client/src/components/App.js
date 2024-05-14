import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CourseContainer from "./CourseContainer";
import NavBar from "./NavBar";
import Course from "./Course";


function App() {

  const [coursesArr, setCoursesArr] = useState([])
  const [studentsArr, setStudentsArr] = useState([])

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


  
  
  return(<> 
    <h1>Project Client</h1>

    <Router>
        <NavBar />
        <Switch>
            {/* <Route exact path="/" component={Home} /> */}
            {/* <Route path="/login" component={Login} /> */}
            {/* <Route path="/register" component={Register} /> */}
            <Route path="/coursecontainer" component={CourseContainer} />
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


