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
  export default NavBar;