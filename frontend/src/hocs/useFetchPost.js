import React from "react";

const useFetchPost = (url, body, isAuthenticated) => {
  const [data, setData] = useState(null);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  //   { token: localStorage.getItem("access") }

  const sudoBody = JSON.stringify(body);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/${url}`, sudoBody, config)
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
  }, [url, isAuthenticated]);

  return [data];
};

export default useFetchPost;
