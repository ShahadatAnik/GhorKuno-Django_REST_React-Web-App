import { useState, useLayoutEffect } from "react";
import { Container, Row, Col, Figure } from "react-bootstrap";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";

// const Root = styled("div")(({ theme }) => ({
//   width: "100%",
//   ...theme.typography.body2,
//   "& > :not(style) + :not(style)": {
//     marginTop: theme.spacing(2),
//   },
// }));

export default function CartItemShopInfo(props) {
  const [shop, setShop] = useState([]);

  useLayoutEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/gk/shop/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setShop(resp))
      .catch((error) => console.log(error));
  }, [props.item]);
  return (
    <div>
      {shop
        .filter((sd) => sd.id === props.shopID.shopID)
        .map((shopName) => {
          return (
            <Container key={shopName.id}>
              {/* <span>
                  <strong>Shop Name:</strong> {shopName.shopName}
                </span> */}
              <Divider>
                <Chip
                  //   variant="outlined"
                  color="error"
                  label={shopName.shopName}
                  className="fs-3 p-4 my-3"
                />
              </Divider>
            </Container>
          );
        })}
    </div>
  );
}
