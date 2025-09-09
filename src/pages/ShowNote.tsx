import React from "react";
import { Badge, Col, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useNote } from "../utils/useNote";

interface ShowNoteProps {
  onDelete: (id: string) => void;
}

const ShowNote: React.FC<ShowNoteProps> = ({ onDelete }) => {
  const note = useNote();
  const navigate = useNavigate();
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {note.tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to={`/${note.id}/edit`}>
              <button className="btn btn-primary">Edit</button>
            </Link>
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                onDelete(note.id);
                navigate("/");
              }}
            >
              Delete
            </button>
            <Link to="..">
              <button className="btn btn-secondary">Back</button>
            </Link>
          </Stack>
        </Col>
        <div>{note.markdown}</div>
      </Row>
    </>
  );
};

export default ShowNote;
