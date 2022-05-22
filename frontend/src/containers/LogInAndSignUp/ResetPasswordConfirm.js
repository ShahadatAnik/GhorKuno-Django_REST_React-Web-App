import React, { useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password_confirm } from "../../redux/actions/auth";
import { Form, Container, Row, Col, Button, Figure } from "react-bootstrap";

import ghorKuno_Combained from "../../assets/ghorKuno_Combined.png";
import otp_verify from "../../assets/otp_verify.svg";

const ResetPasswordConfirm = ({ reset_password_confirm }) => {
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
  const { uid } = useParams();
  const { token } = useParams();
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });

  const { new_password, re_new_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    handleSubmit(e);
    e.preventDefault();

    if (new_password === re_new_password && new_password && re_new_password) {
      reset_password_confirm(uid, token, new_password, re_new_password);
      setRequestSent(true);
    }
  };

  if (requestSent) {
    navigate("/login", { state: { isResetPasswordConfirm: requestSent } });
    setRequestSent(false);
  }

  return (
    <Container fluid className="d-flex justify-content-center">
      <Figure className="text-center p-2">
        <Figure.Image
          width={300}
          height={200}
          alt="none"
          src={ghorKuno_Combained}
        />
      </Figure>
      <Row
        style={{
          position: "absolute",
          top: "20%",
          width: "40%",
        }}
      >
        <Figure className="text-center p-2">
          <Figure.Image width={500} alt="none" src={otp_verify} />
        </Figure>
        <Form
          noValidate
          validated={validated}
          onSubmit={(e) => onSubmit(e)}
          // className="text-center mb-2"
        >
          <Form.Group>
            <Form.Floating className="mb-2">
              <Form.Control
                className=" rounded-3"
                type="password"
                placeholder="Password"
                name="new_password"
                value={new_password}
                onChange={(e) => onChange(e)}
                required
              />
              <label htmlFor="floatingPasswordCustom">New Password</label>
            </Form.Floating>
          </Form.Group>
          <Form.Group>
            <Form.Floating className="mb-2">
              <Form.Control
                className=" rounded-3"
                type="password"
                placeholder="Password"
                name="re_new_password"
                value={re_new_password}
                onChange={(e) => onChange(e)}
                required
              />
              <label htmlFor="floatingPasswordCustom">
                Confirm New Password
              </label>
            </Form.Floating>
          </Form.Group>
          <Button
            variant="danger"
            type="submit"
            className=" rounded-3 text-white fw-bold fs-4"
            style={{
              // height: "30%",
              width: "100%",
            }}
          >
            Reset Password
          </Button>
        </Form>
      </Row>
    </Container>
    // <div className="container mt-5">
    //   <form onSubmit={(e) => onSubmit(e)}>
    //     <div className="form-group">
    //       <input
    //         className="form-control"
    //         type="password"
    //         placeholder="New Password"
    //         name="new_password"
    //         value={new_password}
    //         onChange={(e) => onChange(e)}
    //         minLength="6"
    //         required
    //       />
    //     </div>
    //     <div className="form-group">
    //       <input
    //         className="form-control"
    //         type="password"
    //         placeholder="Confirm New Password"
    //         name="re_new_password"
    //         value={re_new_password}
    //         onChange={(e) => onChange(e)}
    //         minLength="6"
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

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
