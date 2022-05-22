import React, { useState, useEffect } from "react";
import { Container, Row, Col, Figure, ProgressBar } from "react-bootstrap";

import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#dc3545",
  },
  "& .MuiRating-iconHover": {
    color: "#dc3545",
  },
});

export default function ItemReviewUserInfo(props) {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/accounts/userInfo/${props.user.userID}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((result) => setUserInfo(result))
      .catch((error) => console.log(error));
  }, [props.userId]);
  return (
    <Row>
      <Col sm={1}>
        <Avatar
          alt={userInfo.first_name}
          src={userInfo.profile_pic}
          sx={{ width: 56, height: 56 }}
        />
      </Col>
      <Col sm className="fs-2 fw-bold">
        {userInfo.first_name} {userInfo.last_name}{" "}
      </Col>
      <Col sm={3} className="text-uppercase fs-2">
        <StyledRating
          size="large"
          value={props.user.rating}
          getLabelText={(value) => `${value} Heart${value !== 1 ? "x" : ""}`}
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          readOnly
        />
      </Col>
    </Row>
  );
}
