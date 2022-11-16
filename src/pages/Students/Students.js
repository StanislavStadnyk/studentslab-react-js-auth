import React, { useState } from "react";
import { Card, CardBody, ListGroup, Row, Col, Alert } from "reactstrap";

import Loader from "../../components/Loader/Loader";
import { ConfirmationModal } from "../../components/modals";
import EditModal from "./components/EditModal/EditModal";
import Tooltip from "./components/Tooltip/Tooltip";
import Search from "./components/Search/Search";
import Add from "./components/Add/Add";
import ListItem from "./components/ListItem/ListItem";
import Header from "./components/Header/Header";

const Students = ({
  list,
  isLoading,
  isDataLoading,
  addStudent,
  editStudent,
  deleteStudent,
}) => {
  const [editCurrentItem, setEditCurrentItem] = useState("");
  const [deleteCurrenItem, setDeleteCurrentItem] = useState(null);

  const [isEditModal, setEditModal] = useState(false);
  const [isConfirmationModalShow, setConfirmationModal] = useState(false);

  const [searchValue, setSearchValue] = useState("");

  const toggleEditModal = () => setEditModal(!isEditModal);
  const toggleConfirmationModal = () =>
    setConfirmationModal(!isConfirmationModalShow);

  const handleEditModal = (id) => {
    setEditCurrentItem(list.find((user) => user.id === id));
    toggleEditModal();
  };

  const handleSubmitConfirmationModal = () => {
    deleteStudent(deleteCurrenItem);
    toggleConfirmationModal();
  };

  const handleRemoveStudent = (student) => {
    setDeleteCurrentItem(student);
    toggleConfirmationModal();
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const filteredList = (students) =>
    students.filter((student) =>
      student.firstName.toLowerCase().includes(searchValue)
    );

  return (
    <Card className="mb-4">
      <CardBody>
        <Header />

        <Loader isLoading={isDataLoading}>
          <Row className="flex-column-reverse flex-md-row">
            <Col md="8">
              <div
                style={{
                  overflowY: "auto",
                  maxHeight: 600,
                  paddingBottom: "1rem",
                }}
              >
                <Loader isLoading={isLoading}>
                  {list?.length > 0 ? (
                    <ListGroup>
                      {filteredList(list).map((student, index) => (
                        <ListItem
                          key={student.id + student.lastName}
                          index={index}
                          item={student}
                          onEdit={handleEditModal}
                          onRemove={handleRemoveStudent}
                        />
                      ))}
                    </ListGroup>
                  ) : (
                    <Alert color="warning">Empty list!</Alert>
                  )}
                </Loader>
              </div>
            </Col>

            <Col md="4">
              <div className="mb-5">
                <Search onChange={handleSearch} />
              </div>

              <div className="mb-4">
                <Add onAdd={addStudent} />
              </div>
            </Col>
          </Row>
        </Loader>

        <EditModal
          isOpen={isEditModal}
          toggle={toggleEditModal}
          item={editCurrentItem}
          onSubmit={editStudent}
        />

        <ConfirmationModal
          isOpen={isConfirmationModalShow}
          title="Are you sure?"
          toggle={toggleConfirmationModal}
          onSubmit={handleSubmitConfirmationModal}
        />

        {list && <Tooltip />}
      </CardBody>
    </Card>
  );
};

export default Students;
