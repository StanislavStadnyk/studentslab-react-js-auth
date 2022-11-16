import React, { useState } from "react";
import {
  Button,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

const EditModal = ({ isOpen, toggle, item, onSubmit }) => {
  const [firstNameEdited, editFirstName] = useState("");
  const [lastNameEdited, editLastName] = useState("");

  const handleFirstName = (e) => editFirstName(e.target.value);
  const handleLastName = (e) => editLastName(e.target.value);
  const handleSubmit = () => {
    onSubmit({
      id: item.id,
      firstName: firstNameEdited || item.firstName,
      lastName: lastNameEdited || item.lastName,
      testData: item.testData || false,
    });
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit student 2</ModalHeader>

      <ModalBody>
        <FormGroup>
          <Input defaultValue={item.firstName} onChange={handleFirstName} />
        </FormGroup>
        <Input defaultValue={item.lastName} onChange={handleLastName} />
      </ModalBody>

      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditModal;
