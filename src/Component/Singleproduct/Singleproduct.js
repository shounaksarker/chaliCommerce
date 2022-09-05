import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { MyContext } from "../../App";
import warrenty from "../../imgs/warrenty.webp";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Singleproduct.css";

const Singleproduct = ({ handleAdd, handleRemove }) => {
  const [prod, setProd] = useState([]);
  const [size, setSize] = useState();
  const [url, cart, setCart] = useContext(MyContext);
  const { id } = useParams();

  useEffect(() => {
    fetch(url + "/products/" + id)
      .then((res) => res.json())
      .then((json) => setProd(json));
  }, [url, id]);

  // console.log("single: ", prod);
  let item = cart.find((c) => c.id === prod.id);

  const handleSize = (size) => {
    setSize(size);
    if(item.qty === 1){
      const newCartItems = cart.map((x) =>
      x.id === prod.id ? { ...item, size: size } : x
    );
    setCart(newCartItems);
    localStorage.setItem("cartItem", JSON.stringify(newCartItems));
    }
  }
  return (
    <div>
      <Header />
      <Container className="singleProduct">
        <Row className="mt-5">
          <Col sm={12} md={6}>
            <img src={prod.image} alt="" className="w-50" />
          </Col>

          <Col sm={12} md={6}>
            <h2>{prod.title}</h2>
            <h5>{prod.category}</h5>
            {/* <h5>Ratting: {prod.rating.rate} /5</h5> */}
            <h5 className="my-3">Size: {size}</h5>
            <div className="mb-3">
              <Button
                variant="dark"
                className="me-3"
                onClick={() => handleSize("Regular")}
              >
                Regular
              </Button>
              <Button variant="dark" onClick={() => handleSize("Large")}>
                Large
              </Button>
            </div>
            <div className="my-3">
              <Button variant="danger" onClick={() => handleRemove(prod)}>
                -
              </Button>
              <span className="mx-3 text-bold">{item? item.qty : 'Quantity'}</span>
              <Button variant="primary" onClick={() => handleAdd(prod)}>
                +
              </Button>
            </div>

            <Button className="w-100 addToCart">Add To Cart</Button>

            <div className="d-flex align-items-center my-3">
              <img src={warrenty} alt="" className="warrenty" />
              <p className="mt-3 ms-2">Life Time Warrenty</p>
            </div>

            <div className="description">{prod.description}</div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Singleproduct;
