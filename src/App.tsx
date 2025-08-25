import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import NoteList from "./pages/NoteList";
import CreatNote from "./pages/CreatNote";
import ShowNote from "./pages/ShowNote";
import EditNote from "./pages/EditNote";
import type { NoteData, RawNote, Tag } from "./utils/types";
import { UseLocalStorage } from "./hooks/UseLocalStorage";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";

import 'bootstrap/dist/css/bootstrap.min.css';
import NoteLayout from "./pages/NoteLayout";

function App() {

  const [note,setNote]=UseLocalStorage<RawNote[]>("NOTES", []);
  const [tag,setTags]=UseLocalStorage<Tag[]>("Tags", []);

  const noteWithTags = useMemo(()=>{
    return note.map(n=>{
      return{
        ...n, tags:tag.filter(t=>n.tagsIds.includes(t.id))
      }
    })
  },[note, tag]);

  function onCreateNote({tags,...data}: NoteData) {
    setNote(prev => {
      return [...prev, {...data,
        id: uuidV4(),
        tagsIds: tags.map(t => t.id),
      }];
    })
  }

  function onUpdateNote(id:string, {tags,...data}: NoteData) {
    setNote(prev => {
      return prev.map(n => {
        if (n.id === id) {
          return {...n,
            ...data,
            tagsIds: tags.map(t => t.id),
          };
        } else {
          return n;
        }
      });
    })
  }

  function deleteNote(id:string) {
    setNote(prev => {
      return prev.filter(t => t.id !== id);
    })
  }

  function onAddTag(tag: Tag) {
    setTags(prev => {
      return [...prev, tag];
    });
  }

  return (
    <Container className=" my-4">
    <Routes>
     <Route path="/" element={<NoteList  availableTags={tag} notes={noteWithTags}/>} />
      <Route path="/create" element={<CreatNote onSubmit={onCreateNote} addTag={onAddTag} availableTags={tag}/>} />
      <Route path="/:id" element={<NoteLayout notes={noteWithTags}/>}>
      <Route index element={<ShowNote onDelete={deleteNote}/>} />
      <Route path="edit" element={<EditNote onSubmit={onUpdateNote} addTag={onAddTag} availableTags={tag}/>} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    </Container>
  )
}

export default App
