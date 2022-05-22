import React, { useState, useLayoutEffect } from "react";
import ApiService from "../../ApiService";
import { Container, Row, Col, Figure } from "react-bootstrap";
import CartItemShopInfo from "./CartItemShopInfo";
import Chip from "@mui/material/Chip";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button, IconButton, ButtonGroup } from "@mui/material";
import { withStyles } from "@material-ui/core/styles";

import { ToastContainer, toast } from "react-toastify";

export default function CartList(props) {
  const [item, setItem] = useState([]);
  const [sum, setSum] = useState(0);

  useLayoutEffect(() => {
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
  }, [props.cartItemInfo]);

  const CustomColorIconButton = withStyles({
    root: {
      color: "#dc3545",
    },
  })(IconButton);

  const deleteBtn = (item) => {
    ApiService.DeleteCartItem(item.id)
      .then(() => props.deleteBtn(item))
      .then(() =>
        notify(`Item has been successfully Deleted from the cart`, "error")
      )
      .catch((error) => console.log(error));
  };

  const deleteForOrder = (item) => {
    ApiService.DeleteCartItem(item.id)
      .then(() => props.deleteBtn(item))
      .catch((error) => console.log(error));
  };

  const updateQuantityInclement = () => {
    ApiService.UpdateItemQuantity(
      props.cartItemInfo.id,
      props.cartItemInfo.quantity + 1
    )
      .then((resp) => props.updatedQuantity(resp.data))
      .catch((error) => console.log(error));
  };
  const updateQuantityDecrement = () => {
    ApiService.UpdateItemQuantity(
      props.cartItemInfo.id,
      props.cartItemInfo.quantity - 1
    )
      .then((resp) => props.updatedQuantity(resp.data))
      .catch((error) => console.log(error));
  };

  const order = (item, totalPrice) => {
    ApiService.InsertOrder(item.userID, item.itemID, item.quantity, totalPrice)
      .then(() =>
        notify(
          `Your item has been added to order.
          \nPlease Payment the item first and
          \nCheck your profile.
          \nThank you.`,
          "success"
        )
      )
      .then(() => deleteForOrder(item))
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
    if (type === "error") {
      toast.error(`${toast_text}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      {item &&
        item
          .filter((sd) => sd.id === props.cartItemInfo.itemID)
          .map((item) => {
            return (
              <Container
                key={item.id}
                className="p-3 rounded-3 text-white fs-3 my-2 "
                style={{
                  background: "#FFBD2D",
                }}
              >
                <Row>
                  {item.shopID ? <CartItemShopInfo shopID={item} /> : null}
                </Row>
                <Row className="d-flex align-items-center">
                  <Col sm={3} className="fw-bold text-center my-3">
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
                  <Col sm={7} className="fw-bold fs-2 ">
                    <strong
                      style={{
                        color: "#dc3545",
                      }}
                    >
                      Unit Price:
                    </strong>{" "}
                    {item.cost} ৳
                    <br />
                    <strong
                      style={{
                        color: "#dc3545",
                      }}
                    >
                      Quantity:
                    </strong>{" "}
                    {props.cartItemInfo.quantity < 2 ? (
                      <CustomColorIconButton
                        color="error"
                        size="large"
                        onClick={updateQuantityDecrement}
                        disabled
                      >
                        <RemoveIcon />
                      </CustomColorIconButton>
                    ) : (
                      <CustomColorIconButton
                        color="error"
                        size="large"
                        onClick={updateQuantityDecrement}
                      >
                        <RemoveIcon />
                      </CustomColorIconButton>
                    )}
                    <span className="text-white fw-bold fs-3 mx-3">
                      {props.cartItemInfo.quantity}
                    </span>
                    {props.cartItemInfo.quantity > 9 ? (
                      <CustomColorIconButton
                        color="error"
                        size="large"
                        onClick={updateQuantityInclement}
                        disabled
                      >
                        <AddIcon />
                      </CustomColorIconButton>
                    ) : (
                      <CustomColorIconButton
                        color="error"
                        size="large"
                        onClick={updateQuantityInclement}
                      >
                        <AddIcon />
                      </CustomColorIconButton>
                    )}
                    <br />
                    <strong
                      style={{
                        color: "#dc3545",
                      }}
                    >
                      Total Price:
                    </strong>{" "}
                    {item.cost * props.cartItemInfo.quantity} ৳
                    <br />
                  </Col>
                  <Col sm={1} className="text-center align-self-center my-3">
                    <ButtonGroup
                      variant="contained"
                      orientation="vertical"
                      color="error"
                      size="large"
                      disableElevation
                      className="fs-1 fw-bold"
                    >
                      <Button
                        color="success"
                        onClick={() =>
                          order(
                            props.cartItemInfo,
                            item.cost * props.cartItemInfo.quantity
                          )
                        }
                      >
                        Order
                      </Button>
                      <br />
                      <Button onClick={() => deleteBtn(props.cartItemInfo)}>
                        Delete
                      </Button>
                    </ButtonGroup>
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
    </div>
  );
}
