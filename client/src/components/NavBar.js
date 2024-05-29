import React from "react";
import { Link } from "react-router-dom";


function NavBar() {

    return (
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            {/* <li><Link to="/students">Students</Link></li> */}
            <li><Link to="/instructors">Instructors</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/enrollment">Enrollment</Link></li>
          </ul>
        </nav>
    );
  }

  export default NavBar;