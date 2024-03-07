
// Helper function to get the root note of a chord
function getRootNote(note) {
  let i = 0;
  for (let char of note) {
    if ((char === "#" || char === "b") && (i === 1)) {
        return note.substring(0,2);
    }
    ++i;
  }
    return note.substring(0,1);
}

// Helper function to get the part after the root note
function getNoteExtension(note) {
  let len = getRootNote(note).length;
  return note.substring(len, note.length);
}

// Helper function to strip the {title: } part away from the song title
function getTitle(title) {
  return title.substring(8,title.length-1);
}

// Helper function that takes in a root note as a parameter and transposes it
function getTransposedNote(note) {
  let main_chords = ["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"];
  let alt_chords = ["A","Ab","B","C","Db","D","Eb","E","F","Gb","G","Ab"]
  note = getRootNote(note);
  for (let i = 0; i < main_chords.length; ++i) {
    if (note === main_chords[i]) {
      if (i + transposedByNSemitones > 11 || i + transposedByNSemitones < 0) {
        let result = i + transposedByNSemitones;
        result = (result % 12 + 12) % 12;
        return main_chords[result];
      }
      return main_chords[i + transposedByNSemitones];
    }
    if (note === alt_chords[i]) {
      if (i + transposedByNSemitones > 11 || i + transposedByNSemitones < 0) {
        let result = i + transposedByNSemitones;
        result = (result % 12 + 12) % 12;
        return main_chords[result];
      }
      return alt_chords[i + transposedByNSemitones];
    }
  }
}

// Translates chord pro format into a readable format
function parseChordProFormat(chordProLinesArray) {
    //parse the song lines with embedded
    //chord pro chords and add them to DOM

    let textDiv = document.getElementById("text-area")
    textDiv.innerHTML = '';

    for (let i = 0; i < chordProLinesArray.length; i++) {
        let line = chordProLinesArray[i];
        if (line === "" && (i !== chordProLinesArray.length-1)) {
          ++i;
          line = chordProLinesArray[i];
        }
        let lyrics = "";
        let chords = "";
        let readingChord = false;
        for (let char of line) {
            if (char === "[") {
              readingChord = true;
            }
            else if (char === "]") {
              readingChord = false;
            }
            if (readingChord && char !== "[" && char !== "]") {
              chords+=char
            }
            else if (readingChord === false && char !== "]") {
              lyrics+=char
              chords+=" "
            }
        }
        if (transposedByNSemitones !== 0) {

          let indice = 0;
          let start = 0;
          let end = 0;
          let reading = false;
          let t_chords = "";
          for (let char of chords) {
            if (char !== " ") {
              if (reading === false) {
                start = indice;
                reading = true;
              }
            }
            else {
              t_chords+=" ";
              if (reading === true) {
                let substring = "";
                end = indice;
                substring+=chords.substring(start,end);
                reading = false;
                t_chords+=getTransposedNote(getRootNote(substring))+getNoteExtension(substring);
              }
            }
            ++indice;
          }
          chords = t_chords;
          if (lyrics.substring(0,1) === "{") {
            textDiv.innerHTML += `<h1> ${getTitle(lyrics)} </h1>`;
          }
          else {
            textDiv.innerHTML += `<pre> <chord_transposed>${chords}</chord_transposed> <br> ${lyrics} </pre>`;
          }
        }
        else {
          if (lyrics.substring(0,1) === "{") {
            textDiv.innerHTML += `<h1> ${getTitle(lyrics)} </h1>`;
          }
          else {
            textDiv.innerHTML += `<pre><chord>${chords}</chord> <br> ${lyrics} </pre>`;
          }
        }
    }
  }