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

export default function UserProfilePicForm(props) {
  const [profile_pic, set_profile_pic] = useState(props.userInfo.profile_pic);

  useEffect(() => {
    set_profile_pic(props.userInfo.profile_pic);
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
    ApiService.UpdateUserInfo_ProfilePic(
      props.userInfo.user_id,
      profile_pic
    ).then((resp) => {
      props.updatedInformation(resp.data);
    });
  };
  return (
    <Container fluid>
      {props.userInfo ? (
        <motion.div animate={{ scale: 1.1 }} transition={{ duration: 0.5 }}>
          <Row className="my-4">
            <Form
              noValidate
              validated={validated}
              onSubmit={(e) => onSubmit(e)}
              // className="text-center mb-2"
            >
              <Form.Group>
                <Form.Floating className="mb-2">
                  <Form.Control
                    type="file"
                    // value={profile_pic}
                    onChange={(e) => set_profile_pic(e.target.files[0])}
                    required
                  />
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
      ) : null}
    </Container>
  );
}
