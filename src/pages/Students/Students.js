import React, { useState } from "react";
import {
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button,
  FormGroup,
  Input,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledCollapse,
  Alert,
  UncontrolledTooltip,
} from "reactstrap";
import { BsInfoCircle } from "react-icons/bs";
import Loader from "../../components/Loader/Loader";
import { ConfirmationModal } from "../../components/modals";

const Students = ({
  list,
  isLoading,
  addStudent,
  editStudent,
  deleteStudent,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [editCurrentItem, setEditCurrentItem] = useState("");
  const [deleteCurrenItem, setDeleteCurrentItem] = useState(null);

  const [firstNameEdited, editFirstName] = useState("");
  const [lastNameEdited, editLastName] = useState("");

  const [isModalShow, setModal] = useState(false);
  const [isConfirmationModalShow, setConfirmationModal] = useState(false);

  const editMode = (id) => {
    setEditCurrentItem(list.find((user) => user.id === id));
    toggleModal();
  };

  const toggleModal = () => setModal(!isModalShow);

  const isAddStudentValid = !(firstName !== "" && lastName !== "");

  const messagesBlock = (student) => (
    <UncontrolledCollapse
      toggler={`#student-${student.lastName.replace(/\s/g, "") + student.id}`}
    >
      <div className="mt-3">
        {student.messages?.length > 0 ? (
          <>
            <p>Messages:</p>
            {student.messages.map((message) => {
              return (
                <Alert color="info" key={message.id}>
                  {message.message}
                </Alert>
              );
            })}
          </>
        ) : (
          <p>No messages yet!</p>
        )}
      </div>
    </UncontrolledCollapse>
  );

  const handleToggleConfirmationModal = () => {
    setConfirmationModal(!isConfirmationModalShow);
  };

  const handleSubmitConfirmationModal = () => {
    deleteStudent(deleteCurrenItem);
    handleToggleConfirmationModal();
  };

  const onDeleteStudent = (student) => {
    setDeleteCurrentItem(student);
    handleToggleConfirmationModal();
  };

  const studentsList = list.map((student, index) => {
    return (
      <ListGroupItem key={student.id + student.lastName}>
        <div className="d-flex align-items-center">
          <div
            className="flex-fill"
            id={`student-${student.lastName.replace(/\s/g, "") + student.id}`}
            style={{ cursor: "pointer" }}
          >
            {index + 1}.{" "}
            <strong>
              {student.firstName} {student.lastName}
            </strong>
            {student?.testData && (
              <span className="ml-3 d-inline-block">
                <BsInfoCircle id="UncontrolledTooltipExample" />
              </span>
            )}
          </div>

          <Button
            outline
            color="info"
            size="sm"
            onClick={() => editMode(student.id)}
            className="ml-2"
            disabled={student.editableByAdmin}
          >
            Edit
          </Button>

          <Button
            outline
            color="danger"
            size="sm"
            onClick={() => onDeleteStudent(student)}
            className="ml-2"
            disabled={student.editableByAdmin}
          >
            Remove
          </Button>
        </div>

        {messagesBlock(student)}
      </ListGroupItem>
    );
  });

  const modalWindow = (
    <Modal isOpen={isModalShow} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Edit student</ModalHeader>

      <ModalBody>
        <FormGroup>
          <Input
            defaultValue={editCurrentItem.firstName}
            onChange={(e) => editFirstName(e.target.value)}
          />
        </FormGroup>
        <Input
          defaultValue={editCurrentItem.lastName}
          onChange={(e) => editLastName(e.target.value)}
        />
      </ModalBody>

      <ModalFooter>
        <Button color="secondary" onClick={toggleModal}>
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={() => {
            editStudent({
              id: editCurrentItem.id,
              firstName: firstNameEdited || editCurrentItem.firstName,
              lastName: lastNameEdited || editCurrentItem.lastName,
              testData: editCurrentItem.testData || false,
              messages: editCurrentItem.messages || [],
            });
            toggleModal();
          }}
        >
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );

  return (
    <Card>
      <CardBody>
        <h4 className="mb-4">
          Students list{" "}
          <em style={{ fontSize: 14 }}>(scroll down for more records)</em>
        </h4>

        <Row>
          <Col md="8">
            <div style={{ overflowY: "auto", maxHeight: 500 }}>
              <Loader isLoading={isLoading}>
                <ListGroup>
                  {studentsList.length > 0 ? (
                    studentsList
                  ) : (
                    <Alert color="warning">Empty list!</Alert>
                  )}
                </ListGroup>
              </Loader>
            </div>
          </Col>

          <Col md="4">
            <div className="mb-4">
              <FormGroup>
                <Input
                  name="firstName"
                  id="newFirstName"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Input
                  name="lastName"
                  id="newLastName"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormGroup>

              <Button
                color="success"
                size="sm"
                disabled={isAddStudentValid}
                onClick={() => {
                  addStudent({
                    firstName,
                    lastName,
                    messages: [],
                  });
                  setFirstName("");
                  setLastName("");
                }}
              >
                Add Student
              </Button>
            </div>
          </Col>
        </Row>

        {modalWindow}
        {tooltip}

        <ConfirmationModal
          isOpen={isConfirmationModalShow}
          title="Are you sure?"
          toggle={handleToggleConfirmationModal}
          onSubmit={handleSubmitConfirmationModal}
        />
      </CardBody>
    </Card>
  );
};

const tooltip = (
  <UncontrolledTooltip placement="top" target="UncontrolledTooltipExample">
    This is a test data, it returns back after page refreshing!
  </UncontrolledTooltip>
);

export default Students;
