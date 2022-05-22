import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../../ApiService";
import { Container, Row, Col, Figure, ProgressBar } from "react-bootstrap";
import { motion } from "framer-motion";
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
} from "@mui/material";
import axios from "axios";

import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { styled } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";

import ItemReview from "./ItemReview";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff3d47",
  },
  "& .MuiRating-iconHover": {
    color: "#ff6d75",
  },
});

export default function IndividualItem({ isAuthenticated }) {
  const [item, setItem] = useState([]);
  const { itemName, shopName } = useParams();

  const [userID, setUserID] = useState([]);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config)
      .then((res) => setUserID(res.data.id))
      .catch((error) => console.log(error));
  }, [isAuthenticated]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/gk/item/${itemName}/`, {
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
  }, [itemName]);

  const orderRouter = (item) => {
    let quantity = 1;
    // navigate(`${item.itemName}`);
    ApiService.InsertAddToCart(userID, item.id, quantity);
    notify(`${item.itemName} has been added to your cart.`, "success");
  };

  const notify = (toast_text, type) => {
    if (type === "success") {
      toast.success(`${toast_text}`, {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <Container fluid="sm">
      <Row>
        <Col
          sm
          className="shadow-lg p-4 rounded-3 text-center text-white text-wrap fs-1 fw-bold "
          style={{
            background: "#dc3545",
          }}
        >
          {item.itemName}
        </Col>
      </Row>
      <br />
      <Animation>
        <Row>
          <Grid item xs={3} />
          <Grid item xs={6} className="text-center">
            <Card>
              <CardMedia
                component="img"
                height="500"
                image={item.itemImg}
                alt={item.itemName}
              />
              <CardContent style={{ color: "#F17228" }}>
                <Typography>
                  {item.accumulatedRating ? (
                    <span className="fw-bold">
                      <StyledRating
                        size="large"
                        value={item.accumulatedRating}
                        getLabelText={(value) =>
                          `${value} Heart${value !== 1 ? "s" : ""}`
                        }
                        precision={0.5}
                        icon={<FavoriteIcon fontSize="inherit" />}
                        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                        readOnly
                      />
                    </span>
                  ) : null}
                </Typography>
                <Typography variant="h4" className="my-3 fw-bold">
                  ৳ {item.cost}
                </Typography>
                <Typography variant="h5" className="fw-bold">
                  {item.itemDetail}
                </Typography>
              </CardContent>
              <CardActions className=" m-2 justify-content-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  style={{
                    width: "80%",
                  }}
                >
                  <Button
                    className="fs-4 text-white"
                    variant="contained"
                    size="large"
                    startIcon={<ShoppingCartOutlinedIcon />}
                    onClick={() => orderRouter(item)}
                    style={{
                      background: "#F17228",
                      width: "80%",
                    }}
                  >
                    Add to Cart
                  </Button>
                </motion.div>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={3} />
        </Row>
        <Row>
          <br />
        </Row>
        <Row>
          <Col
            sm
            className="shadow-lg p-4 rounded-3 text-center text-white text-wrap fs-1 fw-bold "
            style={{
              background: "#dc3545",
            }}
          >
            Reviews
          </Col>
        </Row>
        <Row>
          <br />
        </Row>
        <Row className="p-2">
          <Col sm={12}>{item.id ? <ItemReview itemId={item.id} /> : ""}</Col>
        </Row>
        <ToastContainer
          autoClose={8000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable={false}
          pauseOnHover
          className="text-center fs-5 fw-bold"
        />
      </Animation>
    </Container>
  );
}
