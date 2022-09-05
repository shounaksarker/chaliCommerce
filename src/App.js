import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowDown,
  faArrowUp,
  faCartShopping,
  faCoffee,
  faUserClock,
} from "@fortawesome/free-solid-svg-icons";
import React, { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./Component/Auth/Auth";
import PrivateOutlet from "./Component/Auth/PrivateOutlet/PrivateOutlet";
import Cart from "./Component/Cart/Cart";
import Home from "./Component/Home/Home";
import Singleproduct from "./Component/Singleproduct/Singleproduct";
export const MyContext = createContext();

library.add(faCoffee, faUserClock, faCartShopping, faArrowDown, faArrowUp);

function App() {
  const url = "https://fakestoreapi.com";
  let [cart, setCart] = useState([]);
  const [product, setProduct] = useState([]); // for home 5 products
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const value = [url, cart, setCart, product, setProduct, user, setUser];

  // Functionalities
  const handleAdd = (prod) => {
    const exist = cart.find((x) => x.id === prod.id);
    if (exist) {
      const newCartItems = cart.map((x) =>
        x.id === prod.id ? { ...exist, qty: exist.qty + 1 } : x
      );
      setCart(newCartItems);
      localStorage.setItem("cartItem", JSON.stringify(newCartItems));
      // console.log("exots : ", cart);
    } else {
      const newCartItems = [...cart, { ...prod, qty: 1 }];
      setCart(newCartItems);
      localStorage.setItem("cartItem", JSON.stringify(newCartItems));
      // console.log("else : ", newCartItems);
    }
  };

  const handleRemove = (prod) => {
    const exist = cart.find((x) => x.id === prod.id);
    if (exist.qty === 1) {
      const newCartItems = cart.filter((x) => x.id !== prod.id);
      setCart(newCartItems);
      localStorage.setItem("cartItem", JSON.stringify(newCartItems));
    } else {
      const newCartItems = cart.map((x) =>
        x.id === prod.id ? { ...exist, qty: exist.qty - 1 } : x
      );
      setCart(newCartItems);
      localStorage.setItem("cartItem", JSON.stringify(newCartItems));
    }
  };

  useEffect(() => {
    setCart(
      localStorage.getItem("cartItem")
        ? JSON.parse(localStorage.getItem("cartItem"))
        : []
    );
  }, []);

  return (
    <MyContext.Provider value={value}>
      <Routes>
        <Route
          path="/"
          element={<Home handleAdd={handleAdd} handleRemove={handleRemove} />}
        />
        <Route
          path="/product/:id"
          element={
            <Singleproduct handleAdd={handleAdd} handleRemove={handleRemove} />
          }
        />
        <Route path="/cart" element={<PrivateOutlet />}>
          <Route
            path="/cart"
            element={<Cart handleAdd={handleAdd} handleRemove={handleRemove} />}
          />
        </Route>

        <Route path="/auth" element={<Auth />} />
      </Routes>
    </MyContext.Provider>
  );
}

export default App;
