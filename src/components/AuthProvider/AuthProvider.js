import React, { createContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import { supabase } from "../../services/supabaseClient";
import { PROD_URL } from "../../config";

// global context
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log("getSession", session);
      setSession(session);

      if (session) {
        // check if the user exists in profiles table
        const { status, error, data } = await supabase
          .from("profiles")
          .select()
          .eq("id", session.user.id);
        if (error) throw error;

        if (data) {
          const [user] = data;

          setProfile({
            username: user?.username,
            website: user?.website,
            avatar_url: user?.avatar_url,
          });
        }

        // if user doesn't exist in profile table, add him to profile table
        if (status !== 200) {
          const { error } = await supabase.from("profiles").insert({
            id: session.user.id,
          });
          if (error) throw error;
        }
      }
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

  const handleSetProfile = (profile) => {
    setProfile(profile);
  };

  const value = {
    // TODO: need to refactor local storage
    user:
      JSON.parse(
        window.localStorage.getItem("sb-xftszbubwqexxryeewfj-auth-token")
      )?.user || session?.user,
    token:
      JSON.parse(
        window.localStorage.getItem("sb-xftszbubwqexxryeewfj-auth-token")
      )?.access_token || session?.access_token,
    onLogout: handleLogout,
    profile,
    setProfile: handleSetProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
