import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

import { useAuth } from "../../hooks";
import { PROD_URL } from "../../config";

const AuthButton = () => {
  const { token, onLogout } = useAuth();

  return (
    <>
      {token ? (
        <Button size="sm" color="danger" onClick={onLogout}>
          Signout
        </Button>
      ) : (
        <Link to={`${PROD_URL}/login`}>
          <Button size="sm" color="success">
            Login
          </Button>
        </Link>
      )}
    </>
  );
};

export default AuthButton;
