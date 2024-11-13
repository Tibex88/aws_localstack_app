import React, { useState, useEffect } from "react";
import {  Card } from "react-bootstrap";
import { Form,FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form";
import { Input } from '@/components/ui/input';

import { GATEWAY_URL } from "../config.json";
import { DeleteButton, SaveButton } from "./../components";
import { HomeButton, LoadingSpinner,Container } from "../components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const NavigateHome = () => {


  const location = useLocation();
  const absolutePath = location.pathname; // This gives you the current absolute path  
  const [_,b,c] = absolutePath.split('/');

  return (
  <>
      <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbPage>{b}</BreadcrumbPage>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbPage>{c}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </>
  )
}

export const ShowNote = () => {
  const { noteId } = useParams<'noteId'>();
  const [isLoading, setIsLoading] = useState(true);
  const [noteContent, setNoteContent] = useState("");
  const navigate = useNavigate();
  const form = useForm()

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
    <Container header={<NavigateHome />}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Form {...form}>
          <form>
          <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Edit note</FormLabel>
                    <FormControl className="col-12">
                      <Input 
                      {...field}
                      placeholder="shadcn"
                      value=  {noteContent}
                      onChange={(e) => {
                        const content = e.currentTarget.value;
                        if (content) {
                          setNoteContent(content);
                        }
                      }
                        }
                      />
                  </FormControl> 
                </FormItem>
              )}
          />  

            <div className="mt-4 d-flex gap-2">
              <SaveButton noteId={noteId || ""} noteContent={noteContent} />
              <DeleteButton noteId={noteId || ""} />
            </div>
          </form>
        </Form>
      )}
    </Container>
  );
 }; 
