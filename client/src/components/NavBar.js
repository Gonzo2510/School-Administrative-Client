import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu } from '@mui/material';
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { Link as RouterLink } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

const NavBar = ({ isDarkMode, toggleTheme }) => {

  return (
    <AppBar position="static" color={isDarkMode ? 'default' : 'primary'}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          School Administration
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">Students</Button>
        <Button color="inherit" component={RouterLink} to="/courses">Courses</Button>
        <Button color="inherit" component={RouterLink} to="/instructors">Instructors</Button>
        <Button color="inherit" component={RouterLink} to="/register">Register</Button>
        <Button color="inherit" component={RouterLink} to="/enrollment">Enrollment</Button>
        <IconButton color="inherit" onClick={toggleTheme}>
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
