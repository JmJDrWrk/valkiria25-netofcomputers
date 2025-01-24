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
export default Fretboard

// Example Usage
// const STANDARD_TUNING = ["E", "A", "D", "G", "B", "E"]; // Standard tuning for a guitar

// const fretboard = new Fretboard(STANDARD_TUNING);

// console.log(fretboard.getNoteAtPositionForString(0, 0)); // E (open string)
// console.log(fretboard.getNoteAtPositionForString(0, 5)); // A (5th fret of low E string)
// console.log(fretboard.getNoteAtPositionForString(4, 3)); // D (3rd fret of B string)