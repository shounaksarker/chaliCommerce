import React from "react";
import { Button } from "react-bootstrap";
import Header from "../Header/Header";
import "./cover.css";

const Cover = () => {
  const imgLink = [
    "photo-1598971861713-54ad16a7e72e",
    "photo-1534452203293-494d7ddbf7e0",
    "photo-1574634534894-89d7576c8259",
    "photo-1513094735237-8f2714d57c13",
  ];

  let img = "";
  const r = parseInt(Math.random() * 4);
  for (let i = 0; i < imgLink.length; i++) {
    img = imgLink[r];
  }

  // let url = `https://images.unsplash.com/${img}`
  // const bg = {
  //   backgroundImage: `url(https://images.unsplash.com/${img})`,
  // };
  return (
    <div>
      <Header />
      <div className="cover position-relative">
        {/* <div className="bg position-relative h-100" style={bg}></div> */}
        <div className="bg position-relative h-100"></div>
        <div className="cont position-absolute container">
          <h2>End of Summer Sale-ebration</h2>
          <h4 className="my-4">Enjoy up to 25% discount</h4>
          <Button variant='dark'>Shop new arrivals</Button>
        </div>
      </div>
    </div>
  );
};

export default Cover;
