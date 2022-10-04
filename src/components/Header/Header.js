import React, { useState } from 'react';
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { PROD_URL } from '../..//config';

const Students = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color='light' light expand='md' className='mb-5'>
      <Container>
        <NavbarBrand href={`${PROD_URL}`}>
          <strong>StudentsLab</strong>
        </NavbarBrand>

        <NavbarToggler onClick={toggle} />

        <Collapse isOpen={isOpen} navbar>
          <Nav className='mr-auto' navbar>
            <NavItem className='mr-3'>
              <NavLink to={`${PROD_URL}`} exact className='nav-link'>
                Home
              </NavLink>
            </NavItem>
            <NavItem className='mr-3'>
              <NavLink to={`${PROD_URL}/message`} className='nav-link'>
                Send Message
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default Students;
