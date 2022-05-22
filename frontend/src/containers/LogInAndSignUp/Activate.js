import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../../redux/actions/auth";
import { Container, Row, Button, Figure } from "react-bootstrap";

import ghorKuno_Combained from "../../assets/ghorKuno_Combined.png";
import otp_verify from "../../assets/otp_verify.svg";

const Activate = ({ verify }) => {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);

  const { uid } = useParams();
  const { token } = useParams();

  const verify_account = (e) => {
    verify(uid, token);
    setVerified(true);
  };

  if (verified) {
    navigate("/login", { state: { isVerified: verified } });
    setVerified(false);
  }

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
    >
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
          top: "30%",
        }}
        className="justify-content-center"
      >
        <Figure className="text-center p-2">
          <Figure.Image width={500} alt="none" src={otp_verify} />
        </Figure>
        <Button
          variant="danger"
          type="button"
          className=" rounded-3 text-white fw-bold fs-5"
          style={{
            width: "80%",
          }}
          onClick={verify_account}
        >
          Verify
        </Button>
      </Row>
    </Container>
  );
};

export default connect(null, { verify })(Activate);
