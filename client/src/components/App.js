import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CourseContainer from "./CourseContainer";
import InstructorsContainer from "./InstructorsContainer"
import NavBar from "./NavBar";
import Home from "./Home";
import StudentsContainer from "./StudentsContainer";
import Register from "./Register";


function App() {

  return(<> 
    <h1>Project Client</h1>
    <Router>
        <NavBar />
        <Switch>
            <Route exact path="/" component={Home} />
            {/* <Route path="/login" component={Login} /> */}
            <Route path="/courses">
              <CourseContainer/>
            </Route>
            <Route path="/instructors">
              <InstructorsContainer/>
            </Route>
            <Route path="/students">
              <StudentsContainer/>
            </Route>
            <Route path="/register">
            <Register/>
            </Route>
            {/* <Route path="/logout" component={Logout} /> */}
            {/* <Route path="/profile" component={UserProfile} /> */}
        </Switch>
    </Router>
  </>);
}

export default App;



