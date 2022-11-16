import React from "react";
import { BsInfoCircle } from "react-icons/bs";
import { Button, ListGroupItem } from "reactstrap";

import Messages from "../Messages/Messages";

const ListItem = ({ index, item, onEdit, onRemove }) => {
  const student = item;
  const { id, firstName, lastName, testData, editableByAdmin } = item;

  return (
    <ListGroupItem key={id + lastName}>
      <div className="d-flex align-items-center">
        <div
          className="flex-fill"
          id={`student-${lastName.replace(/\s/g, "") + id}`}
          style={{ cursor: "pointer" }}
        >
          {index + 1}.{" "}
          <strong>
            {firstName} {lastName}
          </strong>
          {testData && (
            <span className="ml-3 d-inline-block">
              <BsInfoCircle id="UncontrolledTooltipExample" />
            </span>
          )}
        </div>

        <Button
          outline
          color="info"
          size="sm"
          onClick={() => onEdit(id)}
          className="ml-2"
          disabled={editableByAdmin}
        >
          Edit
        </Button>

        <Button
          outline
          color="danger"
          size="sm"
          onClick={() => onRemove(student)}
          className="ml-2"
          disabled={editableByAdmin}
        >
          Remove
        </Button>
      </div>

      <Messages student={student} />
    </ListGroupItem>
  );
};

export default ListItem;
