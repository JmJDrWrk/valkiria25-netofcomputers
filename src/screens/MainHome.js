import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

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
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function Home() {
  const navigate = useNavigate();
  const handleExploreClick = () => {
    navigate('/explore');
  };
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
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              marginBottom: 2,
              fontWeight: 'bold',
              color: 'black',
            }}
          >
            Welcome Back to NetofComputers!
          </Typography>
          <Typography
            variant="h5"
            sx={{
              marginBottom: 4,
              color: 'gray',
            }}
          >
            We are thrilled to bring you cool things after 2 years. Stay tuned!
          </Typography>
          <Box>
            <Button
              variant="contained"
              color="primary"
              sx={{
                padding: '10px 20px',
                fontSize: '16px',
                marginRight: 2,
              }}
              onClick={handleExploreClick}
            >
              Explore Now
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{
                padding: '10px 20px',
                fontSize: '16px',
              }}
            >
              Learn More
            </Button>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default Home;
