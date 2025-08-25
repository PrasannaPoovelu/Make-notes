import CreateForm from "../form/CreateForm";
import type { NoteData, Tag } from "../utils/types";
import { useNote } from "./NoteLayout";

interface EditNoteProps {
  onSubmit: (id: string, data: NoteData) => void;
  addTag: (tag: Tag) => void;
  availableTags: Tag[];
}

const EditNote: React.FC<EditNoteProps> = ({
  onSubmit,
  addTag,
  availableTags,
}) => {
  const note = useNote();
  return (
    <>
      <h1 className="mb-4">Edit Note</h1>
      <CreateForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        addtag={addTag}
        availableTags={availableTags}
      />
    </>
  );
};

export default EditNote;
