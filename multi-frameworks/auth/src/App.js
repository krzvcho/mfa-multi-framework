import React, { useState, useEffect } from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'; // MUI v7 imports
import SignIn from './components/Signin';
import SignUp from './components/Signup';

const theme = createTheme({
  palette: {
    text: {
      primary: '#000000',
      secondary: '#555555', // This is what "text.secondary" uses
    },
    // ... other palette customizations
  },
});

const App = ({ history, onSignIn }) => {
  const [location, setLocation] = useState(history.location);

  useEffect(() => {
    // Listen to history changes and update location state
    const unlisten = history.listen((update) => {
      setLocation(update.location);
    });

    return unlisten; // Clean up the listener on unmount
  }, [history]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router location={location} navigator={history}>
        <Routes>
          <Route path="/auth/signin" element={<SignIn onSignIn={onSignIn} />} />
          <Route path="/auth/signup" element={<SignUp onSignIn={onSignIn} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
