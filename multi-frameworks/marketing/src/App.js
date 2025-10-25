import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Landing from './components/Landing';
import Pricing from './components/Pricing';
import { StylesProvider } from '@material-ui/core';

const App = () => {
  return (
    <StylesProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Landing />
          </Route>
          <Route path="/pricing">
            <Pricing />
          </Route>
        </Switch>
      </BrowserRouter>
    </StylesProvider>
  );
};

export default App;
