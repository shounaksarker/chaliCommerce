import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import logo from "../../imgs/logo.png";
import "./header.css";

const Header = () => {
  const [, cart] = useContext(MyContext);

  const handleLogout = () => {
    console.log("logout pressed");
    localStorage.clear();
  };

  return (
    <Navbar
      sticky="top"
      expand="lg"
      bg="dark"
      variant="dark"
      className="header"
    >
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="logo" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto m-auto">
            <Link className="link" to="/">
              Home
            </Link>

            {/* dropdown  */}
            <NavDropdown
              title="Category"
              className="me-0"
              id="navbarScrollingDropdown"
            >
              <Link className="dropdown-item" to="#mens">
                Men's Clothing
              </Link>
              <Link className="dropdown-item" to="#womens">
                Women's Clothing
              </Link>
              <Link className="dropdown-item" to="#jwellery">
                Jwellery
              </Link>
              <Link className="dropdown-item" to="#Electronics">
                Electronics
              </Link>
            </NavDropdown>

            <Link className="link" to="#Contact">
              Contact
            </Link>
          </Nav>

          <Nav>
            <Link to="#">
              <FontAwesomeIcon icon="fa-solid fa-user-clock" />
            </Link>
            <Link to="/cart">
              <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
              <Badge bg="secondary" className="p-1 ms-2">
                {cart.length}
              </Badge>
            </Link>

            {localStorage.getItem("name") && localStorage.getItem("email") ? (
              <Link to="/" onClick={handleLogout}>
                <FontAwesomeIcon icon="fa-solid fa-arrow-down" /> Logout
              </Link>
            ) : (
              <Link className="link" to="/auth">
                <FontAwesomeIcon icon="fa-solid fa-arrow-up" /> Login
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
