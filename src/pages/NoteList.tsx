import { useMemo, useState } from "react";
import { Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import Select from "react-select";
import type { CardList, Tag } from "../utils/types";
import NoteCard from "../components/NoteCard";

interface NoteListProps {
  availableTags: Tag[];
  notes: CardList[];
}

const NoteList: React.FC<NoteListProps> = ({ availableTags, notes }) => {
  const [selectValue, setSelectValue] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesTitle =
        title === "" || note.title.toLowerCase().includes(title.toLowerCase());
      const matchesTags =
        selectValue.length === 0 ||
        selectValue.every((tag) =>
          note.tags.some((nTag) => nTag.id === tag.id)
        );
      return matchesTitle && matchesTags;
    });
  }, [title, selectValue, notes]); 
  return (
    <>
      <Row className="mb-4 align-items-center">
        <Col>
          <h1>NoteList</h1>
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to="/create">
              <button className="btn btn-primary">Create</button>
            </Link>
            <button className="btn btn-secondary">Edit</button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <Select
                isMulti
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                value={selectValue.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tag) => {
                  setSelectValue(
                    tag.map((t) => {
                      return { id: t.value, label: t.label };
                    })
                  );
                }}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} md={2} lg={3} className="g-3">
        {filteredNotes.map(note=>(
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default NoteList;
