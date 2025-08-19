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

  function onAddTag(tag: Tag) {
    setTags(prev => {
      return [...prev, tag];
    });
  }

  return (
    <Container className=" my-4">
    <Routes>
     <Route path="/" element={<NoteList />} />
      <Route path="/create" element={<CreatNote onSubmit={onCreateNote} addTag={onAddTag} availableTags={tag}/>} />
      <Route path="/:id">
      <Route index element={<ShowNote />} />
      <Route path="edit" element={<EditNote />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    </Container>
  )
}

export default App
