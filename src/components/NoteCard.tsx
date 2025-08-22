import { Badge, Card, Stack } from "react-bootstrap";
import type { CardList } from "../utils/types";
import { Link } from "react-router-dom";
import style from "./NoteCard.module.css"; // Assuming you have a CSS module for styles

const NoteCard = ({ id, title, tags }: CardList) => {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-100 text-reset text-decoration-none ${style.card}`}
    >
      <Card.Body>
        <Stack gap={2} className="align-items-center justify-content-center h-100">
            <span className="fs-5">{title}</span>
            {tags.length > 0 && (
              <Stack
                gap={1}
                direction="horizontal"
                className="justify-content-center flex-wrap"
              >
                {tags.map((tag) => (
                  <Badge className="text-truncate" key={tag.id}>
                    {tag.label}
                  </Badge>
                ))}
              </Stack>
            )}
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default NoteCard;
