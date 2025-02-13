import React, { useEffect, useState } from "react";
import {
    Box,
    Container,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Button,
    Typography,
    Paper,
    Link
} from "@mui/material";
import pollbands from './pollbands';
import './poll.css'
// const songGroups = {
//   "Rock Classics": ["Bohemian Rhapsody", "Hotel California", "Stairway to Heaven"],
//   "Pop Hits": ["Blinding Lights", "Levitating", "Shape of You"],
//   "Electronic Vibes": ["Titanium", "Animals", "Strobe"]
// };
console.log('-', pollbands)
const songGroups = pollbands
const Poll = () => {
    const [selectedSongs, setSelectedSongs] = useState({});

    const filter_and_save = () => {
        const selected = Object.entries(selectedSongs)
            .filter(([_, selected]) => selected)
            .map(([name]) => name);
        console.log("Selected Songs:", selected);
        localStorage.setItem('botw_selected_songs', JSON.stringify(selected))
        return selected
    }

    const handleChange = (song) => {
        setSelectedSongs((prev) => ({
            ...prev,
            [song.name]: !prev[song.name]
        }));
        filter_and_save()
    };

    const handleSubmit = () => {
        let selected = filter_and_save()
        alert(`Selected Songs:\n${selected.join(", ")}`);
    };

    useEffect(() => {
        const botw_selected_songs = localStorage.getItem('botw_selected_songs');
        if (botw_selected_songs) {
            setSelectedSongs(JSON.parse(localStorage.getItem('botw_selected_songs')))
            console.log('Saved Data Restored!')
        }
    }, []);
    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f0f4f7"
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    padding: 4,
                    borderRadius: 3,
                    maxHeight: "80vh",
                    overflowY: "auto"
                }}
            >
                <Container>
                    <Typography variant="h4" gutterBottom textAlign="center">
                        🎶 Pick Your Favorite Songs! 🎶
                    </Typography>
                    {Object.entries(songGroups).map(([group, songs]) => (
                        <Box key={group} sx={{ marginY: 2 }}>
                            <Typography variant="h6" color="primary" textAlign="center" gutterBottom>
                                {group}
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
                                            <Link href={song.youtube} target="_blank" rel="noopener noreferrer">
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
