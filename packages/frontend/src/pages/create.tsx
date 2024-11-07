import React, { FormEvent, useState } from 'react'
import { Container,HomeButton,ButtonSpinner } from "../components";
import { Form, Button, Alert } from "react-bootstrap";
import {  useNavigate } from 'react-router-dom';
import { GATEWAY_URL } from "../config.json";


export const Create = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const createNoteURL = `${GATEWAY_URL}notes`;

    setIsLoading(true);

    try {
      await fetch(createNoteURL, {
        method: "POST",
        body: JSON.stringify({ content: noteContent }),
      });
      navigate("/");
      } catch (error) {
        if (error instanceof Error) setErrorMsg(`${error.toString()} - ${noteContent}`);
      } finally {
        setIsLoading(false);
    }
  };


  return (
    
    <Container header={<p>Create Note</p>}>
      <form onSubmit={(e)=>{handleSubmit(e)}}>
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
        <Button type="submit" disabled={!noteContent || isLoading} className="w-100">
          {isLoading ? <ButtonSpinner /> : ""}
          {isLoading ? "Creating..." : "Create"}
        </Button>
      </form>
    </Container>
  )
}