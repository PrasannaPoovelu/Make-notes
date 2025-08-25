import { useRef, useState, type FormEvent } from "react";
import { Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import type { NoteData, Tag } from "../utils/types";
import { v4 as uuidV4 } from "uuid";

interface CreateFormProps extends Partial<NoteData> {
  onSubmit: (data: NoteData) => void;
  addtag: (tag: Tag) => void;
  availableTags: Tag[];
}

const CreateForm: React.FC<CreateFormProps> = ({
  onSubmit,
  addtag,
  availableTags,title="", markdown="", tags=[]
}) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate()

  const [selectValue, setSelectValue] = useState<Tag[]>(tags);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: titleRef.current?.value || "",
      markdown: markRef.current?.value || "",
      tags: selectValue,
    });
    navigate("..");
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
          <Row>
            <Col>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control ref={titleRef} required defaultValue={title}/>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="tags">
                <Form.Label>Tags</Form.Label>
                <CreatableSelect
                  isMulti
                  onCreateOption={(lable) => {
                    const newTag = { id: uuidV4(), label: lable };
                    addtag(newTag);
                    setSelectValue((prev) => [...prev, newTag]);
                  }}
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
          <Form.Group controlId="markdown">
            <Form.Label>Body</Form.Label>
            <Form.Control required as="textarea" rows={15} ref={markRef} defaultValue={markdown} />
          </Form.Group>
          <Stack direction="horizontal" gap={2} className="justify-content-end">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <Link to="..">
              <button type="button" className="btn btn-secondary">
                Cancel
              </button>
            </Link>
          </Stack>
        </Stack>
      </Form>
    </>
  );
};

export default CreateForm;
