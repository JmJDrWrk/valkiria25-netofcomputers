import React, { useState } from 'react';
import { Box, Typography, Grid, Button, TextField } from '@mui/material';
// import Fretboard from './class/Fretboard'; // Adjust path as needed
const NOTES = {
  "C":{
      'natural':'C'
  },
  "C#":{
      'natural':'C#'
  },
  "Db":{
      'natural':'C#'
  },
  "D":{
      'natural':'D'
  },
  "D#":{
      'natural':'D#'
  },
  "Eb":{
      'natural':'D#'
  },
  "E":{
      'natural':'E'
  },
  "F":{
      'natural':'F'
  },
  "F#":{
      'natural':'F#'
  },
  "Gb":{
      'natural':'F#'
  },
  "G":{
      'natural':'G'
  },
  "G#":{
      'natural':'G#'
  },
  "Ab":{
      'natural':'G#'
  },
  "A":{
      'natural':'A'
  },
  "A#":{
      'natural':'A#'
  },
  "Bb":{
      'natural':'A#'
  },
  "B":{
  'natural':'B'
  }
}


class GuitarString {
  constructor(openNote) {
      this.openNote = NOTES[openNote]['natural'];
      this.openNoteIndex = Object.keys(NOTES).indexOf(openNote); // Index of the open note
  }

  sumSemitonesAndReturn(semitones) {
      const notesKeys = Object.keys(NOTES); // List of all notes
      const noteIndex = (this.openNoteIndex + semitones) % notesKeys.length; // Wrap around with modulo
      return notesKeys[noteIndex];
  }
}

class Fretboard {
  constructor(orderedGuitarStringsList) {
      this.strings = orderedGuitarStringsList.map(note => new GuitarString(note));
  }

  getNoteAtPositionForString(stringIndex, fretNum) {
      if (stringIndex < 0 || stringIndex >= this.strings.length) {
          throw new Error("Invalid string index");
      }
      return this.strings[stringIndex].sumSemitonesAndReturn(fretNum);
  }

}
const GuitarScales = () => {
  const [scaleNotes, setScaleNotes] = useState([]);
  const [startingNote, setStartingNote] = useState('E'); // Default starting note
  const [scaleType, setScaleType] = useState('major'); // Default scale type
  const [fretboardData, setFretboardData] = useState(null);

  const STANDARD_TUNING = ['E', 'A', 'D', 'G', 'B', 'E']; // Standard tuning
  const TOTAL_FRETS = 12;

  const handleGenerateFretboard = () => {
    const fretboard = new Fretboard(STANDARD_TUNING);
    const scale = generateScale(startingNote, scaleType);
    setScaleNotes(scale);

    // Highlight notes on the fretboard for the chosen scale
    const fretboardWithNotes = STANDARD_TUNING.map((stringNote, stringIndex) => {
      return Array.from({ length: TOTAL_FRETS }, (_, fret) => {
        const note = fretboard.getNoteAtPositionForString(stringIndex, fret);
        return scale.includes(note) ? note : ''; // Show note if in scale, else empty
      });
    });

    setFretboardData(fretboardWithNotes);
  };

  const generateScale = (root, type) => {
    // Example: Simple major scale intervals
    const majorScaleIntervals = [2, 2, 1, 2, 2, 2, 1]; // Whole-Whole-Half-Whole-Whole-Whole-Half
    const notes = Object.keys(NOTES);
    const rootIndex = notes.indexOf(root);
    const scale = [root];

    let currentIndex = rootIndex;
    for (let interval of majorScaleIntervals) {
      currentIndex = (currentIndex + interval) % notes.length;
      scale.push(notes[currentIndex]);
    }
    return scale;
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Guitar Scales
      </Typography>

      <Box sx={{ mb: 2 }}>
        <TextField
          label="Starting Note"
          value={startingNote}
          onChange={(e) => setStartingNote(e.target.value.toUpperCase())}
          sx={{ mr: 2, width: 120 }}
        />
        <TextField
          label="Scale Type"
          value={scaleType}
          onChange={(e) => setScaleType(e.target.value.toLowerCase())}
          sx={{ mr: 2, width: 120 }}
        />
        <Button variant="contained" onClick={handleGenerateFretboard}>
          Generate
        </Button>
      </Box>

      <Grid container spacing={1}>
        {fretboardData &&
          fretboardData.map((stringNotes, stringIndex) => (
            <Grid item xs={12} key={stringIndex} sx={{ display: 'flex' }}>
              {stringNotes.map((note, fretIndex) => (
                <Box
                  key={fretIndex}
                  sx={{
                    width: 30,
                    height: 30,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #ccc',
                    backgroundColor: note ? '#90caf9' : '#f5f5f5',
                  }}
                >
                  {note}
                </Box>
              ))}
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default GuitarScales;
