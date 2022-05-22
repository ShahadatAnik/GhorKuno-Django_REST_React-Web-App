import { Button } from "@mui/material";
import axios from "axios";
import { useState, useLayoutEffect } from "react";
import { Container, Row, Col, Figure } from "react-bootstrap";
import CartList from "./CartList";

import Animation from "../../components/Animation";

export default function Cart({ isAuthenticated }) {
  const [cart, setCart] = useState([]);
  const [userID, setUserID] = useState([]);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };

  useLayoutEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config)
      .then((res) => setUserID(res.data.id))
      .catch((error) => console.log(error));
  }, [isAuthenticated]);

  useLayoutEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/gk/cart/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setCart(resp))
      .catch((error) => console.log(error));
  }, []);

  const updatedQuantity = (new_) => {
    const new_cart = cart.map((old_) => {
      if (new_.id === old_.id) {
        return new_;
      } else {
        return old_;
      }
    });

    setCart(new_cart);
  };

  const deleteBtn = (item) => {
    const new_items = cart.filter((my_item) => {
      if (my_item.id === item.id) {
        return false;
      }
      return true;
    });

    setCart(new_items);
  };

  const userCart = cart.filter((sd) => sd.userID === userID);

  let price = 0;
  const totalPrice_func = (itemPrice) => {
    price = itemPrice + price;
  };

  return (
    <Container fluid>
      <Row>
        <Col sm={1}></Col>
        <Col
          sm
          className="p-4 rounded-3 text-center text-white fs-1 fw-bold "
          style={{
            background: "#dc3545",
          }}
        >
          Cart
        </Col>

        <Col sm={1}></Col>
      </Row>
      <Animation>
        <Row>
          <br />
        </Row>
        <Row>
          {cart
            .filter((sd) => sd.userID === userID)
            .map((item) => {
              return (
                <div key={item.id}>
                  {item.itemID ? (
                    <CartList
                      cartItemInfo={item}
                      updatedQuantity={updatedQuantity}
                      deleteBtn={deleteBtn}
                      totalPrice={totalPrice_func}
                    />
                  ) : null}
                </div>
              );
            })}
        </Row>
      </Animation>
    </Container>
  );
}
