import React, { useContext } from "react";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import SignOut from "../auth/SignOut";

const NavBar = () => {
  const localStorage = window.localStorage;

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <div className="container-md">
        <Navbar.Brand href="/">CarRental</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {localStorage.getItem("role") &&
              localStorage.getItem("role") === "ADMIN" && (
                <Nav.Link href="/admin/manage-cars">Manage Cars</Nav.Link>
              )}
          </Nav>
          <Nav>
            <NavDropdown
              title={localStorage.getItem("email") ?? "User"}
              id="collapsible-nav-dropdown"
            >
              {localStorage.getItem("email") !== null ? (
                <SignOut />
              ) : (
                <NavDropdown.Item href="/auth/sign-in">
                  Sign in
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavBar;
