import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const navbar = () => {
  return (
    <Navbar bg="light" expand="sm">
      <Navbar.Brand href="/">Clinica ABC</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse></Navbar.Collapse>
    </Navbar>
  );
};

export default navbar;
