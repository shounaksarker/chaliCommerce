import React from "react";
import { Col, Row } from "react-bootstrap";
import fb from "../../imgs/fb.png";
import gmail from "../../imgs/gmail.png";
import "./footer.css";

const Footer = () => {
  return (
    <Row className="w-100 text-center footer bg-dark text-white align-items-center mt-5 mt-sm-0">
      <Col sm={4} md={4}>
        &copy; Shounak Raj
      </Col>
      <Col sm={4} md={4}>
        &copy; ChaliCom
      </Col>
      <Col sm={4} md={4}>
        <a href="https://www.facebook.com/shounak.sarker" target="_blank" rel="noopener noreferrer" className="me-5">
          <img src={fb} alt="" className="ftrIcon" />
        </a>

        <a href="mailto:shounaksarker@gmail.com" target="_blank" rel="noopener noreferrer">
          <img src={gmail} alt="" className="ftrIcon" />
        </a>
      </Col>
    </Row>
  );
};

export default Footer;
