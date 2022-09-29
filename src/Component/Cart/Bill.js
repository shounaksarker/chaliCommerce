import { getDatabase, ref, set, update } from "firebase/database";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import { MyContext } from "../../App";
import app from "../Auth/firebase.config";
import Header from "../Header/Header";
import "./Cart.css";

const Bill = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // ---------- variables ----------
  const eml = localStorage.getItem("email");
  const nm = localStorage.getItem("name");
  const uid = localStorage.getItem("uid");
  const db = getDatabase(app);

  // ---------- states ----------
  const [, cart] = useContext(MyContext);
  const [dates, setDates] = useState("");
  const priceInTotal = cart.reduce((a, c) => a + c.qty * c.price, 0).toFixed(2);
  const [bill, setBill] = useState({
    name: '',
    email: '',
    adress: "",
    mobile: "",
    methode: "cash on delivery",
  });
  console.log(bill);

  // ---------- functions ----------
  const handleBlur = (e) => {
    let bil = { ...bill };
    if (e.target.name === "name") {
      bil.name = e.target.value;
      setBill(bil);
      localStorage.setItem("bill", JSON.stringify(bil));
    }
    if (e.target.name === "email") {
      bil.email = e.target.value;
      setBill(bil);
      localStorage.setItem("bill", JSON.stringify(bil));
    }
    if (e.target.name === "mobile") {
      bil.mobile = e.target.value;
      setBill(bil);
      localStorage.setItem("bill", JSON.stringify(bil));
    }
    if (e.target.name === "adress") {
      bil.adress = e.target.value;
      setBill(bil);
      localStorage.setItem("bill", JSON.stringify(bil));
    }
  };
  useEffect(() => {
    setBill(
      localStorage.getItem("bill")
        ? JSON.parse(localStorage.getItem("bill"))
        : []
    );
  }, []);

  const handleConfirm = (e) => {
    e.preventDefault();
    const dt = new Date();
    const date =
      dt.getDate() +
      "-" +
      (dt.getMonth() + 1) +
      "-" +
      dt.getFullYear() +
      " " +
      dt.getHours() +
      ":" +
      dt.getMinutes() +
      ":" +
      dt.getSeconds();

    setDates(date);

    cart.map((x) => {
      return set(ref(db, `/orders/${uid}/${date}/${x.id}`), {
        itemId: x.id,
        itemName: x.title,
        itemPrice: x.price,
        itemQty: x.qty,
        date: date,
      });
    });
    console.log("push in db");
    update(ref(db, `/orders/${uid}/${date}`), {
      itemTotalPrice: priceInTotal,
      customerName: bill.name,
      customerEmail: bill.email,
      customerPhone: bill.mobile,
      customerAdress: bill.adress,
    });
    console.log("total price push in db");
    localStorage.removeItem('cartItem')
    localStorage.removeItem('bill')
  };

  return (
    <div>
      <Header />
      <Container>
        { (cart.length > 0) && !dates && (
          <Form className="billForm" onSubmit={handleConfirm}>
            <h2 className="mb-3 alert alert-info text-center">
              Billing Information
            </h2>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name *</Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    onBlur={handleBlur}
                    placeholder={`Name : ${nm}`}
                    defaultValue={bill.name? bill.name:null}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    onBlur={handleBlur}
                    placeholder={`Email : ${eml}`}
                    defaultValue={bill.email? bill.email:null}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Mobile Number *</Form.Label>
                  <Form.Control
                    name="mobile"
                    type="number"
                    onBlur={handleBlur}
                    required
                    placeholder="Your contact number"
                    defaultValue={bill.mobile? bill.mobile:null}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Adress *</Form.Label>
                  <Form.Control
                    name="adress"
                    type="text"
                    onBlur={handleBlur}
                    required
                    placeholder="Your adress"
                    defaultValue={bill.adress? bill.adress:null}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Control
                    type="text"
                    disabled
                    placeholder="Cash on Delivery"
                    className="border-none"
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="m-auto">
                <Button variant="primary" type="submit" className="mt-3">
                  Confirm
                </Button>
              </Col>
            </Row>
          </Form>
        )}

        {/* for printing purpose */}

        {dates && (
          <div className="shadow p-3 bg-white rounded">
            <Button className="float-end" id="printBtn" onClick={handlePrint}>
              Print this out!
            </Button>
            <div ref={componentRef} className='mt-3'>
              <div className="text-center">
                <h3>Thanks for shopping from</h3>
                <h2>Chali-Com</h2>
                <h4>a online shop</h4>
              </div>
              <div className=" mb-5 m-auto">
                <div className="border border-dark p-3">
                  <h5>
                    Id: <span className="spn">{uid}</span>
                  </h5>
                  <h5>
                    Name: <span className="spn">{bill.name}</span>
                  </h5>
                  <h5>
                    Adress: <span className="spn">{bill.adress}</span>
                  </h5>
                  <h5>
                    Number: <span className="spn">{bill.mobile}</span>
                  </h5>
                  <h5>
                    Email: <span className="spn">{bill.email}</span>
                  </h5>
                  <h5>
                    Payment Method: <span className="spn">{bill.methode}</span>
                  </h5>
                  <h5>
                    Date: <span className="spn">{dates}</span>
                  </h5>
                </div>
              </div>
              {
                <Table className="text-center">
                  <thead>
                    <tr>
                      <th className="w5">SL</th>
                      <th className="w55">Item Name</th>
                      <th className="w5">Quantity</th>
                      <th className="w15">Unit Price</th>
                      <th className="w15">Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((x, index) => {
                      return (
                        <tr key={x.id}>
                          <td className="w5">{index + 1}</td>
                          <td className="w55">
                            {x.title} -{" "}
                            <small>
                              ({x.size ? x.size + " size" : "default size"})
                            </small>
                          </td>
                          <td className="w5">
                            <div>
                              <span className="mx-3 text-bold">{x.qty}</span>
                            </div>
                          </td>
                          <td className="w15">{x.price.toFixed(2)}</td>
                          <td className="w15">
                            {(x.price * x.qty).toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                    {}
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>Sub Total : </td>
                      <td>$ {priceInTotal}</td>
                    </tr>
                  </tbody>
                </Table>
              }
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Bill;
