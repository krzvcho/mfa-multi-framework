import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  BrowserRouter,
  Router,
  useInRouterContext,
} from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'; // MUI v7 imports

import Landing from './components/Landing';
import Pricing from './components/Pricing';
import MyTreeTest from './components/MyTreeTest';

const theme = createTheme(); // You can customize the theme if needed

const RoutesContent = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/mytree" element={<MyTreeTest />} />
  </Routes>
);

const App = ({ history }) => {
  const inRouter = useInRouterContext();

  // If we're already rendered inside a Router from the container, just render Routes
  if (inRouter) {
    return (
      // <ThemeProvider theme={theme}>
      //   <CssBaseline />
      <RoutesContent />
      // </ThemeProvider>
    );
  }

  // If a history object is provided (mounting as microfrontend standalone with history),
  // use low-level Router with navigator=history and sync location state.
  if (history) {
    const [location, setLocation] = useState(history.location);

    useEffect(() => {
      const unlisten = history.listen(({ location: nextLocation }) => {
        setLocation(nextLocation);
      });
      return unlisten;
    }, [history]);

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router location={location} navigator={history}>
          <RoutesContent />
        </Router>
      </ThemeProvider>
    );
  }

  // Default standalone mode: BrowserRouter
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <RoutesContent />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
