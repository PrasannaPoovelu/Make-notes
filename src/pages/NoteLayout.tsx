import React from "react";
import type { Note } from "../utils/types";
import { Navigate, Outlet, useParams } from "react-router-dom";

interface NoteLayoutProps {
  notes: Note[];
}

const NoteLayout: React.FC<NoteLayoutProps> = ({ notes }) => {
  const { id } = useParams();
  const note = notes.find((n) => n.id === id);
  if (note == null) return <Navigate to="/" replace />;
  return <Outlet context={note} />;
};

export default NoteLayout;

