import axios from "axios";

export default class ApiService {
  // Profile
  static UpdateUserInfo(
    user_id,
    first_name,
    last_name,
    house_name,
    road_no,
    block_no,
    area,
    city,
    district,
    mobilePhone
  ) {
    var formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("house_name", house_name);
    formData.append("road_no", road_no);
    formData.append("block_no", block_no);
    formData.append("area", area);
    formData.append("city", city);
    formData.append("district", district);
    formData.append("mobilePhone", mobilePhone);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data;application/json;",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
      body: formData,
    };

    return axios.put(
      `${process.env.REACT_APP_API_URL}/accounts/userInfo/${user_id}/`,
      formData,
      config
    );
  }

  static UpdateUserInfo_ProfilePic(user_id, profile_pic) {
    var formData = new FormData();
    formData.append("profile_pic", profile_pic);
    formData.append("is_profile_pic_updated", true);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data;application/json;",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
      body: formData,
    };

    return axios.put(
      `${process.env.REACT_APP_API_URL}/accounts/userInfo/${user_id}/`,
      formData,
      config
    );
  }

  // Insert_ContactUs
  static Insert_ContactUs(user_id, name, subject, desc) {
    var formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("name", name);
    formData.append("subject", subject);
    formData.append("desc", desc);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data;application/json;",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
      body: formData,
    };

    return axios.post(
      `${process.env.REACT_APP_API_URL}/gk/contact/`,
      formData,
      config
    );
  }

  // Item review
  static InsertComment(userID, itemID, rating, comment) {
    var formData = new FormData();
    formData.append("userID", userID);
    formData.append("itemID", itemID);
    formData.append("rating", rating);
    formData.append("comment", comment);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data;application/json;",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
      body: formData,
    };

    return axios.post(
      `${process.env.REACT_APP_API_URL}/gk/review/`,
      formData,
      config
    );
  }

  static UpdateComment(comment_id, userID, itemID, rating, comment) {
    var formData = new FormData();
    formData.append("userID", userID);
    formData.append("itemID", itemID);
    formData.append("rating", rating);
    formData.append("comment", comment);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data;application/json;",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
      body: formData,
    };

    return axios.put(
      `${process.env.REACT_APP_API_URL}/gk/review/${comment_id}/`,
      formData,
      config
    );
  }

  static DeleteComment(comment_id) {
    return fetch(`${process.env.REACT_APP_API_URL}/gk/review/${comment_id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    });
  }

  // MyShop
  static UpdateShopInfo(
    route_shopName,
    shopName,
    detailedAddr,
    offerBDT,
    offerPercentage,
    offerTill
  ) {
    var formData = new FormData();
    formData.append("shopName", shopName);
    formData.append("detailedAddr", detailedAddr);
    formData.append("offerBDT", offerBDT);
    formData.append("offerTill", offerTill);
    formData.append("offerPercentage", offerPercentage);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data;application/json;",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
      body: formData,
    };

    return axios.put(
      `${process.env.REACT_APP_API_URL}/gk/shop/${route_shopName}/`,
      formData,
      config
    );
  }

  static InsertShopInfo(
    userID,
    shopName,
    detailedAddr,
    offerBDT,
    offerPercentage,
    offerTill
  ) {
    var formData = new FormData();
    formData.append("userID", userID);
    formData.append("shopName", shopName);
    formData.append("detailedAddr", detailedAddr);
    formData.append("offerBDT", offerBDT);
    formData.append("offerTill", offerTill);
    formData.append("offerPercentage", offerPercentage);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data;application/json;",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
      body: formData,
    };

    return axios.post(
      `${process.env.REACT_APP_API_URL}/gk/shop/`,
      formData,
      config
    );
  }

  // MyShop Items
  static InsertMyShopItem(shopID, itemName, cost, itemDetail, itemImg) {
    var formData = new FormData();
    formData.append("shopID", shopID);
    formData.append("itemName", itemName);
    formData.append("cost", cost);
    formData.append("itemDetail", itemDetail);
    formData.append("itemImg", itemImg);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data;application/json;",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
      body: formData,
    };

    return axios.post(
      `${process.env.REACT_APP_API_URL}/gk/item/`,
      formData,
      config
    );
  }

  static UpdateMyShopItem(route_itemName, itemName, cost, itemDetail) {
    var formData = new FormData();
    formData.append("itemName", itemName);
    formData.append("cost", cost);
    formData.append("itemDetail", itemDetail);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data;application/json;",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
      body: formData,
    };

    return axios.put(
      `${process.env.REACT_APP_API_URL}/gk/item/${route_itemName}/`,
      formData,
      config
    );
  }

  static UpdateMyShopItemPic(route_itemName, itemImg) {
    var formData = new FormData();
    formData.append("itemImg", itemImg);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data;application/json;",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
      body: formData,
    };

    return axios.put(
      `${process.env.REACT_APP_API_URL}/gk/item/${route_itemName}/`,
      formData,
      config
    );
  }

  static DeleteMyShopItem(itemName) {
    return fetch(`${process.env.REACT_APP_API_URL}/gk/item/${itemName}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    });
  }

  // Add to cart
  static InsertAddToCart(userID, itemID, quantity) {
    var formData = new FormData();
    formData.append("userID", userID);
    formData.append("itemID", itemID);
    formData.append("quantity", quantity);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data;application/json;",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
      body: formData,
    };

    return axios.post(
      `${process.env.REACT_APP_API_URL}/gk/cart/`,
      formData,
      config
    );
  }

  static DeleteCartItem(id) {
    return fetch(`${process.env.REACT_APP_API_URL}/gk/cart/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    });
  }

  static UpdateItemQuantity(route_itemID, quantity) {
    var formData = new FormData();
    formData.append("quantity", quantity);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data;application/json;",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
      body: formData,
    };

    return axios.put(
      `${process.env.REACT_APP_API_URL}/gk/cart/${route_itemID}/`,
      formData,
      config
    );
  }

  // order
  static InsertOrder(userID, itemID, quantity, totalCost) {
    var formData = new FormData();
    formData.append("userID", userID);
    formData.append("itemID", itemID);
    formData.append("quantity", quantity);
    formData.append("totalCost", totalCost);
    formData.append("deliveryStatusWorker", false);
    formData.append("deliveryStatusUser", false);
    formData.append("deliveryStatusDeliveryboy", false);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data;application/json;",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
      body: formData,
    };

    return axios.post(
      `${process.env.REACT_APP_API_URL}/gk/order/`,
      formData,
      config
    );
  }

  static UpdateStatusWorker(route_orderID) {
    var formData = new FormData();
    formData.append("deliveryStatusWorker", true);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data;application/json;",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
      body: formData,
    };

    return axios.put(
      `${process.env.REACT_APP_API_URL}/gk/order/${route_orderID}/`,
      formData,
      config
    );
  }

  static UpdateStatusUser(route_orderID) {
    var formData = new FormData();
    formData.append("deliveryStatusWorker", true);
    formData.append("deliveryStatusDeliveryboy", true);
    formData.append("deliveryStatusUser", true);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data;application/json;",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
      body: formData,
    };

    return axios.put(
      `${process.env.REACT_APP_API_URL}/gk/order/${route_orderID}/`,
      formData,
      config
    );
  }

  static UpdateStatusDeliveryboy(route_orderID) {
    var formData = new FormData();
    formData.append("deliveryStatusWorker", true);
    formData.append("deliveryStatusDeliveryboy", true);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data;application/json;",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
      body: formData,
    };

    return axios.put(
      `${process.env.REACT_APP_API_URL}/gk/order/${route_orderID}/`,
      formData,
      config
    );
  }
}
