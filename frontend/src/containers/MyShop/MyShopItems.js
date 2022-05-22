import { useState, useEffect } from "react";
import ApiService from "../../ApiService";
import MyShopItemForm from "./MyShopItemForm";
import MyShopItemList from "./MyShopItemList";
import MyShopItemPicForm from "./MyShopItemPicForm";

import { Link, useLocation, useNavigate } from "react-router-dom";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import { Container, Row, Col, Figure, ProgressBar } from "react-bootstrap";

import Grid from "@material-ui/core/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { styled } from "@mui/material/styles";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff3d47",
  },
  "& .MuiRating-iconHover": {
    color: "#ff6d75",
  },
});

const MyShopItems = (props) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const [editShopsItem, setEditShopsItem] = useState(null);
  const [isUpdateBtn_item, setIsUpdateBtn_item] = useState(false);
  const [isUpdateBtnPic_item, setIsUpdateBtnPic_item] = useState(false);
  const [isInsertBtn_item, setIsInsertBtn_item] = useState(false);

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
  }, [props.shop]);

  const editBtn = (shop) => {
    setEditShopsItem(shop);
    setIsUpdateBtn_item(true);
    setIsInsertBtn_item(false);
    setIsUpdateBtnPic_item(false);
  };

  const editBtnPic = (shop) => {
    setEditShopsItem(shop);
    setIsUpdateBtn_item(false);
    setIsUpdateBtnPic_item(true);
  };

  const updatedInformation = (shop) => {
    const new_shops = items.map((new_shop) => {
      if (new_shop.id === shop.id) {
        return shop;
      } else {
        return new_shop;
      }
    });

    setItems(new_shops);
    setIsUpdateBtn_item(false);
    setIsUpdateBtnPic_item(false);
  };

  const itemFormUpdate = () => {
    setEditShopsItem({
      shopID: "",
      itemName: "",
      cost: "",
      itemDetail: "",
      itemImg: "",
    });
    setIsInsertBtn_item(true);
    setIsUpdateBtn_item(true);
    setIsUpdateBtnPic_item(false);
  };

  const insertedInformation = (shop) => {
    const new_shop = [...items, shop];
    setItems(new_shop);
    setIsUpdateBtn_item(false);
    setIsInsertBtn_item(false);
  };

  const deleteBtn = (shop) => {
    const new_shops = items.filter((my_shop) => {
      if (my_shop.id === shop.id) {
        return false;
      }
      return true;
    });

    setItems(new_shops);
  };

  return (
    <div>
      <MyShopItemList
        items={items}
        shop={props.shop}
        editBtn={editBtn}
        editBtnPic={editBtnPic}
        itemForm={itemFormUpdate}
        deleteBtn={deleteBtn}
      />

      {editShopsItem && isUpdateBtn_item ? (
        <MyShopItemForm
          items={editShopsItem}
          shop={props.shop}
          updatedInformation={updatedInformation}
          insertedInformation={insertedInformation}
          isUpdateBtn={isUpdateBtn_item}
          isInsertBtn={isInsertBtn_item}
        />
      ) : null}

      {editShopsItem && isUpdateBtnPic_item ? (
        <MyShopItemPicForm
          items={editShopsItem}
          shop={props.shop}
          updatedInformation={updatedInformation}
          insertedInformation={insertedInformation}
          isInsertBtn={isInsertBtn_item}
          isUpdateBtnPic={isUpdateBtnPic_item}
        />
      ) : null}
    </div>
  );
};

export default MyShopItems;
