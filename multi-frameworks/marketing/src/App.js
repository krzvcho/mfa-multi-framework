import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'; // MUI v7 imports

import Landing from './components/Landing';
import Pricing from './components/Pricing';

const theme = createTheme(); // You can customize the theme if needed

const App = ({ history }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={history}>
        <Switch>
          <Route path="/" exact>
            <Landing />
          </Route>
          <Route path="/pricing">
            <Pricing />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
