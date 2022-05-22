import React, { useEffect, useState } from "react";
import ApiService from "../../ApiService";
import { Container, Row, Col, Form } from "react-bootstrap";
import { motion } from "framer-motion";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TextField from "@mui/material/TextField";

import { Button } from "@mui/material";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";

export default function MyShopForm(props) {
  const [shopName, set_shopName] = useState(props.shopInfo.shopName);
  const [detailedAddr, set_detailedAddr] = useState(
    props.shopInfo.detailedAddr
  );
  const [offerBDT, set_offerBDT] = useState(props.shopInfo.offerBDT);
  const [offerPercentage, set_offerPercentage] = useState(
    props.shopInfo.offerPercentage
  );
  const [offerTill, set_offerTill] = useState(props.shopInfo.offerTill);

  useEffect(() => {
    set_shopName(props.shopInfo.shopName);
    set_detailedAddr(props.shopInfo.detailedAddr);
    set_offerBDT(props.shopInfo.offerBDT);
    set_offerPercentage(props.shopInfo.offerPercentage);
    set_offerTill(props.shopInfo.offerTill);
  }, [props.shopInfo]);

  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const onSubmit = (e) => {
    handleSubmit(e);
    e.preventDefault();
      ApiService.UpdateShopInfo(
        props.shopInfo.shopName,
        shopName,
        detailedAddr,
        offerBDT,
        offerPercentage,
        offerTill
      ).then((resp) => {
        props.updatedInformation(resp.data);
      });
    
  };

  return (
    <Container fluid>
      <motion.div animate={{ scale: 1.1 }} transition={{ duration: 0.5 }}>
      {props.shopInfo.shopName === "New" ? <Row>
          <Col sm={1} />
          <Col
            className="p-4 rounded-3 text-center text-white fs-1 fw-bold "
            style={{
              background: "#FFBD2D",
            }}
          >
            Update Your Kitchen Information
          </Col>
          <Col sm={1} />
        </Row> : (
        <Row>
          <Col sm={1} />
          <Col
            className="p-4 rounded-3 text-center text-white fs-1 fw-bold "
            style={{
              background: "#FFBD2D",
            }}
          >
            Update Your Kitchen Information
          </Col>
          <Col sm={1} />
        </Row>
      )}

      {props.shopInfo ? (
        <Row>
          <Col sm={3} />
          <Col
            className="p-4 m-4 rounded-3 fw-bold "
            style={{
              background: "#FFBD2D",
            }}
          >
            <Row className="p-2">
              <Form
                noValidate
                validated={validated}
                onSubmit={(e) => onSubmit(e)}
                // className="text-center mb-2"
              >
                <Row className="my-4">
                  <Form.Group>
                    <Form.Floating className="mb-2">
                      <Form.Control
                        className=" rounded-3"
                        type="text"
                        name="shopName"
                        value={shopName}
                        onChange={(e) => set_shopName(e.target.value)}
                        required
                      />
                      <label htmlFor="floatingInputCustom">Shop Name</label>
                    </Form.Floating>
                  </Form.Group>
                </Row>
                <Row className="my-4">
                  <Form.Group>
                    <Form.Floating className="mb-2">
                      <Form.Control
                        className=" rounded-3"
                        type="text"
                        name="detailedAddr"
                        value={detailedAddr}
                        onChange={(e) => set_detailedAddr(e.target.value)}
                        required
                      />
                      <label htmlFor="floatingInputCustom">Address</label>
                    </Form.Floating>
                  </Form.Group>
                </Row>
                <Row className="my-4 ">
                  <Form.Group as={Col} md="6">
                    <Form.Floating className="mb-2">
                      <Form.Control
                        className=" rounded-3"
                        type="text"
                        placeholder="name"
                        name="offerBDT"
                        value={offerBDT}
                        onChange={(e) => set_offerBDT(e.target.value)}
                      />
                      <label htmlFor="floatingInputCustom">Offer in BDT</label>
                    </Form.Floating>
                  </Form.Group>
                  <Form.Group as={Col} md="6">
                    <Form.Floating className="mb-2">
                      <Form.Control
                        className=" rounded-3"
                        type="text"
                        placeholder="name"
                        name="offerPercentage"
                        value={offerPercentage}
                        onChange={(e) => set_offerPercentage(e.target.value)}
                      />
                      <label htmlFor="floatingInputCustom">
                        Offer in Percentage
                      </label>
                    </Form.Floating>
                  </Form.Group>
                </Row>
                <Row className="my-4">
                  <Form.Group>
                    <Form.Floating className="mb-2">
                      <Form.Control
                        className=" rounded-3"
                        type="text"
                        placeholder="name"
                        name="offerTill"
                        value={offerTill}
                        onChange={(e) => set_offerTill(e.target.value)}
                      />
                      <label htmlFor="floatingInputCustom">
                        Offer Till (yyyy-mm-dd)
                      </label>
                    </Form.Floating>
                  </Form.Group>
                </Row>
                <Button
                  className=" rounded-3 text-white fw-bold fs-4"
                  variant="contained"
                  size="large"
                  color="error"
                  startIcon={<UpdateOutlinedIcon />}
                  type="submit"
                  sx={{
                    width: "100%",
                    background: "#dc3545",
                  }}
                >
                  Update
                </Button>
              </Form>
            </Row>
            <Row className="text-white">
              *If you don't want to give any offer, the you can <br />
              1. Make the "Offer in BDT" to 0
              <br />
              2. Make the "Offer in Percentage" to 0. <br />
              3. Make both field to 0 and put blank the offerTill field.
            </Row>
          </Col>
          <Col sm={3} />
        </Row>
      ) : null}
      </motion.div>
    </Container>
  );
}
