import React, { useState } from "react";

import { supabase } from "../../services/supabaseClient";
import { useAuth } from "../../hooks";
import { Redirect } from "react-router-dom";
import { PROD_URL } from "../../config";

// import "./Auth.scss";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const auth = useAuth();

  if (auth.token) {
    return <Redirect to={`${PROD_URL}`} exact />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row flex-center flex">
      <div className="col-6 form-widget offset-3" aria-live="polite">
        <button type="button" onClick={auth.onLogout}>
          Logout
        </button>
        <h1 className="header">Supabase + React</h1>
        <p className="description">
          Sign in via magic link with your email below
        </p>
        {loading ? (
          "Sending magic link..."
        ) : (
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="button block" aria-live="polite">
              Send magic link
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
