import { useOutletContext } from "react-router-dom";
import type { Note } from "./types";

export function useNote() {
  return useOutletContext<Note>();
}