import React from "react";
import { Spinner } from "reactstrap";

import "./Loader.scss";

const Loader = ({ isLoading, text, children }) => (
  <div className="loader">
    {children}
    {isLoading ? (
      <div className="loader__spinner">
        <div>
          <Spinner animation="border" variant="primary" />
        </div>
        {text && <div>{text}</div>}
      </div>
    ) : null}
  </div>
);

export default Loader;
