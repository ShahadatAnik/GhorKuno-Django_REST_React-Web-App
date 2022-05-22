import React, { useEffect, useState } from "react";
import { Container, Row, Col, Figure } from "react-bootstrap";
import ApiService from "../../ApiService";

import Chip from "@mui/material/Chip";
import { Button, IconButton, ButtonGroup } from "@mui/material";
import { withStyles } from "@material-ui/core/styles";

import { ToastContainer, toast } from "react-toastify";

export default function MyShopOrderHistory(props) {
  const [orderList, setOrderList] = useState([]);

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
  }, [props.item]);

  return (
    <div>
      {orderList
        .filter(
          (sd) =>
            sd.itemID === props.item.id && sd.deliveryStatusWorker === true
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
                <Col sm={3} className="fw-bold text-center ">
                  <Figure>
                    <Figure.Image
                      width={250}
                      alt={props.item.itemName}
                      src={props.item.itemImg}
                      thumbnail
                    />
                    <Figure.Caption>
                      <Chip
                        // variant="outlined"
                        color="error"
                        label={props.item.itemName}
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
              </Row>
            </Container>
          );
        })}
    </div>
  );
}
