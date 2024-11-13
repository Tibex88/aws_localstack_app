import React, { useState } from "react";
import { 
   Alert } from "react-bootstrap";
import { GATEWAY_URL } from "../config.json";
import { ButtonSpinner } from "../components";
import { useNavigate } from "react-router-dom";
import {Button} from "./ui/button";

const SaveButton = (props: { noteId: string; noteContent: string }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleSave = async (event: any) => {
    event.preventDefault();
    setIsSaving(true);

    const { noteId, noteContent } = props;
    const updateNoteURL = `${GATEWAY_URL}notes/${noteId}`;

    try {
      await fetch(updateNoteURL, {
        method: "PUT",
        body: JSON.stringify({ content: noteContent }),
      });
      navigate("/");
    } catch (error: any) {
      console.log(error);
      setErrorMsg(`${error.toString()} - ${updateNoteURL} - ${noteContent}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

        <Button 
          onClick={handleSave}
          variant={isSaving ? "ghost" : "default"} >
          {isSaving ? "Saving..." : "Save"}
        </Button>
    </>
  );
};

export { SaveButton };
