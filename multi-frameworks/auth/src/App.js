import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  BrowserRouter,
  Router,
  useInRouterContext,
} from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'; // MUI v7 imports
import SignIn from './components/Signin';
import SignUp from './components/Signup';

const theme = createTheme({
  palette: {
    text: {
      primary: '#000000',
      secondary: '#555555',
    },
  },
});

const RoutesContent = ({ onSignIn }) => (
  <Routes>
    <Route path="/auth/signin" element={<SignIn onSignIn={onSignIn} />} />
    <Route path="/auth/signup" element={<SignUp onSignIn={onSignIn} />} />
  </Routes>
);

const App = ({ history, onSignIn }) => {
  const inRouter = useInRouterContext();

  if (inRouter) {
    return (
      // <ThemeProvider theme={theme}>
      //   <CssBaseline />
        <RoutesContent onSignIn={onSignIn} />
      // </ThemeProvider>
    );
  }

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
          <RoutesContent onSignIn={onSignIn} />
        </Router>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <RoutesContent onSignIn={onSignIn} />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
