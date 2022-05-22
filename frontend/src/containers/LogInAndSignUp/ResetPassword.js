import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password } from "../../redux/actions/auth";

import { Form, Container, Row, Col, Button, Figure } from "react-bootstrap";
import forgot_password from "../../assets/forgot password.svg";

const ResetPassword = ({ reset_password }) => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    handleSubmit(e);
    e.preventDefault();

    reset_password(email);
    setRequestSent(true);
  };

  if (requestSent) {
    // return <Navigate to="/login" />;
    navigate("/login", { state: { isResetPassword: requestSent } });
    setRequestSent(false);
  }

  return (
    <Container fluid>
      <Row>
        <Col sm={4} />
        <Col sm={4}>
          <Row>
            <h1
              className="text-center p-2"
              style={{
                color: "#935B50",
              }}
            >
              Forgot Your Password
            </h1>
            <Figure className="text-center p-2">
              <Figure.Image
                width={300}
                height={200}
                alt="none"
                src={forgot_password}
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
              <Button
                variant="danger"
                type="submit"
                className=" rounded-3 text-white fw-bold fs-4"
                style={{
                  width: "100%",
                }}
              >
                Reset Password
              </Button>
            </Form>
          </Row>
        </Col>
        <Col sm={4} />
      </Row>
    </Container>

    // <div className="container mt-5">
    //   <h1>Request Password Reset:</h1>
    //   <form onSubmit={(e) => onSubmit(e)}>
    //     <div className="form-group">
    //       <input
    //         className="form-control"
    //         type="email"
    //         placeholder="Email"
    //         name="email"
    //         value={email}
    //         onChange={(e) => onChange(e)}
    //         required
    //       />
    //     </div>
    //     <button className="btn btn-primary" type="submit">
    //       Reset Password
    //     </button>
    //   </form>
    // </div>
  );
};

export default connect(null, { reset_password })(ResetPassword);
