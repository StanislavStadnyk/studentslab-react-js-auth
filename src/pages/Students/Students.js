import React, { useState } from 'react';
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
} from 'reactstrap';

const Students = ({ list, addUser, editUser, deleteUser }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [editCurrentItem, setEditCurrentItem] = useState('');

  const [firstNameEdited, editFirstName] = useState('');
  const [lastNameEdited, editLastName] = useState('');

  const [isModalShow, setModal] = useState(false);

  const editMode = (id) => {
    setEditCurrentItem(list.find((user) => user.id === id));
    toggleModal();
  };

  const toggleModal = () => setModal(!isModalShow);

  const randomId = parseInt(Math.random(new Date()) * 1000000);

  const isAddStudentValid = !(firstName !== '' && lastName !== '');

  const messagesBlock = (student) => (
    <UncontrolledCollapse
      toggler={`#${student.lastName.replace(/\s/g, '') + student.id}`}
    >
      <div className='mt-3'>
        <p>Messages:</p>
        {student.messages.map((message) => {
          return (
            <Alert color='info' key={message.id}>
              {message.message}
            </Alert>
          );
        })}
      </div>
    </UncontrolledCollapse>
  );

  const studentsList = list.map((student, index) => {
    return (
      <ListGroupItem key={student.id + student.lastName}>
        <div className='d-flex align-items-center'>
          <div
            className='flex-fill'
            id={student.lastName.replace(/\s/g, '') + student.id}
            style={{ cursor: 'pointer' }}
          >
            {index + 1}.{' '}
            <strong>
              {student.firstName} {student.lastName}
            </strong>
          </div>

          <Button
            outline
            color='info'
            size='sm'
            onClick={() => editMode(student.id)}
            className='ml-2'
          >
            Edit
          </Button>

          <Button
            outline
            color='danger'
            size='sm'
            onClick={() => deleteUser(student.id)}
            className='ml-2'
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
        <Button
          color='primary'
          onClick={() => {
            editUser({
              id: editCurrentItem.id,
              firstName: firstNameEdited || editCurrentItem.firstName,
              lastName: lastNameEdited || editCurrentItem.lastName,
              messages: editCurrentItem.messages,
            });
            toggleModal();
          }}
        >
          Save
        </Button>{' '}
        <Button color='secondary' onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );

  return (
    <Card>
      <CardBody>
        <h4 className='mb-4'>Students list</h4>

        <Row>
          <Col md='8'>
            <div style={{ overflowY: 'auto', maxHeight: 500 }}>
              <ListGroup>
                {studentsList.length > 0 ? (
                  studentsList
                ) : (
                  <Alert color='warning'>Empty list!</Alert>
                )}
              </ListGroup>
            </div>
          </Col>

          <Col md='4'>
            <div className='mb-4'>
              <FormGroup>
                <Input
                  name='firstName'
                  id='newFirstName'
                  placeholder='First Name'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Input
                  name='lastName'
                  id='newLastName'
                  placeholder='Last Name'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </FormGroup>

              <Button
                color='success'
                size='sm'
                disabled={isAddStudentValid}
                onClick={() => {
                  addUser({
                    id: randomId,
                    firstName: firstName,
                    lastName: lastName,
                    messages: [],
                  });
                  setFirstName('');
                  setLastName('');
                }}
              >
                Add Student
              </Button>
            </div>
          </Col>
        </Row>

        {modalWindow}
      </CardBody>
    </Card>
  );
};

export default Students;
