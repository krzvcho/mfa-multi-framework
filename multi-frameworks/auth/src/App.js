import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={history}>
        <Switch>
          <Route path="/auth/signin" >
            <SignIn onSignIn={onSignIn} />
          </Route>
          <Route path="/auth/signup" >
            <SignUp onSignIn={onSignIn} />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
