import React, { useState } from 'react';
import { Box, Typography, Grid, Button, TextField } from '@mui/material';
import './fretboard.css'
// import Fretboard from './class/Fretboard'; // Adjust path as needed
const NOTES = {
  "C": {
    'natural': 'C'
  },
  "C#": {
    'natural': 'C#'
  },
  "Db": {
    'natural': 'C#'
  },
  "D": {
    'natural': 'D'
  },
  "D#": {
    'natural': 'D#'
  },
  "Eb": {
    'natural': 'D#'
  },
  "E": {
    'natural': 'E'
  },
  "F": {
    'natural': 'F'
  },
  "F#": {
    'natural': 'F#'
  },
  "Gb": {
    'natural': 'F#'
  },
  "G": {
    'natural': 'G'
  },
  "G#": {
    'natural': 'G#'
  },
  "Ab": {
    'natural': 'G#'
  },
  "A": {
    'natural': 'A'
  },
  "A#": {
    'natural': 'A#'
  },
  "Bb": {
    'natural': 'A#'
  },
  "B": {
    'natural': 'B'
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

  const STANDARD_TUNING = ['E', 'B', 'G', 'D', 'A', 'E']; // Standard tuning
  const TOTAL_FRETS = 22;

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
    <Box sx={{ p: 3, maxWidth: '100%', textAlign: 'center', overflowX: 'auto' }} id="ThisVeryComponent">
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
            <Grid item key={stringIndex}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                // backgroundColor: 'red',
                width: '100%',
                justifyContent: 'space-evenly',
                paddingTop:'0px !important',
                alignItems: 'center'
                // paddingBottom: '10px',
              }}
              id={`string-${stringIndex}`}>
              {stringNotes.map((note, fretIndex) => {
                const fretWidth = `${(100 / (TOTAL_FRETS + 1)) * (TOTAL_FRETS - fretIndex)}%`; // Dynamic width calculation
                return (
                  <>
                    <Box sx={{

                    }}
                      className="fret"></Box>
                    <Box
                      key={fretIndex}
                      className={"fretboardNote"}
                      sx={{
                        width: '35px', // Fixed width for each note
                        height: 35,  // Height for visual representation
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid #ddd',
                        backgroundColor: note ? (fretIndex === 0 ? '#ffcc80' : '#64b5f6') : '#f0f0f0',
                        borderRadius: '5px',
                        boxShadow: note ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
                        transition: 'background-color 0.3s, box-shadow 0.3s',
                        cursor: note ? 'pointer' : 'default',
                        marginLeft: fretIndex === 0 ? 0 : `${Math.log(TOTAL_FRETS - fretIndex + 1) * 5}px`, // Logarithmic spacing
                        // position: 'relative'
                      }}
                      title={note || 'Fret'}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: note ? 'bold' : 'normal',
                          color: note ? '#ffffff' : '#9e9e9e',
                        }}
                      >
                        {note}
                         {/* {fretIndex} */}
                      </Typography>
                    </Box>
                  </>



                );
              })}
            </Grid>
          ))}
      </Grid>
    </Box>
  );


};

export default GuitarScales;
