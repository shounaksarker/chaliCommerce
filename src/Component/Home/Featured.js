import React, { useContext, useEffect } from "react";
import { Button, Card, CardGroup} from "react-bootstrap";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import "./featured.css";

const Featured = ({handleAdd,handleRemove}) => {
  const [url, cart, , product, setProduct] = useContext(MyContext);

  useEffect(() => {
    fetch(url + "/products?limit=4")
      .then((res) => res.json())
      .then((json) => setProduct(json));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <section className="featured">
      <center>
        <h2 className="alert alert-dark">Featured Products</h2>
      </center>
      <CardGroup className="mt-5">
        {product.map((p) => {
          let item = cart.find((c) => c.id === p.id);

          return (
            <Card key={p.id}>
              <Card.Img variant="top" src={`${p.image}`} />
              <Card.Body>const []
                <Card.Title>{p.title}</Card.Title>
                <div className="pp">
                  <p>{p.description}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <Link to={"/product/" + p.id}>
                    <Button variant="dark">$ {p.price}</Button>
                  </Link>
                  {item ? (
                    <div>
                      <Button variant="danger" onClick={() => handleRemove(p)}>-</Button>
                      <span className="mx-3 text-bold">{item.qty}</span>
                      <Button variant="primary" onClick={() => handleAdd(p)}>+</Button>
                    </div>
                  ) : (
                    <Button className="ms-5" onClick={() => handleAdd(p)}>
                      Add To Cart
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </CardGroup>
    </section>
  );
};

export default Featured;
