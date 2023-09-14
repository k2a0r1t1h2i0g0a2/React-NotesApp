import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Home.css";
import Card from "react-bootstrap/Card";
import { useNoteContext } from "./NoteContext";
import { Link } from "react-router-dom";
import { generateUniqueId } from "./GenerateId";


const Home = ({ handleAddNote }) => {
  const { notes, addNote, setNotes } = useNoteContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [datetime, setDatetime] = useState("");
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleDatetimeChange = (e) => {
    setDatetime(e.target.value);
  };
  const confirmDelete = (note) => {
    setNoteToDelete(note);
    setShowConfirmation(true);
  };

  const handleDeleteNote = () => {
    if (noteToDelete) {
      const updatedNotes = notes.filter((note) => note.id !== noteToDelete.id);
      setNotes(updatedNotes);
      console.log("Updated notes:", updatedNotes);
      setNoteToDelete(null);
    }
    setShowConfirmation(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newNote = {
      id: generateUniqueId(notes),
      title,
      content,
      datetime,
    };
    addNote(newNote);
    setTitle("");
    setContent("");
    setDatetime("");
  };

  return (
    <div>
      <Container>
        <Row>
          <Col sm={4} className="sidebar">
            {" "}
            <h1>Notes App</h1>
            <button className="note">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32 "
                fill="none"
              >
                <mask
                  id="mask0_203_5"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="32"
                  height="32"
                >
                  <rect width="32" height="32" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_203_5)">
                  <path
                    d="M10.6666 24H21.3333V21.3333H10.6666V24ZM10.6666 18.6667H21.3333V16H10.6666V18.6667ZM7.99998 29.3333C7.26665 29.3333 6.63887 29.0722 6.11665 28.55C5.59442 28.0278 5.33331 27.4 5.33331 26.6667V5.33332C5.33331 4.59999 5.59442 3.97221 6.11665 3.44999C6.63887 2.92777 7.26665 2.66666 7.99998 2.66666H18.6666L26.6666 10.6667V26.6667C26.6666 27.4 26.4055 28.0278 25.8833 28.55C25.3611 29.0722 24.7333 29.3333 24 29.3333H7.99998ZM17.3333 12V5.33332H7.99998V26.6667H24V12H17.3333Z"
                    fill="#F5F5F5"
                  />
                </g>
              </svg>{" "}
              Notes
            </button>
          </Col>
          <Col className="notebar" sm={8}>
            <div className="noteflex">
              <Card className="text-center">
                <Card.Header> Add Note</Card.Header>
                <form onSubmit={handleSubmit}>
                  <Card.Body>
                    <Card.Title>
                      {" "}
                      <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        required
                        placeholder="Title"
                      />
                    </Card.Title>
                    <Card.Text>
                      <textarea
                        value={content}
                        onChange={handleContentChange}
                        required
                        placeholder="Take a Note...."
                      />
                    </Card.Text>
                    <Card.Footer className="text-muted">
                      <input
                        type="datetime-local"
                        value={datetime}
                        onChange={handleDatetimeChange}
                        required
                      />
                    </Card.Footer>
                    <button
                      className="addbtn"
                      type="submit"
                      onClick={handleAddNote}
                    >
                      Add Note
                    </button>
                  </Card.Body>{" "}
                </form>
              </Card>{" "}
            </div>
            <h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32 "
                fill="none"
              >
                <mask
                  id="mask0_203_5"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="32"
                  height="32"
                >
                  <rect width="32" height="32" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_203_5)">
                  <path
                    d="M10.6666 24H21.3333V21.3333H10.6666V24ZM10.6666 18.6667H21.3333V16H10.6666V18.6667ZM7.99998 29.3333C7.26665 29.3333 6.63887 29.0722 6.11665 28.55C5.59442 28.0278 5.33331 27.4 5.33331 26.6667V5.33332C5.33331 4.59999 5.59442 3.97221 6.11665 3.44999C6.63887 2.92777 7.26665 2.66666 7.99998 2.66666H18.6666L26.6666 10.6667V26.6667C26.6666 27.4 26.4055 28.0278 25.8833 28.55C25.3611 29.0722 24.7333 29.3333 24 29.3333H7.99998ZM17.3333 12V5.33332H7.99998V26.6667H24V12H17.3333Z"
                    fill="#203562"
                  />
                </g>
              </svg>
              My Notes
            </h1>
            <div className="note-list">
              {notes.map((note) => (
                <li key={note.id} className="note-card">
                  <div className="icons">
                    <h3>{note.title} </h3>{" "}
                    <div className="twoicons">
                      {" "}
                      <Link to={`/edit/${note.id}`}>
                        <button>
                          {" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <mask
                              id="mask0_203_47"
                              style={{ maskType: "alpha" }}
                              maskUnits="userSpaceOnUse"
                              x="0"
                              y="0"
                              width="24"
                              height="24"
                            >
                              <rect width="24" height="24" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_203_47)">
                              <path
                                d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z"
                                fill="#203562"
                              />
                            </g>
                          </svg>{" "}
                        </button>
                      </Link>
                      <button onClick={() => confirmDelete(note)}>
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <mask
                            id="mask0_203_51"
                            style={{ maskType: "alpha" }}
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="24"
                            height="24"
                          >
                            <rect width="24" height="24" fill="#D9D9D9" />
                          </mask>
                          <g mask="url(#mask0_203_51)">
                            <path
                              d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z"
                              fill="#203562"
                            />
                          </g>
                        </svg>{" "}
                      </button>
                    </div>
                  </div>
                  <h4>{note.content}</h4>
                  <p> {note.datetime}</p>
                </li>
              ))}
            </div>

            {showConfirmation && (
              <div className="confirm-dialog">
                <p>Are you sure you want to delete this note?</p>
                <button onClick={handleDeleteNote}>Yes</button>
                <button onClick={() => setShowConfirmation(false)}>No</button>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
