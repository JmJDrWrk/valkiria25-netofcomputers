import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, Container } from '@mui/material';


import INDEX from './index'
import LinkPost from './linkpost.js'

// Create the theme with black and white colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', 
    },
    secondary: {
      main: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#000000', 
      secondary: '#555555'
    }
  },
});

function miniroutes() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <div style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<INDEX />} />
            <Route path="/linkpost" element={<LinkPost />} />
          </Routes>
        </div>
      </ThemeProvider>
    </>
  );
}

export default miniroutes;
