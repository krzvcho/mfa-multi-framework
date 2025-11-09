import React, { useState, useEffect } from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'; // MUI v7 imports

import Landing from './components/Landing';
import Pricing from './components/Pricing';

const theme = createTheme(); // You can customize the theme if needed

const App = ({ history }) => {
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
          <Route path="/" element={<Landing />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
