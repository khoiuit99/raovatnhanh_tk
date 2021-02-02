import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Loading from "../Common/Loading";
import { Link, useLocation } from "react-router-dom";

export default function ListPostByKey() {
  const [loading, setLoading] = useState(true);
  const [listResult, setListResult] = useState([]);

  const user = JSON.parse(localStorage.getItem("userLoggedIn"));

  const location = useLocation();

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  const addPost = (id) => {
    const dataModel = {
      IDBaiDang: id,
      IDKhachHang: user?.IDKhachHang,
    };

    axios
      .post("http://localhost/raovatnhanh/api/tinluu", dataModel)
      .then((response) => {
        if (response.status === 200) {
          window.alert("Tin này bạn đã lưu rồi");
        } else if (response.status === 201) {
          window.alert("Lưu thành công");
        }
      });
  };

  return loading ? (
    <Loading />
  ) : (
    <div>
      <Header />
      <section className="product-area section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title">
                <h2>Danh sách bài đăng theo kết quả</h2>
              </div>
            </div>
            <div className="col-12">
              <div className="section-title">
                <h4>Có tất cả {location.state.count} kết quả</h4>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="product-info">
                <div className="tab-content" id="myTabContent">
                  <div className="tab-pane fade show active" role="tabpanel">
                    <div className="tab-single">
                      <div className="row">
                        {location.state.data?.map((itemPost, index) => {
                          return (
                            <div
                              className="col-xl-3 col-lg-4 col-md-4 col-12"
                              key={index}
                            >
                              <div className="single-product">
                                <div className="product-img">
                                  <Link
                                    to={`/xemchitiet/${itemPost.IDBaiDang}`}
                                  >
                                    <img
                                      className="default-img"
                                      src={itemPost.HinhAnh}
                                      alt="#"
                                    />
                                  </Link>
                                  <div className="button-head">
                                    <div className="product-action">
                                      <a
                                        data-toggle="modal"
                                        data-target="#exampleModal"
                                        title="Quick View"
                                        href="#"
                                      ></a>
                                      <a
                                        title="Wishlist"
                                        onClick={() =>
                                          addPost(itemPost.IDBaiDang)
                                        }
                                      >
                                        <i className="ti-eye" />
                                        <span>Lưu tin này</span>
                                      </a>
                                    </div>
                                    <div className="product-action-2">
                                      <Link
                                        to={`/xemchitiet/${itemPost.IDBaiDang}`}
                                      >
                                        Xem chi tiết
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                                <div className="product-content">
                                  <h3>
                                    <Link
                                      to={`/xemchitiet/${itemPost.IDBaiDang}`}
                                    >
                                      {itemPost.TieuDe}
                                    </Link>
                                  </h3>
                                  <div className="product-price">
                                    <span>{itemPost.GiaBan}</span> VNĐ
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
