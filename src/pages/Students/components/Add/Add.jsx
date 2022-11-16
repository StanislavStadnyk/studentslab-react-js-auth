import React, { useState } from "react";
import { Button, FormGroup, Input } from "reactstrap";

const Add = ({ onAdd }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const isAddStudentValid = !(firstName !== "" && lastName !== "");

  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);

  return (
    <>
      <h6>Add a new student</h6>
      <FormGroup>
        <Input
          name="firstName"
          id="newFirstName"
          placeholder="First Name"
          value={firstName}
          onChange={handleFirstName}
        />
      </FormGroup>

      <FormGroup>
        <Input
          name="lastName"
          id="newLastName"
          placeholder="Last Name"
          value={lastName}
          onChange={handleLastName}
        />
      </FormGroup>

      <Button
        color="success"
        size="sm"
        disabled={isAddStudentValid}
        onClick={() => {
          onAdd({
            firstName,
            lastName,
          });
          setFirstName("");
          setLastName("");
        }}
      >
        Add Student
      </Button>
    </>
  );
};

export default Add;
