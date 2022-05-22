import { Form, Container, Row, Col, Button, Figure } from "react-bootstrap";
import forgot_password from "../assets/forgot password.svg";

const NotFoundPage = () => {
  return (
    <Container
      fluid
      style={{
        position: "absolute",
        top: "8%",
      }}
    >
      <Row>
        <Col sm={4} />
        <Col
          sm={4}
          className="text-center"
          style={{
            color: "#935B50",
          }}
        >
          <Figure className="">
            <Figure.Image width={450} alt="none" src={forgot_password} />
          </Figure>
          <h2>Sorry, We haven't found this page.</h2>
          <h2> Please search for something else.</h2>
        </Col>
        <Col sm={4} />
      </Row>
    </Container>
  );
};

export default NotFoundPage;
