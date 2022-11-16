import React, { useState } from "react";
import { toast } from "react-toastify";

import Students from "./Students";
import { supabase } from "../../services/supabaseClient";
import { findIndexStudentById } from "./helpers";

const StudentsContainer = ({ data, isDataLoading, onSetData }) => {
  const [isLoading, setLoading] = useState(false);

  const handleEditStudent = async (student) => {
    const id = student.id;
    const index = findIndexStudentById(data, id);

    try {
      setLoading(true);

      if (student?.testData) {
        onSetData([...data.slice(0, index), student, ...data.slice(index + 1)]);
        return;
      }

      delete student.testData;
      const { error } = await supabase
        .from("students")
        .update(student)
        .eq("id", id);

      if (error) throw error;

      onSetData([...data.slice(0, index), student, ...data.slice(index + 1)]);
    } catch (error) {
      toast(error.message, {
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (student) => {
    try {
      setLoading(true);
      const { data: dataArray, error } = await supabase
        .from("students")
        .insert(student)
        .select();

      if (error) throw error;

      onSetData([...data, dataArray[0]]);
    } catch (error) {
      toast(error.message, {
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async (student) => {
    const id = student.id;
    const index = findIndexStudentById(data, id);

    try {
      setLoading(true);
      const { error } = await supabase.from("students").delete().eq("id", id);

      if (error) throw error;

      onSetData([
        ...data.slice(0, index),
        ...data.slice(index + 1, data.length),
      ]);
    } catch (error) {
      toast(error.message, {
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Students
      list={data}
      isLoading={isLoading}
      isDataLoading={isDataLoading}
      addStudent={handleAddStudent}
      editStudent={handleEditStudent}
      deleteStudent={handleDeleteStudent}
    />
  );
};

export default StudentsContainer;
