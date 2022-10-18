import React from "react";
import { Redirect } from "react-router-dom";

import { PROD_URL } from "../../config";
import { useAuth } from "../../hooks";

const ProtectedRouter = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Redirect to={`${PROD_URL}/login`} />;
  }

  return children;
};

export default ProtectedRouter;
