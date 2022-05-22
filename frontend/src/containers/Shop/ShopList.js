import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { Row, Col, Figure, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {
  textFilter,
  selectFilter,
} from "react-bootstrap-table2-filter";

import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { styled } from "@mui/material/styles";

import Animation from "../../components/Animation";
import { motion } from "framer-motion";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff3d47",
  },
  "& .MuiRating-iconHover": {
    color: "#ff6d75",
  },
});

export default function ShopHasDrugs(props) {
  const [shop, setShop] = useState([]);
  const { placeName } = useParams();
  console.log(placeName);

  useEffect(() => {
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
  }, []);
  const { SearchBar, ClearSearchButton } = Search;

  const selectOptions = {
    Banani: "Banani",
    Motijheel: "Motijheel",
    Dhanmondi: "Dhanmondi",
  };
  const value = {
    placeName: `${placeName}`,
  };
  const selectRating = {
    1: "Very Bad",
    2: "Bad",
    3: "Acceptable",
    4: "Good",
    5: "Very Good",
  };

  function headerFormatter(column, colIndex, { sortElement, filterElement }) {
    return (
      <div className="p-2" style={{ display: "flex", flexDirection: "column" }}>
        <div
          className="p-2 rounded-3 text-center text-white text-wrap fs-4 fw-bold "
          style={{
            background: "#dc3545",
          }}
        >
          {column.text}
        </div>
        <br />
        {filterElement}
      </div>
    );
  }

  const columns = [
    {
      dataField: "shopName",
      text: "Shop Name",
      headerStyle: () => {
        return {
          backgroundColor: "#FFBD2D",
          textAlign: "center",
          srText: "",
          color: "#ede8e8",
        };
      },
      formatter: (value) => {
        return (
          <Link to={`/shops/${value}`}>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              className="fs-3 text-decoration-underline fw-bold"
              style={{ color: "#dc3545" }}
            >
              {value}
            </motion.div>
          </Link>
        );
      },
      sort: true,
      filter: textFilter(),
      headerFormatter: headerFormatter,
    },
    {
      dataField: "detailedAddr",
      text: "Address",
      headerStyle: () => {
        return {
          backgroundColor: "#FFBD2D",
          textAlign: "center",
          srText: "",
          color: "#ede8e8",
        };
      },
      formatter: (value) => {
        return (
          <div className="fs-5 fw-bold" style={{ color: "#dc3545" }}>
            {value}
          </div>
        );
      },
      sort: true,
      filter: textFilter(),
      headerFormatter: headerFormatter,
      filter: selectFilter({
        options: selectOptions,
        defaultValue: `${placeName}`,
      }),
    },
    {
      dataField: "review",
      text: "Ratting",
      headerStyle: () => {
        return {
          backgroundColor: "#FFBD2D",
          textAlign: "center",
          srText: "",
          color: "#ede8e8",
        };
      },
      formatter: (value) => {
        return (
          <StyledRating
            size="large"
            value={value}
            getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
            precision={0.5}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            readOnly
          />
        );
      },
      sort: true,
      filter: textFilter(),
      headerFormatter: headerFormatter,
      filter: selectFilter({ options: selectRating }),
    },
  ];

  const rowStyle = (row, rowIndex) => {
    const style = {};
    style.backgroundColor = "#FFBD2D";
    style.textAlign = "center";

    return style;
  };

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: false,
    onPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
  });

  const defaultSorted = [
    {
      dataField: "review",
      order: "desc",
    },
  ];

  return (
    <Container fluid>
      <ToolkitProvider
        keyField="shopName"
        data={shop.filter((sd) => sd.shopName !== "New" && !sd.isBanned)}
        columns={columns}
        search
      >
        {(props) => (
          <div>
            <Row>
              <Row>
                <Col sm={1} />
                <Col sm>
                  <div
                    className="shadow-lg p-4 rounded-3 text-center text-white text-wrap fs-1 fw-bold "
                    style={{
                      background: "#dc3545",
                    }}
                  >
                    Search Kitchens
                  </div>
                </Col>
                <Col sm={1} />
              </Row>
              <Animation>
                <Row>
                  <br />
                </Row>
                <Row>
                  <Col sm={1} />
                  <Col
                    sm
                    className="shadow-lg p-4 rounded-3 text-center text-white "
                    style={{
                      background: "#FFBD2D",
                    }}
                  >
                    <span>
                      <SearchBar
                        srText=""
                        style={{
                          textAlign: "center",
                          margin: "auto",
                          width: "100%",
                        }}
                        placeholder="Search About Shop"
                        {...props.searchProps}
                      />
                      <span> </span>
                      <ClearSearchButton
                        className="btn btn-secondary btn-sm"
                        style={{
                          width: "100%",
                          background: "#dc3545",
                        }}
                        {...props.searchProps}
                      />
                    </span>
                    <br />
                    <br />
                    <br />

                    <BootstrapTable
                      keyField="shopName"
                      pagination={pagination}
                      filter={filterFactory()}
                      defaultSorted={defaultSorted}
                      bordered={false}
                      rowStyle={rowStyle}
                      {...props.baseProps}
                    />
                  </Col>
                  <Col sm={1} />
                </Row>
              </Animation>
            </Row>
          </div>
        )}
      </ToolkitProvider>
    </Container>
  );
}
