import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../redux/actions/auth";

import { Form, Container, Row, Col, Button, Figure } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

import kitchen_mom from "../../assets/kitchen_mom.png";
import ghorKuno_Combained from "../../assets/ghorKuno_Combined.png";

const Login = ({ login, isAuthenticated }) => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [cnt, set_cnt] = useState(0);

  let isSignUp = false;
  let isResetPassword = false;
  let isResetPasswordConfirm = false;
  let isVerified = false;
  const location = useLocation();
  if (location.state) {
    isSignUp = location.state.isSignUp;
    isResetPassword = location.state.isResetPassword;
    isResetPasswordConfirm = location.state.isResetPasswordConfirm;
    isVerified = location.state.isVerified;
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const notify = (toast_text, type) => {
    if (type === "info") {
      toast.info(`${toast_text}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (type === "success") {
      toast.success(`${toast_text}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (type === "warn") {
      toast.warn(`${toast_text}`, {
        position: "top-right",
        autoClose: 5000,
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

    // toast.warn(`${toast_text}`, {});
  };

  const onSubmit = (e) => {
    handleSubmit(e);
    e.preventDefault();
    login(email, password);
    notify("Please Input Right Email and Password", "warn");
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isAuthenticated) {
    navigate("/home", { replace: true });
  }

  // After Signup show this info

  const showAfterSignup = () => {
    if (cnt < 1) {
      notify(
        "A confirmation has been sent to your mail.\nPlease, check your mail to verify the account...",
        "info"
      );
      set_cnt(1);
    }
  };

  const showAfterResetPassword = () => {
    if (cnt < 1) {
      notify(
        "A confirmation has been sent to your mail.\nPlease, check your mail to Reset Password...",
        "info"
      );
      set_cnt(1);
    }
  };

  const showAfterResetPasswordConfirm = () => {
    if (cnt < 1) {
      notify(
        "Successfully changed your password..\nNow you can login with updated password...",
        "success"
      );
      set_cnt(1);
    }
  };

  const showAfterVerified = () => {
    if (cnt < 1) {
      notify(
        "Your account has successfully verified.\nNow you can login with email and password...",
        "success"
      );
      set_cnt(1);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col sm={4} />
        <Col sm={4}>
          <Row>
            <Figure className="text-center px-2">
              <Figure.Image
                width={300}
                height={200}
                alt="none"
                src={ghorKuno_Combained}
              />
            </Figure>
          </Row>
          <Row>
            <Form
              noValidate
              validated={validated}
              onSubmit={(e) => onSubmit(e)}
              className="text-center mb-3"
            >
              <Form.Group>
                <Form.Floating className="mb-3">
                  <Form.Control
                    className=" rounded-3"
                    type="email"
                    placeholder="name@example.com"
                    name="email"
                    value={email}
                    onChange={(e) => onChange(e)}
                    required
                  />
                  <label htmlFor="floatingInputCustom">Email address</label>
                </Form.Floating>
              </Form.Group>
              <Form.Group>
                <Form.Floating className="mb-3">
                  <Form.Control
                    className=" rounded-3"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => onChange(e)}
                    required
                  />
                  <label htmlFor="floatingPasswordCustom">Password</label>
                </Form.Floating>
              </Form.Group>
              <Button
                variant="danger"
                type="submit"
                className=" rounded-3 text-white fw-bold fs-4"
                style={{
                  height: "30%",
                  width: "100%",
                }}
              >
                Login
              </Button>
            </Form>
          </Row>
          <Row>
            <Col sm={6}>
              <Link to="/signup" className="text-decoration-none">
                <Button
                  variant="warning"
                  type="submit"
                  className=" rounded-3 text-white fw-bold fs-5 my-2"
                  style={{
                    width: "100%",
                  }}
                >
                  New here? Sign up
                </Button>
              </Link>
            </Col>
            <Col sm={6}>
              <Link to="/reset-password">
                <Button
                  variant="danger"
                  type="submit"
                  className=" rounded-3 text-white fw-bold fs-5 my-2"
                  style={{
                    width: "100%",
                  }}
                >
                  Reset Password
                </Button>
              </Link>
            </Col>
          </Row>
          <Row>
            <br />
          </Row>
          {isSignUp ? showAfterSignup() : null}
          {isResetPassword ? showAfterResetPassword() : null}
          {isResetPasswordConfirm ? showAfterResetPasswordConfirm() : null}
          {isVerified ? showAfterVerified() : null}
        </Col>
        <Col sm={4} />
      </Row>
      <Row className="justify-content-center">
        <Figure className="justify-content-center">
          <Figure.Image height={400} alt="none" src={kitchen_mom} />
        </Figure>

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable={false}
          pauseOnHover
          className="text-center fs-5 fw-bold"
        />
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
