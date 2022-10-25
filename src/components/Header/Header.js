import React, { useState } from "react";
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from "reactstrap";
import { Link, NavLink } from "react-router-dom";

import { PROD_URL } from "../../config";
import AuthButton from "../AuthButton/AuthButton";

const Students = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="md" className="mb-5">
      <Container>
        <Link to={`${PROD_URL}`} className="navbar-brand">
          <strong>StudentsLab</strong>
        </Link>

        <NavbarToggler onClick={toggle} />

        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem className="mr-3">
              <NavLink to={`${PROD_URL}`} exact className="nav-link">
                Dashboard
              </NavLink>
            </NavItem>
            <NavItem className="mr-3">
              <NavLink to={`${PROD_URL}/message`} className="nav-link">
                Send Message
              </NavLink>
            </NavItem>
            <NavItem className="mr-3">
              <NavLink to={`${PROD_URL}/profile`} className="nav-link">
                Profile
              </NavLink>
            </NavItem>
          </Nav>

          <AuthButton />
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default Students;
