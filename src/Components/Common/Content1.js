import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./Header";
import ListPostOrderByCategoty from "../Post/listPostByCategory";
import Footer from "./Footer";
import CarouselComponent from "./Carousel";
import Loading from "./Loading";

const ContentByCategories = () => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  return loading ? (
    <Loading />
  ) : (
    <div>
      <Header />
      <div className="center-screen">
        <CarouselComponent />
      </div>
      <ListPostOrderByCategoty />
      <section className="shop-services section home">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 center-screen">
              {/* Start Single Service */}
              <div className="single-service">
                <i className="ti-lock" />
                <h4>Bảo mật hoàn toàn</h4>
                <p>Bảo mật thông tin KH</p>
              </div>
              {/* End Single Service */}
            </div>
            <div className="col-lg-6 center-screen">
              {/* Start Single Service */}
              <div className="single-service">
                <i className="ti-rocket" />
                <h4>Nhanh chóng - tiện lợi</h4>
                <p>Mọi hoạt động đều được thực hiện trực tuyến</p>
              </div>
              {/* End Single Service */}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ContentByCategories;
