import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

// TODO: make clear import file
import { StudentsContainer, MessageContainer } from "./pages/index";
import { Auth, Header, Layout } from "./components/index";
// TODO: need to refactor PROD URL
import { PROD_URL } from "./config";
import { supabase } from "./services/supabaseClient";
import AuthProvider from "./components/AuthProvider/AuthProvider";
import ProtectedRouter from "./components/ProtectedRouter/ProtectedRouter";
import { Profile } from "./pages";

const App = () => {
  const [studentsDataList, setStudentsDataList] = useState(null);
  const [isDataLoading, setDataLoading] = useState(false);

  const getData = () => {
    setDataLoading(true);
    const promiseLocalData = fetch(`${PROD_URL}/data.json`).then((res) =>
      res.json()
    );
    const promiseSupabaseData = supabase
      .from("students")
      .select()
      .order("id", { ascending: true });

    Promise.all([promiseLocalData, promiseSupabaseData])
      .then((values) => {
        const [localData, supabaseData] = values;

        if (supabaseData?.data.length) {
          const data = localData.students.concat(supabaseData.data);
          setStudentsDataList(data);
          return;
        }

        setStudentsDataList(localData.students);
      })
      .catch((err) => {
        console.error("getData Promise.all", err);
      })
      .finally(() => setDataLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);

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
                  isDataLoading={isDataLoading}
                  onDataLoading={setDataLoading}
                  onSetData={setStudentsDataList}
                />
              </ProtectedRouter>
            </Route>

            <Route path={`${PROD_URL}/message`} exact>
              <MessageContainer data={studentsDataList} />
            </Route>

            <Route path={`${PROD_URL}/profile`} exact>
              <ProtectedRouter>
                <Profile />
              </ProtectedRouter>
            </Route>

            <Route path="*">
              <Redirect to={`${PROD_URL}`} />
            </Route>
          </Switch>
        </Layout>

        <ToastContainer autoClose={2000} />
      </Router>
    </AuthProvider>
  );
};

export default App;
