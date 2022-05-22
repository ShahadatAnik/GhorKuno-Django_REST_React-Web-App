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

export default function MyShopItemPicForm(props) {
  const [itemImg, set_itemImg] = useState(props.items.itemImg);

  useEffect(() => {
    set_itemImg(props.items.itemImg);
  }, [props.items]);

  const allNull = () => {
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
    UpdateShopItemPic();
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
            className="p-4 rounded-3 text-center fw-bold m-4 "
            style={{
              background: "#FFBD2D",
            }}
          >
            <Row className=" p-2 ">
              <Form
                noValidate
                validated={validated}
                onSubmit={(e) => onSubmit(e)}
                // className="text-center mb-2"
              >
                <Row className="my-4 justify-content-center">
                  <Form.Group as={Col} md="6">
                    <Form.Floating className="mb-2">
                      <Form.Control
                        type="file"
                        onChange={(e) => set_itemImg(e.target.files[0])}
                        required
                      />
                    </Form.Floating>
                  </Form.Group>
                </Row>

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
