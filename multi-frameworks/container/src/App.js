import React, { lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'; // MUI v7 imports
import Header from './components/Header';
import Progress from './components/Progress';

const MarketingAppLazy = lazy(() => import('./components/MarketingApp'));
const AuthAppLazy = lazy(() => import('./components/AuthApp'));

const theme = createTheme(); // Customize if needed

const App = () => {
  const [isSignedIn, setIsSignedIn] = React.useState(() => {
    const storedValue = sessionStorage.getItem('isSignedIn');
    return storedValue === 'true';
  });

  React.useEffect(() => {
    sessionStorage.setItem('isSignedIn', isSignedIn);
  }, [isSignedIn]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth" component={AuthAppLazy} >
              <AuthAppLazy onSignIn={() => setIsSignedIn(true)} />
            </Route>
            <Route path="/" component={MarketingAppLazy} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
