import { Button, Card } from "react-bootstrap";
import { LoadingSpinner,Container } from "../components";
import {GATEWAY_URL} from "../config.json";
import { useEffect, useState } from "react";

interface Note {
    noteId: string;
    createdAt: string;
    content: string;
    attachment: boolean;
  }

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
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");


    useEffect(() => {

        const fetchNotes = async () => {
            setIsLoading(true);
            const fetchURL = `${GATEWAY_URL}notes`;

            try {
                const response = await fetch(fetchURL);
                const data = await response.json();
                console.log({data})
                setNotes(data.message);
            } catch (error) {
              if (error instanceof Error) setErrorMsg(`${error.toString()} - ${fetchURL}`);
            } finally {
                setIsLoading(false);
            }
        }
      fetchNotes()
    },[])

    const createNewNote = () => (
        <a key="new" href="note/new">
          <Button variant="primary" className="w-100">
            Create a new note
          </Button>
      </a>
      );

    return (
        <Container header={<div>Your Notes</div>}>
            <div>{renderNotes(notes)}</div>
            {createNewNote()}
        </Container>
    );
}