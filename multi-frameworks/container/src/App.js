import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'; // MUI v7 imports
import MarketingApp from './components/MarketingApp';
import Header from './components/Header';

const theme = createTheme(); // Customize if needed

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <MarketingApp />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
