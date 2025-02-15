import React, { useEffect, useState } from "react";
import { isMobile, browserName, osName } from 'react-device-detect';
import {
  Box,
  Container,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Paper,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import pollbands from "./pollbands";
import "./poll.css";

const songGroups = pollbands;

const Poll = () => {
  const [selectedSongs, setSelectedSongs] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const savedSongs = localStorage.getItem("botw_selected_songs");
    if (savedSongs) {
      const parsedSongs = JSON.parse(savedSongs);
      const restoredSongs = {};
      parsedSongs.forEach((songName) => {
        restoredSongs[songName] = true;
      });
      setSelectedSongs(restoredSongs);
    }
    setIsLoading(false);
  }, []);

  const filter_and_save = () => {
    const selected = Object.entries(selectedSongs)
      .filter(([_, selected]) => selected)
      .map(([name]) => name);
    localStorage.setItem("botw_selected_songs", JSON.stringify(selected));
    return selected;
  };

  const handleChange = (song) => {
    setSelectedSongs((prev) => ({
      ...prev,
      [song.name]: !prev[song.name],
    }));
  };

  const handleSubmit = async () => {
    const selected = filter_and_save();
    const dev = `${isMobile}-${browserName}-${osName}`;
    const name = prompt('Enter your name if you want your selections included in the video edit:');
    if (!name) return;

    const poll = { name, selected };
    try {
      const response = await fetch('https://netofcomputers.com:3090/tbotw/poll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(poll),
      });
      if (!response.ok) throw new Error('Failed to add poll');
      const result = await response.json();
      console.log('Poll submitted successfully:', result);
      setNotification({ open: true, message: 'Poll submitted successfully!', severity: 'success' });
    } catch (error) {
      console.error('Error submitting poll:', error);
      setNotification({ open: true, message: 'Failed to submit poll.', severity: 'error' });
    }
  };

  useEffect(() => {
    if (!isLoading) filter_and_save();
  }, [selectedSongs, isLoading]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f4f7",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 3,
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <Container>
          <Typography variant="h4" gutterBottom textAlign="center" sx={{ marginBottom: 2,
            border: "1px solid #000",
            borderRadius: "10px",
            backgroundColor: "#ff1f0024",
            padding: "10px",
            fontSize: "1.135rem",
          }}>
           Select up to 3 songs per group to make your preferences as relevant as possible.
          </Typography>
          {Object.entries(songGroups).map(([group, songs]) => (
            <Box key={group} sx={{ marginY: 2, textAlign: "center" }}>
              <Typography variant="h6" color="primary" gutterBottom>
                <img
                  src={`https://netofcomputers.com/media/bandoftheweek/artist/${group}.png`}
                  alt={group}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "";
                    e.target.style.display = "none";
                  }}
                  style={{
                    width: "100%",
                    maxWidth: "300px",
                    height: "auto",
                    borderRadius: "10px",
                    margin: "0 auto",
                  }}
                />
                {/* <Typography variant="subtitle1" color="textSecondary">
                  {group}
                </Typography> */}
              </Typography>
              <FormGroup>
                {songs.map((song) => (
                  <FormControlLabel
                    key={song.name}
                    control={
                      <Checkbox
                        checked={!!selectedSongs[song.name]}
                        onChange={() => handleChange(song)}
                      />
                    }
                    label={
                      <Link
                        href={song.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <img
                          src="https://www.svgrepo.com/show/13671/youtube.svg"
                          alt="YouTube"
                          style={{ width: 16, height: 16, marginRight: 4 }}
                        />
                        {song.name}
                      </Link>
                    }
                  />
                ))}
              </FormGroup>
            </Box>
          ))}
          <Box sx={{ textAlign: "center", marginTop: 3 }}>
            <Button variant="contained" color="secondary" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </Container>
        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={() => setNotification({ ...notification, open: false })}
        >
          <Alert
            onClose={() => setNotification({ ...notification, open: false })}
            severity={notification.severity}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default Poll;
