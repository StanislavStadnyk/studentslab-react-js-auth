import React from 'react';
import Students from './Students';

const StudentsContainer = ({ data, addUser, editUser, deleteUser }) => {
  if (!data) {
    return null;
  }

  return (
    <Students
      list={data}
      addUser={addUser}
      editUser={editUser}
      deleteUser={deleteUser}
    />
  );
};

export default StudentsContainer;
