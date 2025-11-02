import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
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

const App = ({ history }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter history={history}>
        <Switch>
          <Route path="/auth/signin" component={SignIn} />
          <Route path="/auth/signup" component={SignUp} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
