import React, { Fragment, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/actions/auth";
import { Navbar, Button, Nav, Image } from "react-bootstrap";
import BrandTitle from "../assets/ghorKuno_title.png";
// import BrandTitle from "../assets/ghorKuno LOGO.png";

const WorkerNavBar = ({ logout, isAuthenticated }) => {
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const logout_user = () => {
    logout();
    // // setRedirect(true);
    // navigate("/login");
  };

  const navLinkStyle = ({ isActive }) => {
    return {
      textDecoration: isActive ? "underline" : "none",
      // border: isActive ? "2px solid #FFBD2D" : " red",
      // borderRadius: isActive ? "20px" : " 0px",
      color: isActive ? "red" : "#FFBD2D",
      // background: isActive ? "#FFBD2D" : "red",
    };
  };

  const guestNavLinks = () => (
    <Fragment>
      <Nav.Item>
        <NavLink style={navLinkStyle} className="px-2" to="/login">
          Login
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink style={navLinkStyle} className="px-2" to="/signup">
          Sign Up
        </NavLink>
      </Nav.Item>
    </Fragment>
  );

  const authNavLinks = () => (
    <>
      <Nav>
        <Nav.Item>
          <NavLink style={navLinkStyle} className="px-2" to="/user-info">
            WorkerInfo
          </NavLink>
        </Nav.Item>
      </Nav>
      <Navbar.Collapse
        className="justify-content-end"
        id="responsive-navbar-nav"
      >
        <Nav>
          <Nav.Item className="px-5">
            <Button
              variant="danger"
              size="sm"
              className="text-white fw-bold fs-5"
              as={NavLink}
              to="/login"
              onClick={logout_user}
            >
              Logout
            </Button>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </>
  );

  return (
    <Navbar bg="light" variant={"light"} expand="lg">
      <Navbar.Brand className="px-5" href="/home">
        <Image
          width={200}
          height={30}
          alt="GhorKuno"
          src={BrandTitle}
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav
          variant="pills"
          className="fs-4 fw-bold align-right p-1 justify-content-end"
        >
          <Nav.Item>
            <NavLink to="/home" style={navLinkStyle} className="px-2">
              Home
            </NavLink>
          </Nav.Item>
          {!isAuthenticated ? guestNavLinks() : authNavLinks()}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(WorkerNavBar);
