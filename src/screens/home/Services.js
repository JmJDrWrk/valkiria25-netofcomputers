import React from 'react';
import { AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Mock JSON data for options
const mockData = [
  {
    title: "Tutorials",
    description: "Learn about server configs, system optimization, and more!",
    buttonText: "Explore"
  },
  {
    title: "Web Services",
    description: "Find handy tools like our online guitar tuner, and more!",
    buttonText: "Discover"
  },
  {
    title: "Tech News",
    description: "Stay up-to-date with the latest in the tech world!",
    buttonText: "Read More"
  }
];

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

function Home() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ flexGrow: 1 }}>
        {/* App Bar */}
        <AppBar position="sticky" sx={{ backgroundColor: 'black' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, color: 'white' }}>
              NetofComputers
            </Typography>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Sign Up</Button>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container>
          <Typography variant="h3" align="center" sx={{ marginBottom: 4, color: 'black' }}>
            Welcome to NetofComputers!
          </Typography>
          <Typography variant="h5" align="center" paragraph sx={{ color: 'black' }}>
            A place for tutorials, tools, and everything related to computers and tech!
          </Typography>

          {/* Grid of Cards */}
          <Grid container spacing={4} sx={{ marginTop: 4 }}>
            {mockData.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, textAlign: 'center', backgroundColor: 'white' }}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h6" sx={{ color: 'black' }}>{item.title}</Typography>
                    <Typography variant="body2" sx={{ color: 'black' }}>{item.description}</Typography>
                    <Button variant="contained" sx={{ marginTop: 2, backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#333' } }}>
                      {item.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default Home;
