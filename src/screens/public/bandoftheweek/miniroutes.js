import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, Container } from '@mui/material';


import INDEX from './news'
import Newspaper from './news';
import ScratchOff from './scratch';
// import TaskConsumer from './taskPuller';


// Create the theme with black and white colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Black for primary color
    },
    secondary: {
      main: '#FFFFFF', // White for secondary color
    },
    background: {
      default: '#FFFFFF', // White background
      paper: '#FFFFFF', // White paper background (card background)
    },
    text: {
      primary: '#000000', // Black text
      secondary: '#555555', // Lighter black for secondary text
    }
  },
});

function miniroutes() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <div style={{ flexGrow: 1 }}>

          {/* App Bar */}
          {/* <AppBar position="sticky" sx={{ backgroundColor: 'black' }}>
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }}>
                NetofComputers
              </Typography>
              <Button color="inherit">Login</Button>
              <Button color="inherit">Sign Up</Button>
            </Toolbar>
          </AppBar> */}
          <Routes>

            <Route path="/" element={<INDEX />} />
            <Route path="/beta" element={<Newspaper />} />
            <Route path="/sc" element={<ScratchOff />} />

          </Routes>
        </div>
      </ThemeProvider>
    </>
  );
}

export default miniroutes;
