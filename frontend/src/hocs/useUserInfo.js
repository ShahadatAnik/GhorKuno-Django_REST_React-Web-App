import { useState, useEffect } from "react";
import axios from "axios";

const useUserInfo = () => {
  const [user, setUser] = useState([]);
  const [userDataEdit, setUserDataEdit] = useState([]);

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
      .then((res) => setUser(res.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/accounts/userInfo/`, config)
      .then((res) => setUserDataEdit(res.data))
      .catch((error) => console.log(error));
  }, []);

  const [data] = userDataEdit.filter(
    (userData) => userData.user_id === user.id
  );

  return [data];
};
export default useUserInfo;
