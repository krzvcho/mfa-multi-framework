import React, { lazy, Suspense } from 'react';
import {
  Route,
  BrowserRouter,
  Routes,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'; // MUI v7 imports
import Header from './components/Header';
import Progress from './components/Progress';

const MarketingAppLazy = lazy(() => import('./components/MarketingApp'));
const AuthAppLazy = lazy(() => import('./components/AuthApp'));
const DashboardAppLazy = lazy(() => import('./components/DashboardApp'));

const theme = createTheme(); // Customize if needed

const App = () => {
  const [isSignedIn, setIsSignedIn] = React.useState(() => {
    const storedValue = sessionStorage.getItem('isSignedIn');
    return storedValue === 'true';
  });
  const navigate = useNavigate();

  const handleSignIn = () => {
    setIsSignedIn(true);
    navigate('/dashboard');
  };

  React.useEffect(() => {
    sessionStorage.setItem('isSignedIn', isSignedIn);
  }, [isSignedIn]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn} />
      <Suspense fallback={<Progress />}>
        <Routes>
          <Route
            path="/auth/*"
            element={<AuthAppLazy onSignIn={handleSignIn} />}
          />
          <Route
            path="/dashboard"
            element={!isSignedIn ? <Navigate to="/" /> : <DashboardAppLazy />}
          />
          <Route path="/*" element={<MarketingAppLazy />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
};

export default () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};
