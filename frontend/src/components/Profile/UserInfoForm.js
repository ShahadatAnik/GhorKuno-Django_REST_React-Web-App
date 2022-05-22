import React, { useEffect, useState } from "react";
import ApiService from "../../ApiService";
import { Container, Row, Col, Figure, Form } from "react-bootstrap";
import { motion } from "framer-motion";

import {
  Button,
  CardActionArea,
  CardActions,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  styled,
  Rating,
} from "@mui/material";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";

export default function UserInfoForm(props) {
  const [first_name, set_first_name] = useState(props.userInfo.first_name);
  const [last_name, set_last_name] = useState(props.userInfo.last_name);
  const [house_name, set_house_name] = useState(props.userInfo.house_name);
  const [road_no, set_road_no] = useState(props.userInfo.road_no);
  const [block_no, set_block_no] = useState(props.userInfo.block_no);
  const [area, set_area] = useState(props.userInfo.area);
  const [city, set_city] = useState(props.userInfo.city);
  const [district, set_district] = useState(props.userInfo.district);
  const [mobilePhone, set_mobilePhone] = useState(props.userInfo.mobilePhone);

  useEffect(() => {
    set_first_name(props.userInfo.first_name);
    set_last_name(props.userInfo.last_name);
    set_house_name(props.userInfo.house_name);
    set_road_no(props.userInfo.road_no);
    set_block_no(props.userInfo.block_no);
    set_area(props.userInfo.area);
    set_city(props.userInfo.city);
    set_district(props.userInfo.district);
    set_mobilePhone(props.userInfo.mobilePhone);
  }, [props.userInfo]);

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
    ApiService.UpdateUserInfo(
      props.userInfo.user_id,
      first_name,
      last_name,
      house_name,
      road_no,
      block_no,
      area,
      city,
      district,
      mobilePhone
    ).then((resp) => {
      props.updatedInformation(resp.data);
    });
  };
  return (
    <Container fluid>
      {props.userInfo ? (
        <>
          <motion.div animate={{ scale: 1.1 }} transition={{ duration: 0.5 }}>
            <Row
              className="shadow-lg rounded-3 my-4 p-3"
              style={{ background: "#FFBD2D" }}
            >
              <Form
                noValidate
                validated={validated}
                onSubmit={(e) => onSubmit(e)}
                // className="text-center mb-2"
              >
                <Row>
                  <Form.Group as={Col} md="6">
                    <Form.Floating className="mb-2">
                      <Form.Control
                        className=" rounded-3"
                        type="text"
                        placeholder="name"
                        name="first_name"
                        value={first_name}
                        onChange={(e) => set_first_name(e.target.value)}
                        required
                      />
                      <label htmlFor="floatingInputCustom">First Name</label>
                    </Form.Floating>
                  </Form.Group>
                  <Form.Group as={Col} md="6">
                    <Form.Floating className="mb-2">
                      <Form.Control
                        className=" rounded-3"
                        type="text"
                        placeholder="name"
                        name="last_name"
                        value={last_name}
                        onChange={(e) => set_last_name(e.target.value)}
                        required
                      />
                      <label htmlFor="floatingInputCustom">Last Name</label>
                    </Form.Floating>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} md="4">
                    <Form.Floating className="mb-2">
                      <Form.Control
                        className=" rounded-3"
                        type="text"
                        placeholder="name"
                        name="house_name"
                        value={house_name}
                        onChange={(e) => set_house_name(e.target.value)}
                        required
                      />
                      <label htmlFor="floatingInputCustom">House name</label>
                    </Form.Floating>
                  </Form.Group>
                  <Form.Group as={Col} md="4">
                    <Form.Floating className="mb-2">
                      <Form.Control
                        className=" rounded-3"
                        type="text"
                        placeholder="name"
                        name="road_no"
                        value={road_no}
                        onChange={(e) => set_road_no(e.target.value)}
                        required
                      />
                      <label htmlFor="floatingInputCustom">Road no</label>
                    </Form.Floating>
                  </Form.Group>
                  <Form.Group as={Col} md="4">
                    <Form.Floating className="mb-2">
                      <Form.Control
                        className=" rounded-3"
                        type="text"
                        placeholder="name"
                        name="block_no"
                        value={block_no}
                        onChange={(e) => set_block_no(e.target.value)}
                        required
                      />
                      <label htmlFor="floatingInputCustom">Block no</label>
                    </Form.Floating>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} md="4">
                    <Form.Floating className="mb-2">
                      <Form.Control
                        className=" rounded-3"
                        type="text"
                        placeholder="name"
                        name="area"
                        value={area}
                        onChange={(e) => set_area(e.target.value)}
                        required
                      />
                      <label htmlFor="floatingInputCustom">Area</label>
                    </Form.Floating>
                  </Form.Group>
                  <Form.Group as={Col} md="4">
                    <Form.Floating className="mb-2">
                      <Form.Control
                        className=" rounded-3"
                        type="text"
                        placeholder="name"
                        name="city"
                        value={city}
                        onChange={(e) => set_city(e.target.value)}
                        required
                      />
                      <label htmlFor="floatingInputCustom">City</label>
                    </Form.Floating>
                  </Form.Group>
                  <Form.Group as={Col} md="4">
                    <Form.Floating className="mb-2">
                      <Form.Control
                        className=" rounded-3"
                        type="text"
                        placeholder="name"
                        name="district"
                        value={district}
                        onChange={(e) => set_district(e.target.value)}
                        required
                      />
                      <label htmlFor="floatingInputCustom">District</label>
                    </Form.Floating>
                  </Form.Group>
                </Row>
                <Form.Group>
                  <Form.Floating className="mb-2">
                    <Form.Control
                      className=" rounded-3"
                      type="text"
                      placeholder="name"
                      name="mobilePhone"
                      value={mobilePhone}
                      onChange={(e) => set_mobilePhone(e.target.value)}
                      required
                    />
                    <label htmlFor="floatingInputCustom">Mobile Phone</label>
                  </Form.Floating>
                </Form.Group>

                <Button
                  variant="outlined"
                  size="large"
                  color="error"
                  startIcon={<UpdateOutlinedIcon />}
                  type="submit"
                  className=" rounded-3 text-white fw-bold fs-4"
                  style={{
                    width: "100%",
                    background: "#dc3545",
                  }}
                >
                  Update
                </Button>
              </Form>
            </Row>
          </motion.div>
        </>
      ) : null}
    </Container>
  );
}
