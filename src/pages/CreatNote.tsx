import CreateForm from "../form/CreateForm"
import type { NoteData, Tag } from "../utils/types";

interface CreatNoteProps {
  onSubmit: (data: NoteData) => void;
  addTag: (tag: Tag) => void;
  availableTags: Tag[];
}

const CreatNote:React.FC<CreatNoteProps> = ({onSubmit,addTag,availableTags}) => {
  return (
    <>
      <h1 className="mb-4">
        Create Note
      </h1>
      <CreateForm onSubmit={onSubmit} addtag={addTag} availableTags={availableTags} />
    </>
  )
}

export default CreatNote
