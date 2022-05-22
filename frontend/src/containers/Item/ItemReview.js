import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ApiService from "../../ApiService";
import axios from "axios";
import ItemReviewUserInfo from "./ItemReviewUserInfo";

import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { styled } from "@mui/material/styles";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

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

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#FFBD2D",
  },
  "& .MuiRating-iconHover": {
    color: "#FFBD2D",
  },
});

export default function ItemReview(props, { isAuthenticated }) {
  const [itemReview, setItemReview] = useState([]);

  const [isUpdateComment, setIsUpdateComment] = useState(false);

  const [commentId, setCommentId] = useState();
  const [itemID] = useState(props.itemId);
  const [userID, setUserID] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/gk/review/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setItemReview(resp))
      .catch((error) => console.log(error));
  }, [props.itemId]);

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
  }, [props.itemId]);

  const insertComment = () => {
    ApiService.InsertComment(userID, itemID, rating, comment)
      .then((resp) => setItemReview(...itemReview, resp.data))
      .then(window.location.reload(false))
      .then(setRating(0))
      .then(setComment(""));
  };

  const deleteComment = (sr) => {
    const new_sr = itemReview.filter((my_sr) => {
      if (my_sr.id === sr.id) {
        return false;
      }
      return true;
    });

    setItemReview(new_sr);
  };

  const deleteBtn = (sr) => {
    ApiService.DeleteComment(sr.id)
      .then(() => deleteComment(sr))

      .catch((error) => console.log(error));
  };

  const updateBtn = (sr) => {
    setIsUpdateComment(true);
    setComment(sr.comment);
    setRating(sr.rating);
    setCommentId(sr.id);
  };

  const updatedComment = (sr) => {
    const new_sr = itemReview.map((my_sr) => {
      if (my_sr.id === sr.id) {
        return sr;
      } else {
        return my_sr;
      }
    });

    setItemReview(new_sr);
  };

  const userCommentUpdate = () => {
    if (!comment) {
      return alert("Please write something to update the comment.");
    } else {
      return ApiService.UpdateComment(
        commentId,
        userID,
        itemID,
        rating,
        comment
      )
        .then((resp) => updatedComment(resp.data))
        .then(setIsUpdateComment(false))
        .then(setComment(""))
        .then(setRating(0))
        .catch((error) => console.log(error));
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col sm={2}></Col>
        <Col sm>
          {itemReview
            .filter((sd) => sd.itemID === props.itemId)
            .map((sr) => {
              return (
                <div key={sr.id}>
                  <Row
                    className="shadow rounded-3 text-white p-3"
                    style={{
                      background: "#FFBD2D",
                    }}
                  >
                    <p>
                      {sr.userID ? <ItemReviewUserInfo user={sr} /> : null}
                      <h4
                        className="my-3 mx-2 fs-3"
                        style={{
                          color: "#dc3545",
                        }}
                      >
                        {sr.comment}
                      </h4>
                      <span className="my-3 mx-2 fw-bold ">
                        <strong
                          style={{
                            color: "#dc3545",
                          }}
                        >
                          Time:{" "}
                        </strong>{" "}
                        {sr.timeStampUpdated[11]}
                        {sr.timeStampUpdated[12]}
                        {sr.timeStampUpdated[13]}
                        {sr.timeStampUpdated[14]}
                        {sr.timeStampUpdated[15]}{" "}
                        <strong
                          style={{
                            color: "#dc3545",
                          }}
                        >
                          {" "}
                          Date:
                        </strong>{" "}
                        {sr.timeStampUpdated[8]}
                        {sr.timeStampUpdated[9]}
                        {sr.timeStampUpdated[7]}
                        {sr.timeStampUpdated[5]}
                        {sr.timeStampUpdated[6]}
                        {sr.timeStampUpdated[4]}
                        {sr.timeStampUpdated[0]}
                        {sr.timeStampUpdated[1]}
                        {sr.timeStampUpdated[2]}
                        {sr.timeStampUpdated[3]}
                      </span>
                      <br />
                    </p>

                    <br />
                    {sr.userID === userID ? (
                      <div className="">
                        <Button
                          variant="outlined"
                          size="large"
                          color="error"
                          startIcon={<UpdateOutlinedIcon />}
                          className="text-white mx-2"
                          onClick={() => updateBtn(sr)}
                          style={{
                            background: "#dc3545",
                          }}
                        >
                          Update
                        </Button>{" "}
                        <Button
                          variant="outlined"
                          size="large"
                          color="error"
                          startIcon={<DeleteForeverOutlinedIcon />}
                          onClick={() => deleteBtn(sr)}
                          className="text-white"
                          style={{
                            background: "#dc3545",
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    ) : null}
                  </Row>

                  <br />
                </div>
              );
            })}

          <div
            className="shadow-lg rounded-3 text-white p-3 my-2"
            style={{
              width: "100%",
              background: "#dc3545",
            }}
          >
            <span className="fw-bold fs-2 mx-2">
              Select Rating:{" "}
              <span>
                <StyledRating
                  onChange={(_, value) => {
                    setRating(value);
                  }}
                  size="large"
                  value={rating}
                  getLabelText={(value) =>
                    `${value} Heart${value !== 1 ? "x" : ""}`
                  }
                  icon={<FavoriteIcon fontSize="inherit" />}
                  emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                />
              </span>
            </span>
            <br />
            <br />
            <textarea
              type="text"
              className="form-control"
              rows="5"
              placeholder="Write Comment"
              style={{
                width: "100%",
              }}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <br />
            {isUpdateComment ? (
              <div class="col text-center text-white ">
                <Button
                  variant="outlined"
                  size="large"
                  color="error"
                  startIcon={<UpdateOutlinedIcon />}
                  onClick={userCommentUpdate}
                  className="btn btn-lg text-white fs-4 fw-bold"
                  style={{
                    width: "100%",
                    background: "#FFBD2D",
                  }}
                >
                  Update
                </Button>
              </div>
            ) : (
              <div class="text-center text-white">
                <Button
                  variant="outlined"
                  size="large"
                  color="error"
                  endIcon={<SendRoundedIcon />}
                  onClick={insertComment}
                  className="btn btn-lg text-white fs-4 fw-bold"
                  style={{
                    width: "100%",
                    background: "#FFBD2D",
                  }}
                >
                  Post
                </Button>
              </div>
            )}
          </div>
        </Col>
        <Col sm={2}></Col>
      </Row>
    </Container>
  );
}
