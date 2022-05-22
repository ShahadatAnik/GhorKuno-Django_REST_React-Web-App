import React, { useState, useEffect } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Container, Row, Col, Figure } from "react-bootstrap";
import ApiService from "../../ApiService";
import { ToastContainer, toast } from "react-toastify";

import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import UserInfo from "./UserInfo";
import UserInfoForm from "./UserInfoForm";
import UserProfilePicForm from "./UserProfilePicForm";
import UserInfoProfilePic from "./UserInfoProfilePic";
import OrderHistoryItemInfo from "./OrderHistoryItemInfo";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";

import Animation from "../Animation";

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

import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

const UserInfoIndex = ({ isAuthenticated }) => {
  const [authUser, setAuthUser] = useState([]);
  const [userList, setUserList] = useState([]);

  const [orderList, setOrderList] = useState([]);

  const [editUserInfo, setEditUserInfo] = useState(null);
  const [isUpdateBtn, setIsUpdateBtn] = useState(false);
  const [isUpdateBtn_ProfilePic, setIsUpdateBtn_ProfilePic] = useState(false);

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
      .then((res) => setAuthUser(res.data))
      .catch((error) => console.log(error));
  }, [isAuthenticated]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/accounts/userInfo/`, config)
      .then((res) => setUserList(res.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/gk/order/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setOrderList(resp))
      .catch((error) => console.log(error));
  }, []);

  const [user] = userList.filter(
    (userData) => userData.user_id === authUser.id
  );

  const editBtn = (new_user) => {
    setEditUserInfo(new_user);
    setIsUpdateBtn(true);
  };

  const editBtn_ProfilePic = (new_user) => {
    setEditUserInfo(new_user);
    setIsUpdateBtn_ProfilePic(true);
  };

  const updatedInformation = (new_) => {
    const new_userList = userList.map((old_) => {
      if (new_.id === old_.id) {
        return new_;
      } else {
        return old_;
      }
    });

    setUserList(new_userList);
    setIsUpdateBtn(false);
    setIsUpdateBtn_ProfilePic(false);
  };

  const userInfoForm = () => {
    setEditUserInfo({
      first_name: "",
      last_name: "",
      house_name: "",
      road_no: "",
      block_no: "",
      area: "",
      city: "",
      district: "",
      mobilePhone: "",
    });
  };

  const navigate = useNavigate();
  const reset_password_btn_click = () => {
    navigate("/reset-password");
  };

  const deleteStatusUser = (sr) => {
    const new_sr = orderList.filter((my_sr) => {
      if (my_sr.id === sr.id) {
        return false;
      }
      return true;
    });

    setOrderList(new_sr);
  };

  const updateStatusUser = (new_) => {
    const new_userList = orderList.map((old_) => {
      if (new_.id === old_.id) {
        return new_;
      } else {
        return old_;
      }
    });

    setOrderList(new_userList);
  };

  const UpdateStatusUser = (route_orderID) => {
    ApiService.UpdateStatusUser(route_orderID.id)
      .then(() => notify(`You have mark done Received `, "success"))
      .then(() => updateStatusUser(route_orderID))
      .then(() => deleteStatusUser(route_orderID))
      .catch((error) => console.log(error));
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
    <Container fluid>
      <Row>
        <Col sm={1} />
        <Col
          className="p-4 rounded-3 text-center text-white fs-1 fw-bold "
          style={{
            background: "#dc3545",
          }}
        >
          Profile
        </Col>
        <Col sm={1} />
      </Row>
      <Animation>
        <br />
        <Row className="d-flex">
          <Col sm={2} />
          <Col
            sm={4}
            className="text-center rounded justify-content-center"
            style={{
              background: "#FFBD2D",
            }}
          >
            {user && user.profile_pic ? (
              <UserInfoProfilePic
                userInfo={user}
                editBtn_ProfilePic={editBtn_ProfilePic}
                userInfoForm={userInfoForm}
              />
            ) : (
              <h1 className="text-white fw-bold p-5">
                Please update your profile pic.
                <br className="my-2"/>
                <Col className="justify-content-center">
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<UpdateOutlinedIcon />}
                    onClick={() => editBtn_ProfilePic(user)}
                    style={{
                      width: "60%",
                      background: "#dc3545",
                    }}
                  >
                    Update Your Profile Picture
                  </Button>
                </Col>
              </h1>
            )}
          </Col>
          <Col
            sm={4}
            className=" p-4 rounded text-white d-flex align-items-center"
            style={{
              background: "#FFBD2D",
            }}
          >
            {user && user.first_name !== "" ? (
              <UserInfo
                userInfo={user}
                editBtn={editBtn}
                userInfoForm={userInfoForm}
              />
            ) : (
              <div className="text-white fs-3 fw-bold p-5">
                Your profile is not updated yet..
                <br /> Please update your profile info first.
                <br />
                <Row>
                  <Col sm>
                    <Button
                    variant="contained"
                    size="large"
                    startIcon={<UpdateOutlinedIcon />}
                    onClick={() => editBtn(user)}
                    style={{
                      background: "#dc3545",
                    }}
                  >
                    Update Your Info
                  </Button>
                  </Col>
                </Row>
              </div>
            )}
          </Col>
        </Row>
        <Row className="p-2">
          <Row>
            <Col sm={3} />
            <Col sm={6}>
              {isUpdateBtn ? (
                <UserInfoForm
                  userInfo={editUserInfo}
                  updatedInformation={updatedInformation}
                  isUpdateBtn={isUpdateBtn}
                />
              ) : null}
              {isUpdateBtn_ProfilePic ? (
                <UserProfilePicForm
                  userInfo={editUserInfo}
                  updatedInformation={updatedInformation}
                  isUpdateBtn_ProfilePic={isUpdateBtn_ProfilePic}
                />
              ) : null}
            </Col>
            <Col sm={3} />
          </Row>
        </Row>
        <Row className="my-5 justify-content-center">
          <Button
            className="text-white fw-bold fs-1 my-5"
            variant="contained"
            size="large"
            startIcon={
              <RestartAltRoundedIcon className="text-white fw-bold fs-1 " />
            }
            onClick={reset_password_btn_click}
            style={{
              background: "#F17228",
              width: "50%",
            }}
          >
            Reset password
          </Button>
        </Row>

        <Row>
          <Col sm={1} />
          <Col
            className="p-4 rounded-3 text-center text-white fs-1 fw-bold "
            style={{
              background: "#dc3545",
            }}
          >
            On Going Orders
          </Col>
          <Col sm={1} />
        </Row>
        <br />
        {orderList
          .filter(
            (sd) => sd.userID === authUser.id && sd.deliveryStatusUser === false
          )
          .map((item) => {
            return (
              <Container
                key={item.id}
                className="p-3 rounded-3 text-white fs-3 my-2 "
                style={{
                  background: "#FFBD2D",
                }}
              >
                <Row className="d-flex align-items-center">
                  {item.id ? <OrderHistoryItemInfo item={item} /> : null}
                  <Col sm className="fw-bold fs-2 ">
                    <strong
                      style={{
                        color: "#dc3545",
                      }}
                    >
                      Quantity:
                    </strong>{" "}
                    {item.quantity}
                    <br />
                    <br />
                    <span>
                      <strong
                        style={{
                          color: "#dc3545",
                        }}
                      >
                        Time:
                      </strong>{" "}
                      {item.timeStampCreated[11]}
                      {item.timeStampCreated[12]}
                      {item.timeStampCreated[13]}
                      {item.timeStampCreated[14]}
                      {item.timeStampCreated[15]} <br />
                      <strong
                        style={{
                          color: "#dc3545",
                        }}
                      >
                        Date:
                      </strong>{" "}
                      {item.timeStampCreated[8]}
                      {item.timeStampCreated[9]}
                      {item.timeStampCreated[7]}
                      {item.timeStampCreated[5]}
                      {item.timeStampCreated[6]}
                      {item.timeStampCreated[4]}
                      {item.timeStampCreated[0]}
                      {item.timeStampCreated[1]}
                      {item.timeStampCreated[2]}
                      {item.timeStampCreated[3]}
                    </span>
                    <br />
                  </Col>
                  <Col sm className="my-3 fw-bold fs-2">
                    <CheckCircleIcon
                      color="error"
                      size="large"
                      className="fs-1"
                    />{" "}
                    Item Processing <br />
                    {item.deliveryStatusWorker === true ? (
                      <CheckCircleIcon
                        color="error"
                        size="large"
                        className="fs-1"
                      />
                    ) : (
                      <DoDisturbOnOutlinedIcon
                        color="error"
                        size="large"
                        className="fs-1"
                      />
                    )}{" "}
                    On The way <br />
                    {item.deliveryStatusDeliveryboy === true ? (
                      <>
                        <CheckCircleIcon
                          color="error"
                          size="large"
                          className="fs-1"
                        />{" "}
                        Arrived at your door <br />
                        <br />
                        Have your received?{" "}
                        <Button
                          variant="contained"
                          size="large"
                          color="error"
                          startIcon={<CheckCircleIcon />}
                          onClick={() => {
                            UpdateStatusUser(item);
                          }}
                        >
                          {" "}
                          Done
                        </Button>
                      </>
                    ) : (
                      <>
                        <DoDisturbOnOutlinedIcon
                          color="error"
                          size="large"
                          className="fs-1"
                        />{" "}
                        Arrived at your door <br />
                      </>
                    )}
                  </Col>
                </Row>
              </Container>
            );
          })}
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

        {orderList
          .filter(
            (sd) =>
              sd.userID === authUser.id &&
              sd.deliveryStatusWorker === true &&
              sd.deliveryStatusUser === true &&
              sd.deliveryStatusDeliveryboy === true
          )
          .map((item) => {
            return (
              <Container
                key={item.id}
                className="p-3 rounded-3 text-white fs-3 my-2 "
                style={{
                  background: "#FFBD2D",
                }}
              >
                <Row className="d-flex align-items-center">
                  {item.id ? <OrderHistoryItemInfo item={item} /> : null}
                  <Col sm={7} className="fw-bold fs-2 ">
                    <strong
                      style={{
                        color: "#dc3545",
                      }}
                    >
                      Quantity:
                    </strong>{" "}
                    {item.quantity}
                    <br />
                    <br />
                    <span>
                      <strong
                        style={{
                          color: "#dc3545",
                        }}
                      >
                        Time:
                      </strong>{" "}
                      {item.timeStampUpdated[11]}
                      {item.timeStampUpdated[12]}
                      {item.timeStampUpdated[13]}
                      {item.timeStampUpdated[14]}
                      {item.timeStampUpdated[15]} <br />
                      <strong
                        style={{
                          color: "#dc3545",
                        }}
                      >
                        Date:
                      </strong>{" "}
                      {item.timeStampUpdated[8]}
                      {item.timeStampUpdated[9]}
                      {item.timeStampUpdated[7]}
                      {item.timeStampUpdated[5]}
                      {item.timeStampUpdated[6]}
                      {item.timeStampUpdated[4]}
                      {item.timeStampUpdated[0]}
                      {item.timeStampUpdated[1]}
                      {item.timeStampUpdated[2]}
                      {item.timeStampUpdated[3]}
                    </span>
                    <br />
                  </Col>
                </Row>
              </Container>
            );
          })}
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
};

export default UserInfoIndex;
