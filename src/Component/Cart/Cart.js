import React, { useContext } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import Header from "../Header/Header";
import "./Cart.css";

const Cart = ({ handleAdd, handleRemove }) => {
  const [, cart] = useContext(MyContext);
  const priceInTotal = cart.reduce((a, c) => a + c.qty * c.price, 0).toFixed(2);

  return (
    <div>
      <Header />
      <h2 className="alert alert-info text-center">
        Cart - {cart.length} items
      </h2>
      <Container className="cart">
        {cart.length > 0 ? (
          <Table striped bordered hover variant="dark" className="text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((x, index) => {
                return (
                  <tr key={x.id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/product/${x.id}`}>
                        <img src={x.image} alt="" /> - {x.title} -{" "}
                        <small>
                          ({x.size ? x.size + " size" : "default size"})
                        </small>
                      </Link>
                    </td>
                    <td>
                      <div>
                        <Button
                          variant="danger"
                          onClick={() => handleRemove(x)}
                        >
                          -
                        </Button>
                        <span className="mx-3 text-bold">{x.qty}</span>
                        <Button variant="primary" onClick={() => handleAdd(x)}>
                          +
                        </Button>
                      </div>
                    </td>
                    <td>{x.price.toFixed(2)}</td>
                    <td>{(x.price * x.qty).toFixed(2)}</td>
                  </tr>
                );
              })}
             
             
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>Sub Total : </td>
                <td>$ {priceInTotal}</td>
              </tr>
            </tbody>
          </Table>
        ) : (
          <h2 className="text-center">No product in your cart</h2>
        )}
        {(cart.length > 0) &&
        <Link to="/bill">
          <Button>Next</Button>
        </Link>}
      </Container>
    </div>
  );
};

export default Cart;
