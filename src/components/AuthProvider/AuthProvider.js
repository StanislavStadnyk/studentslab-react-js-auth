import React, { createContext, useEffect, useState } from "react";
import { supabase } from "../../services/supabaseClient";
import { Redirect } from "react-router-dom";
import { PROD_URL } from "../../config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("sb-xftszbubwqexxryeewfj-auth-token");
    setSession(null);

    return <Redirect to={`${PROD_URL}/login`} />;
  };

  const value = {
    token: session?.access_token,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
