"use client"
import React, { FormEvent, useState } from 'react'
import { Container,HomeButton,ButtonSpinner } from "../components";
import { Button } from "../components/ui/button";
import { Form,FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import {  Alert } from "react-bootstrap";
import {  useNavigate } from 'react-router-dom';
import { GATEWAY_URL } from "../config.json";
import { Input } from '@/components/ui/input';

import { useForm } from "react-hook-form"



export const Create = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const navigate = useNavigate();
  const form = useForm();


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
      <Form {...form}>
        <form onSubmit={(e)=>{handleSubmit(e)}}>
        <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start typing</FormLabel>
                <FormControl className="col-12">
                  <Input 
                  {...field}
                  placeholder="shadcn" 
                  onChange = {(e) => {
                    let content = e.target.value
                    if (content && content.length < 1000) {
                      setNoteContent(content);
                    }
                    else setErrorMsg("Note content must be less than 1000 characters");
                    }
                    }
                  />
              </FormControl> 
              </FormItem>
            )}
          />  
          <Button 
            type="submit" className="w-100">
            {/* {isLoading ? <ButtonSpinner /> : ""} */}
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </form> 
      </Form> 
    </Container>
  )
}