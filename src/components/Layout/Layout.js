import React from "react";
import { Container, Row, Col } from "reactstrap";

const Layout = ({ children }) => (
  <Container>
    <Row>
      <Col>{children}</Col>
    </Row>
  </Container>
);

export default Layout;
