import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import axios from "axios";

export default function CarouselComponent() {
  const [listAdvertise, setListAdvertise] = useState([]);

  const getAdvertise = () => {
    axios
      .get("http://localhost/raovatnhanh/api/quangcao")
      .then((response) => {
        if (response.status === 200) {
          setListAdvertise(response.data);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAdvertise();
  }, []);

  return (
    <Carousel>
      {listAdvertise.map((itemAdvertise, index) => {
        return (
          <Carousel.Item key={index}>
            <img className="d-block" src={itemAdvertise.HinhAnh} alt={itemAdvertise.GhiChu} />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}
