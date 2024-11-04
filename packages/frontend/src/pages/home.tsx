import { Card } from "react-bootstrap";
import { LoadingSpinner,Container } from "../components";
import { useEffect } from "react";

interface Note {
    noteId: string;
    createdAt: string;
    content: string;
    attachment: boolean;
  }

const dummyNotes: Note[] = [
    {
        noteId: "1",
        createdAt: "2023-01-01T12:00:00.000Z",
        content: "This is a dummy note.",
        attachment: false,
    },
    {
        noteId: "2",
        createdAt: "2023-01-02T12:00:00.000Z",
        content: "This is another dummy note.",
        attachment: true,
    },
    {
        noteId: "3",
        createdAt: "2023-01-03T12:00:00.000Z",
        content: "This is a third dummy note.",
        attachment: false,
    },
];

const renderNotes = (notes: Note[]) =>
    notes.map((note) => (
      <a key={note.noteId} href={`/notes/${note.noteId}`}>
        <Card>
          <Card.Body>
            <Card.Title>
              {note.attachment && (
                <span role="img" aria-label="attachment" className="mr-1">
                  📎
                </span>
              )}
              {note.content}
            </Card.Title>
            <Card.Subtitle className="text-muted">
              Created: {new Date(parseInt(note.createdAt)).toLocaleString()}
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </a>
    ));


export const Home = () => {
    useEffect(() => {
      renderNotes(dummyNotes)  
    },[])
    return (
        <Container header={<div>Your Notes</div>}>
        <div>{renderNotes(dummyNotes)}</div>
        </Container>
    );
}