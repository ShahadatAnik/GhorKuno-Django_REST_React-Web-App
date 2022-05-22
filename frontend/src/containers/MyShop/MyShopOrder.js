import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Figure } from "react-bootstrap";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import MyShopOrderList from "./MyShopOrderList";
import MyShopOrderHistory from "./MyShopOrderHistory";

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

import { FavoriteIcon, FavoriteBorderIcon } from "@mui/icons-material";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";

export default function MyShopOrder(props) {
  const [itemList, setItemList] = useState([]);

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
      .then((resp) => setItemList(resp))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Container fluid>
      {itemList
        .filter((sd) => sd.shopID === props.shop.id)
        .map((item) => (
          <>{item.id ? <MyShopOrderList item={item} /> : null}</>
        ))}
      <br />
      <br />
      <Row>
        <Col sm={1} />
        <Col
          className="p-4 rounded-3 text-center text-white fs-1 fw-bold "
          style={{
            background: "#dc3545",
          }}
        >
          Orders History
        </Col>
        <Col sm={1} />
      </Row>
      <br />

      {itemList
        .filter((sd) => sd.shopID === props.shop.id)
        .map((item) => (
          <>{item.id ? <MyShopOrderHistory item={item} /> : null}</>
        ))}
    </Container>
  );
}
