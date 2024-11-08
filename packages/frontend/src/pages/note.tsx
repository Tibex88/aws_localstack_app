import React, { useState, useEffect } from "react";
import { Form, Card } from "react-bootstrap";
import { GATEWAY_URL } from "../config.json";
import { DeleteButton, SaveButton } from "./../components";
import { HomeButton, LoadingSpinner,Container } from "../components";
import { useNavigate, useParams } from "react-router-dom";

export const ShowNote = () => {
  const { noteId } = useParams<'noteId'>();
  const [isLoading, setIsLoading] = useState(true);
  const [noteContent, setNoteContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async (noteId: string) => {
      setIsLoading(true);
      const fetchURL = `${GATEWAY_URL}notes/${noteId}`;

      try {
        const response = await fetch(fetchURL);
        const data = await response.json();
        setNoteContent(data.content);
        
      } catch (error) {
        // Navigate to 404 page, as noteId probably not present
        navigate("/404");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNote(noteId || "");
  }, [noteId]);

  return (
    <Container header={<HomeButton />}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <form>
          <Form.Group controlId="content">
            <Form.Label>Note Content</Form.Label>
            <Form.Control
              as="textarea"
              defaultValue={noteContent}
              onChange={(e) => {
                const content = e.currentTarget.value;
                if (content) {
                  setNoteContent(content);
                }
              }}
            />
          </Form.Group>
          <div className="mt-4 d-flex gap-2">
            <SaveButton noteId={noteId || ""} noteContent={noteContent} />
            <DeleteButton noteId={noteId || ""} />
          </div>
        </form>
      )}
    </Container>
  );
};
