import React, { useState } from "react";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import { NoteProvider } from "./components/NoteContext";
import EditNote from "./components/EditNote";
import { generateUniqueId } from "./components/GenerateId";

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: generateUniqueId([]),
      title: "Note 1",
      content: "Content 1",
      datetime: "2023-09-14T10:00",
    },
  ]);
  const handleAddNote = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  return (
    <div>
      <NoteProvider notes={notes} setNotes={setNotes}>
        <div>
          <Routes>
            <Route
              path="/"
              element={<Home notes={notes} handleAddNote={handleAddNote} />}
            />
            <Route
              path="/edit/:id"
              element={<EditNote notes={notes} setNotes={setNotes} />}
            />
          </Routes>
        </div>
      </NoteProvider>
    </div>
  );
};

export default App;
