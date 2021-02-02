import React, { useState } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import CarouselComponent from "../Common/Carousel";
import ListAllOrder from "../Post/listAllPost";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import axios from 'axios';

export default function Content() {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  // const getListResult = (id) => {

  //   const dataModel = {
  //     IDTinhThanh : id
  //   };

  //   console.log(dataModel);
    // axios.post("http://localhost/raovatnhanh/api/bdtt", dataModel)
    // .then(response => {
    //   if(response.status === 200){
    //     console.log(response.data)
    //     setListResult(response.data);
    //   }
    // })
    // .catch(error => console.log(error))
  //}

  return loading ? (
    <Loading />
  ) : (
    <div>
      <Header />
      <div className="center-screen">
        <CarouselComponent />
      </div>
      <ListAllOrder />
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
}
