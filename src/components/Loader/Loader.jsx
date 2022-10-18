import React from "react";
import { Spinner } from "reactstrap";

import "./Loader.scss";

const Loader = ({ isLoading, children }) => (
  <div className="loader">
    {children}
    {isLoading ? (
      <div className="loader__spinner">
        <Spinner animation="border" variant="primary" />
      </div>
    ) : null}
  </div>
);

export default Loader;
