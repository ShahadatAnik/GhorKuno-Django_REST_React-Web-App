import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Container, Row, Col, Form } from "react-bootstrap";

export default class SlideItemCard extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <Container className=" fs-1">
        <Row className="justify-content-center"> Single Item</Row>
        <Slider {...settings}>
          <Row className="justify-content-center">1</Row>

          <Row className="justify-content-center">2</Row>

          <Row>3</Row>

          <Row>4</Row>

          <Row>5</Row>

          <Row>6</Row>
        </Slider>
      </Container>
    );
  }
}
