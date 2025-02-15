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
} from "@mui/material";
import pollbands from "./pollbands";
import "./poll.css";

console.log("-", pollbands);
const songGroups = pollbands;

const Poll = () => {
  const [selectedSongs, setSelectedSongs] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Load selected songs from localStorage on component mount
  useEffect(() => {
    const savedSongs = localStorage.getItem("botw_selected_songs");
    if (savedSongs) {
      const parsedSongs = JSON.parse(savedSongs);
      // Map song names to selected status
      const restoredSongs = {};
      parsedSongs.forEach((songName) => {
        restoredSongs[songName] = true; // Mark as selected
      });
      setSelectedSongs(restoredSongs);
      console.log("Saved Data Restored!", restoredSongs);
    }
    setIsLoading(false); // Set loading to false once data is fetched
  }, []);

  const filter_and_save = () => {
    const selected = Object.entries(selectedSongs)
      .filter(([_, selected]) => selected)
      .map(([name]) => name);
    console.log("Selected Songs:", selected);
    localStorage.setItem("botw_selected_songs", JSON.stringify(selected));
    return selected;
  };

  const handleChange = (song) => {
    setSelectedSongs((prev) => {
      const updated = { ...prev, [song.name]: !prev[song.name] };
      return updated;
    });
  };

  const handleSubmit = async () => {
    let selected = filter_and_save();
    const dev =`${isMobile}-${browserName}-${osName}`
    const name = prompt('if you wanna this data to be used for the video edition, please put your name')
    if (!name) {
      return;
    }
    const poll = {
      name,
      selected
    }
    try {
      const response = await fetch('https://netofcomputers.com:3090/tbotw/poll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(poll),
      });


      // Check if the response was successful
      if (!response.ok) {
        throw new Error('Failed to add poll');
      }

      // Parse the JSON response
      const result = await response.json();
      console.log('poll added successfully:', result);

      return result;
    } catch (error) {
      console.error('Error adding poll:', error);
      throw error; 
    }
    console.log('text', test);
  };

  // Use an effect to save when `selectedSongs` changes
  useEffect(() => {
    if (!isLoading) {
      filter_and_save();
    }
  }, [selectedSongs, isLoading]); // Runs when `selectedSongs` change

  if (isLoading) {
    return <div>Loading...</div>; // Show loading message until data is loaded
  }

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
          <Typography variant="h4" gutterBottom textAlign="center">
            🎶 Pick Your Favorite Songs! 🎶
          </Typography>
          {Object.entries(songGroups).map(([group, songs]) => (
            <Box key={group} sx={{ marginY: 2 }}>
              <Typography
                variant="h6"
                color="primary"
                textAlign="center"
                gutterBottom
              >
                {/* "https://netofcomputers.com/bandoftheweek/{group}" */}
                <img
                  src={`https://netofcomputers.com/media/bandoftheweek/artist/${group}.png`}
                  alt={group}
                  style={{
                    width: "100%",
                    maxWidth: "300px",
                    height: "auto",
                    borderRadius: "10px",
                    margin: "0 auto",
                  }}
                />
                {/* {group} */}
              </Typography>
              <FormGroup>
                {songs.map((song) => (
                  <FormControlLabel
                    key={song.name}
                    control={
                      <Checkbox
                        checked={!!selectedSongs[song.name]} // Check if the song is selected
                        onChange={() => handleChange(song)} // Toggle song selection
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
      </Paper>
    </Box>
  );
};

export default Poll;
