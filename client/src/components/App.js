import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from './NavBar';
import Home from './Home';
import CourseContainer from './CourseContainer';
import InstructorsContainer from './InstructorsContainer';
import Register from './Register';
import EnrollmentForm from './EnrollmentForm';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/courses" component={CourseContainer} />
          <Route exact path="/instructors" component={InstructorsContainer} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/enrollment" component={EnrollmentForm} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
