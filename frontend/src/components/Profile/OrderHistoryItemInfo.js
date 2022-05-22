import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Figure } from "react-bootstrap";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

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

import Chip from "@mui/material/Chip";

export default function OrderHistoryItemInfo(props) {
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
    <>
      {itemList
        .filter((sd) => sd.id === props.item.itemID)
        .map((item) => (
          <Col sm={3} className="fw-bold text-center ">
            <Figure>
              <Figure.Image
                width={250}
                alt={item.itemName}
                src={item.itemImg}
                thumbnail
              />
              <Figure.Caption>
                <Chip
                  // variant="outlined"
                  color="error"
                  label={item.itemName}
                  className="fs-3 p-3"
                />
              </Figure.Caption>
            </Figure>
          </Col>
        ))}
    </>
  );
}
