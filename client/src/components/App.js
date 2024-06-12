import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CourseContainer from "./CourseContainer";
import InstructorsContainer from "./InstructorsContainer"
import NavBar from "./NavBar";
import Home from "./Home";
import StudentsContainer from "./StudentsContainer";
import Register from "./Register";
import EnrollmentForm from "./EnrollmentForm";


function App() {

  return(<> 
    <h1>Adminstrative School Client</h1>
    <Router>
        <NavBar />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/courses" component={CourseContainer} />
            <Route exact path="/instructors" component={InstructorsContainer} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/enrollment" component={EnrollmentForm} />
        </Switch>
    </Router>
  </>);
}

export default App;



