import { useState, useEffect } from "react";
import axios from "axios";
import ApiService from "../../ApiService";
import { ToastContainer, toast } from "react-toastify";

import { Link, useLocation, useNavigate } from "react-router-dom";

import FastfoodIcon from "@mui/icons-material/Fastfood";

import Grid from "@material-ui/core/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff3d47",
  },
  "& .MuiRating-iconHover": {
    color: "#ff6d75",
  },
});

const ShopItems = (props, { isAuthenticated }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
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
    fetch(`${process.env.REACT_APP_API_URL}/gk/item/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setItems(resp))
      .catch((error) => console.log(error));
  }, [props.shopId]);

  items
    .filter((it) => it.shopID === props.shopId)
    .map((filteredPerson) => console.log(filteredPerson.itemName));

  const orderRouter = (item) => {
    let quantity = 1;
    // navigate(`${item.itemName}`);
    ApiService.InsertAddToCart(userID, item.id, quantity);
    notify(
      `${item.itemName} from ${props.shop.shopName} has been added to your cart.`,
      "success"
    );
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
    <>
      <Grid container spacing={3}>
        {items
          .filter((it) => it.shopID === props.shop.id)
          .map((row) => (
            <Grid item xs={12} sm={6} key={row.id}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card className="text-center">
                  <CardActionArea onClick={() => navigate(`${row.itemName}`)}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={row.itemImg}
                      alt={row.itemName}
                    />
                    <CardContent style={{ color: "#F17228" }}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        className="fw-bold mb-2"
                      >
                        <FastfoodIcon size="large" className="fs-4" />{" "}
                        {row.itemName}
                      </Typography>

                      <Typography variant="h6" className="fw-bold mb-2">
                        ৳ {row.cost}
                      </Typography>
                      <Typography>
                        {row.accumulatedRating ? (
                          <span className="fw-bold">
                            <StyledRating
                              value={row.accumulatedRating}
                              getLabelText={(value) =>
                                `${value} Heart${value !== 1 ? "s" : ""}`
                              }
                              precision={0.5}
                              icon={<FavoriteIcon fontSize="inherit" />}
                              emptyIcon={
                                <FavoriteBorderIcon fontSize="inherit" />
                              }
                              readOnly
                            />
                          </span>
                        ) : null}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions className=" m-2 justify-content-center">
                    <Button
                      className="fw-2 text-white"
                      variant="contained"
                      size="large"
                      color="error"
                      startIcon={<ShoppingCartOutlinedIcon />}
                      style={{
                        background: "#dc3545",
                        width: "100%",
                      }}
                      onClick={() => orderRouter(row)}
                    >
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
      </Grid>
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
    </>
  );
};

export default ShopItems;
