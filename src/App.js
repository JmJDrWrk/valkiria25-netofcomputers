import React from 'react';
import AppRoutes from './Routes';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a simple theme
const theme = createTheme({
  spacing: 8,  // You can adjust the spacing scale
});

function App() {
  return (
    // Wrap your entire app with ThemeProvider to inject the theme
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
