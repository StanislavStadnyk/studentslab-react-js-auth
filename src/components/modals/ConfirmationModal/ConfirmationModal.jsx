import React from "react";
import { Button, Modal, ModalFooter, ModalHeader } from "reactstrap";

const ConfirmationModal = ({ isOpen, toggle, onSubmit, title }) => (
  <Modal isOpen={isOpen} toggle={toggle}>
    <ModalHeader toggle={toggle}>{title}</ModalHeader>
    <ModalFooter>
      <Button color="secondary" onClick={toggle}>
        Cancel
      </Button>
      <Button color="primary" onClick={onSubmit}>
        Confirm
      </Button>
    </ModalFooter>
  </Modal>
);

export default ConfirmationModal;
