import React, { lazy, Suspense } from 'react';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'; // MUI v7 imports
import { createBrowserHistory } from 'history';
import Header from './components/Header';
import Progress from './components/Progress';

const MarketingAppLazy = lazy(() => import('./components/MarketingApp'));
const AuthAppLazy = lazy(() => import('./components/AuthApp'));
const DashboardAppLazy = lazy(() => import('./components/DashboardApp'));

const theme = createTheme(); // Customize if needed
const history = createBrowserHistory();

const App = () => {
  const [isSignedIn, setIsSignedIn] = React.useState(() => {
    const storedValue = sessionStorage.getItem('isSignedIn');
    return storedValue === 'true';
  });

  React.useEffect(() => {
    sessionStorage.setItem('isSignedIn', isSignedIn);
    if (isSignedIn) {
      history.push('/dashboard');
    }
  }, [isSignedIn]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={history}>
        <Header
          isSignedIn={isSignedIn}
          onSignOut={() => setIsSignedIn(false)}
        />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth">
              <AuthAppLazy onSignIn={() => setIsSignedIn(true)} />
            </Route>
            <Route path="/dashboard">
              {!isSignedIn && <Redirect to="/" />}
              <DashboardAppLazy />
            </Route>
            <Route path="/" component={MarketingAppLazy} />
          </Switch>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default App;
