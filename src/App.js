import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { StudentsContainer, MessageContainer } from "./pages/index";
import { Auth, Header, Layout } from "./components/index";
import { PROD_URL } from "./config";
import { supabase } from "./services/supabaseClient";
import AuthProvider from "./components/AuthProvider/AuthProvider";
import ProtectedRouter from "./components/ProtectedRouter/ProtectedRouter";

const App = () => {
  const [studentsDataList, setStudentsDataList] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getData();

    // const promiseSupabaseData = await supabase
    //   .from("students")
    //   .select()
    //   .filter("id", "in", "(47, 49)");
    //
    // console.log("promiseSupabaseData", promiseSupabaseData);
  }, []);

  const handleEditStudent = async (student) => {
    const index = studentsDataList.findIndex(
      (userItem) => userItem.id === student.id
    );

    try {
      setLoading(true);

      if (student?.testData) {
        setStudentsDataList([
          ...studentsDataList.slice(0, index),
          student,
          ...studentsDataList.slice(index + 1),
        ]);
        return;
      }

      delete student.testData;
      await supabase.from("students").update(student).eq("id", student.id);

      setStudentsDataList([
        ...studentsDataList.slice(0, index),
        student,
        ...studentsDataList.slice(index + 1),
      ]);
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (student) => {
    try {
      setLoading(true);
      const { data: dataArray } = await supabase
        .from("students")
        .insert(student)
        .select();

      setStudentsDataList([...studentsDataList, dataArray[0]]);
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async (student) => {
    const index = studentsDataList.findIndex((user) => user.id === student.id);

    try {
      setLoading(true);
      await supabase.from("students").delete().eq("id", student.id);
      setStudentsDataList([
        ...studentsDataList.slice(0, index),
        ...studentsDataList.slice(index + 1, studentsDataList.length),
      ]);
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = (user, message) => {
    const updatedMessages = [...user.messages, message];
    const userWithNewMessage = { ...user, messages: updatedMessages };
    const index = studentsDataList.findIndex(
      (userItem) => userItem.id === user.id
    );

    setStudentsDataList([
      ...studentsDataList.slice(0, index),
      userWithNewMessage,
      ...studentsDataList.slice(index + 1),
    ]);
  };

  const getData = () => {
    const promiseLocalData = fetch(`${PROD_URL}/data.json`).then((res) =>
      res.json()
    );
    const promiseSupabaseData = supabase.from("students").select();

    Promise.all([promiseLocalData, promiseSupabaseData])
      .then((values) => {
        const [localData, supabaseData] = values;

        if (supabaseData?.data.length) {
          const data = localData.concat(supabaseData.data);
          setStudentsDataList(data);
          return;
        }

        setStudentsDataList(localData);
      })
      .catch((err) => {
        console.error("getData Promise.all", err);
      });
  };

  return (
    <AuthProvider>
      <Router>
        <Header />

        <Layout>
          <Switch>
            <Route path={`${PROD_URL}/login`} exact>
              <Auth />
            </Route>
            <Route path={`${PROD_URL}`} exact>
              <ProtectedRouter>
                <StudentsContainer
                  data={studentsDataList}
                  isLoading={isLoading}
                  editStudent={handleEditStudent}
                  addUser={handleAddStudent}
                  deleteUser={handleDeleteStudent}
                />
              </ProtectedRouter>
            </Route>

            <Route path={`${PROD_URL}/message`}>
              <MessageContainer
                data={studentsDataList}
                sendMessage={handleSendMessage}
              />
            </Route>

            <Route path="*">
              <Redirect to={`${PROD_URL}`} />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
