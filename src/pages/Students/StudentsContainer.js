import React from "react";
import Students from "./Students";

const StudentsContainer = ({
  data,
  addUser,
  editStudent,
  deleteUser,
  isLoading,
}) => {
  if (!data) {
    return null;
  }

  return (
    <Students
      list={data}
      isLoading={isLoading}
      addStudent={addUser}
      editStudent={editStudent}
      deleteStudent={deleteUser}
    />
  );
};

export default StudentsContainer;
