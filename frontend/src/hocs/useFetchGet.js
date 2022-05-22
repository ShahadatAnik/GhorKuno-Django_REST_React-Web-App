import { useState, useEffect } from "react";
import axios from "axios";

const useFetchGet = (url, isAuthenticated) => {
  const [data, setData] = useState(null);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/${url}`, config)
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
  }, [url, isAuthenticated]);

  return [data];
};

export default useFetchGet;
