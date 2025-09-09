import React from "react";
import { Col, Form, Modal, Row, Stack } from "react-bootstrap";
import type { Tag } from "../utils/types";

interface EditTagsModalProps {
  availableTags: Tag[];
  show: boolean;
  handleClose: () => void;
  onUpdate: (id: string, label: string) => void;
  onDelete: (id: string) => void;
}

const EditTagsModal: React.FC<EditTagsModalProps> = ({
  availableTags,
  show,
  handleClose,onUpdate,onDelete
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map((tag) => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control
                    type="text"
                    value={tag.label}
                    onChange={e => onUpdate(tag.id,e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <button className="btn btn-danger" onClick={()=>onDelete(tag.id)}>&times;</button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditTagsModal;
