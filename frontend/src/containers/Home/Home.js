import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Container, Row, Col, Figure } from "react-bootstrap";
import { useNavigate, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

import Are_you_ready_to_order from "../../assets/are.png";
import Sandwiche from "../../assets/sandwich.png";
import Pizza from "../../assets/pizza.png";
import Chicken from "../../assets/fried_chiken.png";
import How_does_it_work from "../../assets/How Does It Work.png";
import Yellow_bg from "../../assets/yellow_bg.png";
import Rumen from "../../assets/rumen.png";

import Animation from "../../components/Animation";

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
  Paper,
  TextField,
  MenuItem,
} from "@mui/material";

import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

import { useTheme } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [shop, setShop] = useState([]);
  const [item, setItem] = useState([]);
  const [place, setPlace] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/gk/shop/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setShop(resp))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/gk/item/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setItem(resp))
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    navigate(`/shop/${value}`);
  };

  // const notify = () => {
  //   toast.success("successful", { autoClose: 3000 });
  // };

  // if (!isAuthenticated) {
  //   navigate("/login", { replace: true });
  // }
  return (
    <Container fluid>
      <Animation>
        <Row
          style={{
            backgroundImage: `url(${Yellow_bg})`,
          }}
        >
          <Col sm={1} />
          <Col sm={5} className="fs-1 p-5">
            <Row>
              <br />
            </Row>
            <Typography
              component="div"
              variant="h2"
              className="fw-bold text-white"
            >
              Are you starving?
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              component="div"
              className="fw-bold"
            >
              Within a few clicks, get homemade foods to fill your tummy
            </Typography>

            <Row className="my-2">
              <TextField
                className="text-center text-white"
                label="Select Place"
                select
                size="small"
                color="warning"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              >
                <MenuItem value="Banani">Banani</MenuItem>
                <MenuItem value="Dhanmondi">Dhanmondi</MenuItem>
                <MenuItem value="Motijheel">Motijheel</MenuItem>
              </TextField>

              <Button
                className="my-2"
                size="large"
                color="error"
                variant="contained"
                onClick={() => {
                  navigate(`/shop/${place}`);
                }}
              >
                Search Place{" "}
              </Button>
            </Row>
            <Row>
              <br />
            </Row>
          </Col>

          <Col
            sm
            style={{
              backgroundImage: `url(${Rumen})`,
            }}
          />
        </Row>
        <Row>
          <br />
        </Row>
        <Row>
          <Grid container spacing={2}>
            {shop
              .filter((sd) => sd.offerBDT > 0 || sd.offerPercentage > 0)
              .map((row) => (
                <Grid item xs={12} sm={4} key={row.id}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Card>
                      <CardActionArea
                        onClick={() => navigate(`/shops/${row.shopName}`)}
                      >
                        <CardContent
                          style={{
                            background: "#fecb15",
                          }}
                        >
                          {row.offerBDT > 0 ? (
                            <Typography
                              className="shadow-lg rounded-3 text-white text-center fw-bold p-2 fs-1"
                              style={{
                                background: "#dc3545",
                              }}
                            >
                              <LocalOfferIcon size="large" className="fs-1" />{" "}
                              {row.offerBDT} BDT{" "}
                            </Typography>
                          ) : null}

                          {row.offerPercentage > 0 ? (
                            <Typography
                              className="shadow-lg rounded-3 text-white text-center fw-bold p-2 fs-1"
                              style={{
                                background: "#dc3545",
                              }}
                            >
                              <LocalOfferIcon size="large" className="fs-1" />{" "}
                              {row.offerPercentage}%
                            </Typography>
                          ) : null}
                          <Typography className="mt-4 fw-bold fs-2 text-center text-white">
                            <LocalDiningIcon
                              color="error"
                              size="large"
                              className="fs-2"
                            />{" "}
                            {row.shopName}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            component="div"
                            className="text-center mb-4 text-white"
                          >
                            <AddLocationIcon color="error" size="large" />{" "}
                            {row.detailedAddr}
                          </Typography>

                          <Typography
                            className="shadow-lg rounded-3 text-center p-2 fs-4 text-white"
                            style={{
                              background: "#dc3545",
                            }}
                          >
                            <AccessTimeFilledIcon
                              size="large"
                              className="fs-4"
                            />{" "}
                            {row.offerTill}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
          </Grid>
        </Row>
        <Row>
          <br />
          <br />
        </Row>
        <Row>
          <Figure className="shadow-lg rounded-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.9 }}>
              <Figure.Image src={How_does_it_work} />
            </motion.div>
          </Figure>
        </Row>
        <Row>
          <Col
            sm
            className="fs-1 text-center fw-bold mb-5 mt-5"
            style={{ color: "#F17228" }}
          >
            Popular Items
          </Col>
        </Row>
        <Row className="mx-2">
          <br />
          <Grid container spacing={2}>
            {item.slice(0, 8).map((row) => (
              <Grid item xs={12} sm={3} key={row.id}>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Card>
                    <CardActionArea
                      onClick={() => navigate(`/item/${row.itemName}`)}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={row.itemImg}
                        alt="green iguana"
                      />
                      <CardContent
                        className="text-center"
                        style={{ color: "#F17228" }}
                      >
                        <Typography variant="h5" className=" fw-bold ">
                          <FastfoodIcon size="large" className="fs-4" />{" "}
                          {row.itemName}
                        </Typography>

                        <Typography variant="h5" className=" fw-bold ">
                          ৳ {row.cost}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Row>
        <Row>
          <br />
          <br />
        </Row>
        <Row
          className="p-5 my-2"
          style={{
            backgroundImage: `url(${Are_you_ready_to_order})`,
          }}
        >
          <Col sm className="text-white fs-1 text-center fw-bold p-5">
            <br />
            Are you ready to order with
            <br />
            the best deals?
            <br />
          </Col>
        </Row>
        <Row>
          <Col sm={1} />
          <Col sm className="mt-5">
            <Card xs={12} sm={6} sx={{ display: "flex" }}>
              <Col sm={3} className=" align-self-center my-3">
                <CardContent>
                  <Typography component="div" variant="h4" className="fw-bold">
                    Best deals{" "}
                    <span style={{ color: "#FFBD2D" }}>Crispy Sandwiches</span>
                  </Typography>
                  <br />
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    Enjoy the large size of sandwiches. Complete perfect slice
                    of sandwiches.
                  </Typography>
                  <br />
                  <br />
                  <div className="text-center">
                    {" "}
                    <motion.div whileHover={{ scale: 1.2 }}>
                      <Button
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForwardIosOutlinedIcon />}
                        style={{ background: "#FFBD2D" }}
                      >
                        Proceed to order
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Col>
              <CardMedia
                component="img"
                sx={{ height: 450 }}
                image={Sandwiche}
                alt="Live from space album cover"
              />
            </Card>
          </Col>
          <Col sm={1} />
        </Row>
        <Row>
          <br />
          <br />
        </Row>
        <Row>
          <Col sm={1} />
          <Col sm>
            <Card sx={{ display: "flex" }}>
              <CardMedia
                component="img"
                sx={{ height: 450 }}
                image={Chicken}
                alt="Live from space album cover"
              />
              <Col sm={3} className=" align-self-center my-3">
                <CardContent>
                  <Typography component="div" variant="h4" className="fw-bold">
                    Celebrate parties with{" "}
                    <span style={{ color: "#FFBD2D" }}>Fried Chicken</span>
                  </Typography>
                  <br />
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    Get the best fried chicken smeared with a lip smacking lemon
                    chili flavor. Check out best deals for fried chicken.
                  </Typography>
                  <br />
                  <br />
                  <div className="text-center">
                    {" "}
                    <motion.div whileHover={{ scale: 1.2 }}>
                      <Button
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForwardIosOutlinedIcon />}
                        style={{ background: "#FFBD2D" }}
                      >
                        Proceed to order
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Col>
            </Card>
          </Col>
          <Col sm={1} />
        </Row>
        <Row>
          <br />
          <br />
        </Row>
        <Row>
          <Col sm={1} />
          <Col sm className="mb-5">
            <Card sx={{ display: "flex" }}>
              <Col sm={3} className=" align-self-center my-3">
                <CardContent>
                  <Typography component="div" variant="h4" className="fw-bold">
                    Wanna eat hot & spicy{" "}
                    <span style={{ color: "#FFBD2D" }}>Pizza?</span>
                  </Typography>
                  <br />
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    Pair up with a friend and enjoy the hot and crispy pizza
                    pops. Try it with the best deals.
                  </Typography>
                  <br />
                  <br />
                  <div className="text-center">
                    {" "}
                    <motion.div whileHover={{ scale: 1.2 }}>
                      <Button
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForwardIosOutlinedIcon />}
                        style={{ background: "#FFBD2D" }}
                      >
                        Proceed to order
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Col>
              <CardMedia
                component="img"
                sx={{ height: 450 }}
                image={Pizza}
                alt="Live from space album cover"
              />
            </Card>
          </Col>
          <Col sm={1} />
        </Row>
      </Animation>
    </Container>
  );
}
