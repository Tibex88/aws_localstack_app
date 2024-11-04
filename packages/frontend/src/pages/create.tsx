import React, { FormEvent, useState } from 'react'
import { Container,HomeButton,ButtonSpinner } from "../components";
import { Form, Button, Alert } from "react-bootstrap";



export const Create = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      alert(noteContent)
      setIsLoading(true);
      } catch (error) {
        setErrorMsg(`${error.toString()} - ${noteContent}`);
      } finally {
        setIsLoading(false);
    }
  };


  return (
    <Container header={<p>Create Note</p>}>
      <form onSubmit={handleSubmit}>
        {/* {errorMsg && <Alert variant="danger">{errorMsg}</Alert>} */}
        <Form.Group controlId="content">
          <Form.Label>Note Content</Form.Label>
          <Form.Control
            as="textarea"
            placeholder={"Enter Note content"}
            onChange={(e) => {
              const content = e.currentTarget.value;
              if (content) {
                setNoteContent(content);
              }
            }}
          />
        </Form.Group>
        <Button type="submit" disabled={!noteContent || isLoading} block>
          {isLoading ? <ButtonSpinner /> : ""}
          {isLoading ? "Creating..." : "Create"}
        </Button>
      </form>
    </Container>
  )
}