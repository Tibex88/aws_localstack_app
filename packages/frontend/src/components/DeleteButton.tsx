import React, { useState } from "react";
import { 
  // Button,
   Alert } from "react-bootstrap";
import {Button} from "./ui/button";
import { GATEWAY_URL } from "../config.json";
import { ButtonSpinner } from "../components";
import { useNavigate } from "react-router-dom";

const DeleteButton = (props: { noteId: string }) => {
  const { noteId } = props;
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleDelete = async (event: any) => {
    event.preventDefault();
    setIsDeleting(true);

    const deleteNoteURL = `${GATEWAY_URL}notes/${noteId}`;

    try {
    
      await fetch(deleteNoteURL, {
        method: "DELETE",
      });
      navigate("/");
    } catch (error: any) {
      setErrorMsg(`${error.toString()} - ${deleteNoteURL} - ${noteId}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
      <Button
        variant="destructive"
        onClick={handleDelete}
      >
        {isDeleting ? "Deleting" : "Delete"}
      </Button>
    </>
  );
};

export { DeleteButton };
