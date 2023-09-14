import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNoteContext } from "./NoteContext";
import "./Home.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
const EditNote = () => {
  const { id } = useParams();
  const { notes, setNotes } = useNoteContext();
  const [editedNote, setEditedNote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const noteToEdit = notes.find((note) => note.id === parseInt(id));

    if (noteToEdit) {
      setEditedNote(noteToEdit);
    }
  }, [notes, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedNote({
      ...editedNote,
      [name]: value,
    });
  };

  const handleSaveChanges = () => {
    const updatedNotes = notes.map((note) =>
      note.id === editedNote.id ? editedNote : note
    );
    setEditedNote(null);

    setNotes(updatedNotes);
    setEditedNote({
      title: "",
      content: "",
      datetime: "",
    });
    navigate("/");
  };

  return (
    <div className="editpage">
      <h1>Edit Note</h1>
      <div className="editbox">
        <Card className="text-center">
          {editedNote && (
            <>
              <Card.Body>
                <Card.Title>
                  {" "}
                  <input
                    className="title"
                    type="text"
                    name="title"
                    value={editedNote.title}
                    onChange={handleInputChange}
                  />
                </Card.Title>
                <Card.Text>
                  <textarea
                    className="content"
                    name="content"
                    value={editedNote.content}
                    onChange={handleInputChange}
                  />
                </Card.Text>
                <Card.Footer>
                  {" "}
                  <input
                    className="datetime"
                    type="datetime-local"
                    name="datetime"
                    value={editedNote.datetime}
                    onChange={handleInputChange}
                  />
                </Card.Footer>
                <Button className="savebtn" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </Card.Body>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default EditNote;
