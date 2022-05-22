import React, { useEffect, useState } from "react";
import ApiService from "../../ApiService";
import { Container, Row, Col, Figure, Form } from "react-bootstrap";
import SendIcon from "@mui/icons-material/Send";
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

export default function MyShopItemForm(props) {
  const [itemName, set_itemName] = useState(props.items.itemName);
  const [cost, set_cost] = useState(props.items.cost);
  const [itemDetail, set_itemDetail] = useState(props.items.itemDetail);
  const [itemImg, set_itemImg] = useState(props.items.itemImg);

  useEffect(() => {
    set_itemName(props.items.itemName);
    set_cost(props.items.cost);
    set_itemDetail(props.items.itemDetail);
    set_itemImg(props.items.itemImg);
  }, [props.items]);

  const allNull = () => {
    set_itemName("");
    set_cost("");
    set_itemDetail("");
    set_itemImg(null);
  };

  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const InsertShopItem = () => {
    ApiService.InsertMyShopItem(
      props.shop.id,
      itemName,
      cost,
      itemDetail,
      itemImg
    )
      .then((resp) => props.insertedInformation(resp.data))
      .then(allNull());
  };

  const UpdateShopItem = () => {
    ApiService.UpdateMyShopItem(
      props.items.itemName,
      itemName,
      cost,
      itemDetail
    )
      .then((resp) => {
        props.updatedInformation(resp.data);
      })
      .then(allNull());
  };

  const UpdateShopItemPic = () => {
    ApiService.UpdateMyShopItemPic(props.items.itemName, itemImg)
      .then((resp) => {
        props.updatedInformation(resp.data);
      })
      .then(allNull());
  };

  const onSubmit = (e) => {
    handleSubmit(e);
    e.preventDefault();
    // InsertShopItem();
    // UpdateShopItem();
  };

  return (
    <Container fluid>
      <motion.div animate={{ scale: 1.1 }} transition={{ duration: 0.5 }}>
      <Row>
        <Col sm={1} />
        <Col
          className="p-4 rounded-3 text-center text-white fs-1 fw-bold "
          style={{
            background: "#FFBD2D",
          }}
        >
          Put The Information
        </Col>
        <Col sm={1} />
      </Row>
      {props.items ? (
        <Row>
          <Col sm={3} />
          <Col
            className="p-4 m-4 rounded-3 text-center fw-bold "
            style={{
              background: "#FFBD2D",
            }}
          >
            <Row className=" p-2">
              <Form
                noValidate
                validated={validated}
                onSubmit={(e) => onSubmit(e)}
                // className="text-center mb-2"
              >
                <Row className="my-4 ">
                  <Form.Group as={Col} md="6">
                    <Form.Floating className="mb-2">
                      <Form.Control
                        className=" rounded-3"
                        type="text"
                        placeholder="name"
                        name="itemName"
                        value={itemName}
                        onChange={(e) => set_itemName(e.target.value)}
                        required
                      />
                      <label htmlFor="floatingInputCustom">Item name</label>
                    </Form.Floating>
                  </Form.Group>
                  <Form.Group as={Col} md="6">
                    <Form.Floating className="mb-2">
                      <Form.Control
                        className=" rounded-3"
                        type="text"
                        placeholder="name"
                        name="cost"
                        value={cost}
                        onChange={(e) => set_cost(e.target.value)}
                        required
                      />
                      <label htmlFor="floatingInputCustom">Price</label>
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
                        name="itemDetail"
                        value={itemDetail}
                        onChange={(e) => set_itemDetail(e.target.value)}
                        required
                      />
                      <label htmlFor="floatingInputCustom">Item Details</label>
                    </Form.Floating>
                  </Form.Group>
                  {props.isInsertBtn ? (
                    <Form.Group as={Col} md="6">
                      <Form.Floating className="mb-2">
                        <Form.Control
                          type="file"
                          onChange={(e) => set_itemImg(e.target.files[0])}
                          required
                        />
                      </Form.Floating>
                    </Form.Group>
                  ) : null}
                </Row>

                {props.items.id && props.isUpdateBtn ? (
                  <Button
                    className="text-white fw-bold fs-4"
                    variant="outlined"
                    size="large"
                    color="error"
                    startIcon={<UpdateOutlinedIcon />}
                    type="submit"
                    onClick={UpdateShopItem}
                    style={{
                      width: "100%",
                      background: "#dc3545",
                    }}
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    className=" rounded-3 text-white fw-bold fs-4"
                    variant="outlined"
                    size="large"
                    color="error"
                    endIcon={<SendIcon />}
                    type="submit"
                    onClick={InsertShopItem}
                    style={{
                      width: "100%",
                      background: "#dc3545",
                    }}
                  >
                    Insert
                  </Button>
                )}
                {props.items.id && props.isUpdateBtnPic ? (
                  <Button
                    className="text-white fw-bold fs-4"
                    variant="outlined"
                    size="large"
                    color="error"
                    startIcon={<UpdateOutlinedIcon />}
                    type="submit"
                    onClick={UpdateShopItemPic}
                    style={{
                      width: "100%",
                      background: "#dc3545",
                    }}
                  >
                    Update Photo
                  </Button>
                ) : null}
              </Form>
            </Row>
          </Col>
          <Col sm={3} />
        </Row>
      ) : null}
      </motion.div>
    </Container>
  );
}
