import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import { logout } from "../redux/actions/auth";
import { Navbar, Nav, Image } from "react-bootstrap";
import BrandTitle from "../assets/ghorKuno_title.png";
// import BrandTitle from "../assets/ghorKuno LOGO.png";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/ExitToApp";

import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

const NavBar = ({ logout, isAuthenticated }) => {
  const [user, setUser] = useState([]);

  const logout_user = () => {
    logout();
  };

  const navLinkStyle = ({ isActive }) => {
    return {
      textDecoration: isActive ? "none" : "none",
      border: isActive ? "5px solid #FFBD2D" : "5px solid #dc3545",
      borderRadius: isActive ? "50px" : " 50px",
      color: isActive ? "#dc3545" : "#FFBD2D",
      background: isActive ? "#FFBD2D" : "#dc3545",
    };
  };
  const navLinkStyle_logout = ({ isActive }) => {
    return {
      textDecoration: isActive ? "none" : "none",
    };
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config)
      .then((res) => setUser(res.data))
      .catch((error) => console.log(error));
  }, [isAuthenticated]);

  const notify = (toast_text, type) => {
    if (type === "success") {
      toast.success(`${toast_text}`, {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (type === "error") {
      toast.error(`${toast_text}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const guestNavLinks = () => (
    <Fragment>
      <Nav.Item>
        <NavLink
          style={navLinkStyle}
          className="px-4 mx-2 d-flex justify-content-center"
          to="/login"
        >
          Login
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink
          style={navLinkStyle}
          className="px-4 mx-2 d-flex justify-content-center"
          to="/signup"
        >
          Sign Up
        </NavLink>
      </Nav.Item>
    </Fragment>
  );

  const authNavLinks = () => (
    <Nav>
      <Nav.Item>
        <NavLink
          to="/home"
          style={navLinkStyle}
          className="px-4 m-1 d-flex justify-content-center"
        >
          <HomeIcon className="fs-2 my-1" /> Home
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink
          style={navLinkStyle}
          className="px-4 m-1 d-flex justify-content-center"
          to="/shops"
        >
          <LocalDiningIcon className="fs-2 my-1" /> Kitchens
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink
          style={navLinkStyle}
          className="px-4 m-1 d-flex justify-content-center"
          to="/cart"
        >
          <ShoppingCartIcon className="fs-2 my-1" /> Cart
        </NavLink>
      </Nav.Item>

      <Nav.Item>
        {user.is_worker ? (
          <NavLink
            style={navLinkStyle}
            className="px-4 m-1 d-flex justify-content-center"
            to="/user-info"
          >
            <PersonIcon className="fs-2 my-1" /> WorkerInfo
          </NavLink>
        ) : (
          <NavLink
            style={navLinkStyle}
            className="px-4 m-1 d-flex justify-content-center"
            to="/user-info"
          >
            <PersonIcon className="fs-2 my-1" /> Profile
          </NavLink>
        )}
      </Nav.Item>

      <Nav.Item>
        <NavLink
          style={navLinkStyle}
          className="px-4 m-1 d-flex justify-content-center"
          to="/myShop"
        >
          <LocalDiningIcon className="fs-2 my-1" /> MyKitchen
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink
          style={navLinkStyle}
          className="px-4 m-1 d-flex justify-content-center"
          to="/contact-us"
        >
          <ContactSupportIcon className="fs-2 my-1" /> ContactUs
        </NavLink>
      </Nav.Item>

      <Nav.Item>
        <NavLink
          style={navLinkStyle_logout}
          className="px-4 m-2 d-flex justify-content-center"
          to="/login"
        >
          <Button
            startIcon={<LogoutIcon />}
            variant="contained"
            onClick={logout_user}
            style={{
              background: "#dc3545",
              width: "100%",
            }}
          >
            Logout
          </Button>
        </NavLink>
      </Nav.Item>
    </Nav>
  );

  return (
    <Navbar
      bg="light"
      variant={"light"}
      expand="lg"
      className="justify-content-center"
    >
      {isAuthenticated ? (
        <Navbar.Brand className="px-5" href="/home">
          <Image
            width={200}
            height={30}
            alt="GhorKuno"
            src={BrandTitle}
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
      ) : (
        <Navbar.Brand className="px-5" href="/login">
          <Image
            width={200}
            height={30}
            alt="GhorKuno"
            src={BrandTitle}
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
      )}

      <Navbar.Toggle aria-controls="responsive-navbar-nav d-flex justify-content-center" />
      <Navbar.Collapse id="responsive-navbar-nav d-flex justify-content-end">
        <Nav className="fs-4 fw-bold p-1 d-flex justify-content-end">
          {!isAuthenticated ? guestNavLinks() : authNavLinks()}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(NavBar);
