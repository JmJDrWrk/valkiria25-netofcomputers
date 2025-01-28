import React, { useState } from 'react';
import { Box, Typography, Grid, Button, TextField, Select, MenuItem, FormControl, InputLabel, Menu } from '@mui/material';
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
  const [fretsData, setFretsData] = useState(null);
  const STANDARD_TUNING = ['E', 'B', 'G', 'D', 'A', 'E']; // Standard tuning
  const TOTAL_FRETS = 22;

  const handleGenerateFretboard = () => {
    const fretboard = new Fretboard(STANDARD_TUNING);
    // const scale = generateScale(startingNote, scaleType);
    const scale = getScales(startingNote)[scaleType]


    setScaleNotes(scale);

    // Highlight notes on the fretboard for the chosen scale
    function getNextNotes(startingNote, scale, count = 22) {
      const NOTES = [
        'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
      ];

      const startIndex = NOTES.indexOf(startingNote);
      if (startIndex === -1) {
        throw new Error("Invalid starting note");
      }

      const notes = [];
      for (let i = 0; i < count; i++) {
        const index = (startIndex + i) % NOTES.length; // Use modulo to loop back after 12 notes
        notes.push(NOTES[index]);
      }

      return notes.map(note => {
        if (scale.includes(note)) {
          return note
        } else {
          return note
        }
      });
    }


    const showable_notes_per_string = STANDARD_TUNING.map(eachNote => {
      return getNextNotes(eachNote, scale)
    })



    let _data_ = [['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21']]
    // .concat(showable_notes_per_string)
    console.log('d', showable_notes_per_string)
    setFretboardData(showable_notes_per_string);
    setFretsData(_data_)
  };

  // Function to calculate major and minor scales based on the root note
  function getScales(rootNote) {
    const allNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    // Intervals for major and minor scales (in semitones)
    const majorIntervals = [2, 4, 5, 7, 9, 11, 12]; // Major scale pattern
    const minorIntervals = [2, 3, 5, 7, 8, 10, 12]; // Minor scale pattern

    // Find the index of the root note in the allNotes array
    const rootIndex = allNotes.indexOf(rootNote);

    // Generate the major scale
    const majorScale = majorIntervals.map(interval => allNotes[(rootIndex + interval) % 12]);

    // Generate the minor scale
    const minorScale = minorIntervals.map(interval => allNotes[(rootIndex + interval) % 12]);

    return {
      major: majorScale,
      minor: minorScale
    };
  }

  const handleNoteClick = (e) => {
    let note = ''
    console.log('e', e.target.id)
    if (e.target.id == 'missclick') {
      note = e.target.parentElement.id
      console.log('note I ', e.target.parentElement.id)

      if (scaleNotes.includes(note)) {
        e.target.parentElement.style.opacity = e.target.parentElement.style.opacity === '1' ? '1' : '1';
        e.target.parentElement.style.backgroundColor = e.target.parentElement.style.backgroundColor == "rgb(80, 177, 104)" ?  '#64b5f6' : 'rgb(80, 177, 104)';
      } else {
        e.target.parentElement.style.opacity = e.target.parentElement.style.opacity === '1' ? '0' : '1';
        e.target.parentElement.style.backgroundColor = 'rgb(177, 80, 80)';
      }

    } else {
      note = e.target.id
      console.log('note II ', e.target.id)

      if (scaleNotes.includes(note)) {
        e.target.style.opacity = e.target.style.opacity === '1' ? '1' : '1';
        e.target.style.backgroundColor = e.target.style.backgroundColor == "rgb(80, 177, 104)" ?  '#64b5f6' : 'rgb(80, 177, 104)';
      } else {
        e.target.style.opacity = e.target.style.opacity === '1' ? '0' : '1';
        e.target.style.backgroundColor = 'rgb(177, 80, 80)';
      }

    }




  }

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
        {/* <TextField
          label="Scale Type"
          value={scaleType}
          onChange={(e) => setScaleType(e.target.value.toLowerCase())}
          sx={{ mr: 2, width: 120 }}
        /> */}
        <FormControl sx={{ mr: 2, width: 120 }}>
          <InputLabel>Scale Type</InputLabel>
          <Select
            value={scaleType}
            onChange={(e) => setScaleType(e.target.value)}
          >
            <MenuItem value="major">Major</MenuItem>
            <MenuItem value="minor">Minor</MenuItem>
            <MenuItem value="empty">Empty</MenuItem>
            <MenuItem value="pentatonic">Pentatonic</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleGenerateFretboard}>
          Generate
        </Button>
      </Box>
      {/* FRET NUMBERS */}
      <Grid container spacing={1}>
        {fretsData &&
          fretsData.map((stringNotes, stringIndex) => (
            <Grid item key={stringIndex}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                // backgroundColor: 'red',
                width: '100%',
                justifyContent: 'space-evenly',
                paddingTop: '0px !important',
                alignItems: 'center'
                // paddingBottom: '10px',
              }}
            // id={`string-${stringIndex}`}
            >
              {stringNotes.map((note, fretIndex) => {
                const fretWidth = `${(100 / (TOTAL_FRETS + 1)) * (TOTAL_FRETS - fretIndex)}%`; // Dynamic width calculation
                return (
                  <>
                    <Box sx={{

                    }}
                      className="unvisiblefret"></Box>
                    <Box
                      key={fretIndex}
                      className={"fretNumber"}
                      id={`fretNm-${fretIndex}`}
                      sx={{
                        width: '35px', // Fixed width for each note
                        height: 35,  // Height for visual representation
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid #ddd',
                        backgroundColor: note ? (fretIndex === 0 ? '#ffcc80' : '#64b5f6') : '#f0f0f0',
                        borderRadius: '30px',
                        boxShadow: note ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
                        transition: 'background-color 0.3s, box-shadow 0.3s',
                        cursor: note ? 'pointer' : 'default',
                        marginLeft: fretIndex === 0 ? 0 : `${Math.log(TOTAL_FRETS - fretIndex + 1) * 5}px`, // Logarithmic spacing
                        // position: 'relative'
                        // opacity: scaleNotes[note] ? 1 : 0, // Opacity set to 100% if note is present, 20% if not
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
      {/* NOTES */}
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
                paddingTop: '0px !important',
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
                      id={note}
                      sx={{
                        width: '35px', // Fixed width for each note
                        height: 35,  // Height for visual representation
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid #ddd',
                        backgroundColor: note ? (fretIndex === 0 ? '#ffcc80' : '#64b5f6') : '#f0f0f0',
                        borderRadius: '30px',
                        boxShadow: note ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
                        transition: 'background-color 0.3s, box-shadow 0.3s',
                        cursor: note ? 'pointer' : 'default',
                        marginLeft: fretIndex === 0 ? 0 : `${Math.log(TOTAL_FRETS - fretIndex + 1) * 5}px`, // Logarithmic spacing
                        // position: 'relative'
                        opacity: scaleNotes.includes(note) ? 1 : 0 // Opacity set to 100% if note is present, 20% if not
                      }}
                      title={note || 'Fret'}
                      onClick={handleNoteClick}
                    >
                      <Typography
                        variant="body2"
                        id="missclick"
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
