// src/pages/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero section */}
      <Box
        sx={{
          minHeight: "80vh",
          background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/your-placeholder-image.jpg') center/cover",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          p: 4,
        }}
      >
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Welcome to bjam
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: 600, mb: 4 }}>
          A creative music studio space where ideas flow, friends jam, and vibes become reality. 🎧
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/bjam/linkpost")}
        >
          Access the Jam Portal
        </Button>
      </Box>

      {/* About section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" gutterBottom>
          What is bjam?
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          bjam is more than a music studio – it's a digital and physical creative space
          where you and your friends can collaborate, share ideas, and build sonic experiences together.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Whether you're recording vocals, composing beats, or just hanging out listening to tunes,
          bjam is your hub for music exploration.
        </Typography>
      </Container>

      {/* Placeholder for future images/video */}
      <Container sx={{ pb: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6">Studio Vibes</Typography>
                <Typography variant="body2" color="text.secondary">
                  Insert a cool pic or a short video clip here showing the studio atmosphere.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6">Gear & Setup</Typography>
                <Typography variant="body2" color="text.secondary">
                  You could show off your instruments, DAW, synths, or jam gear here.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
