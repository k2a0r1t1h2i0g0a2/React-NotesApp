import React, { createContext, useContext, useState } from "react";

const NoteContext = createContext();

export function useNoteContext() {
  return useContext(NoteContext);
}

export function NoteProvider({ children }) {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }
  function deleteNote(noteId) {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote }}>
      {children}
    </NoteContext.Provider>
  );
}
