import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Loading from "../Common/Loading";

const ListAllOrderPhone = () => {
  const [listAllPostPhone, setListAllPostPhone] = useState([]);

  const user = JSON.parse(localStorage.getItem("userLoggedIn"));

  const [loading, setLoading] = useState(true);

  const getListAllPostLaptop = () => {
    axios
      .get("http://localhost/raovatnhanh/api/baidangtheloai/1")
      .then((response) => {
        if (response.status === 200) {
          setListAllPostPhone(response.data);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getListProvince();
    getListAllPostLaptop();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

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

  const [listProvince, setListProvince] = useState([]);
  const [moneyType, setMoneyType] = useState(1);
  const [costType, setCostType] = useState(1);
  const [idProvince, setIDProvince] = useState(1);
  const [listResult, setListResult] = useState([]);

  const typeMoney = [
    {
      value: 1,
      text: "0đ-1000000đ",
    },
    {
      value: 2,
      text: "1000000đ-3000000đ",
    },
    {
      value: 3,
      text: "3000000đ-5000000đ",
    },
    {
      value: 4,
      text: "5000000đ-8000000đ",
    },
    {
      value: 5,
      text: "8000000đ-50000000đ",
    },
  ];

  const typeCost = [
    {
      value: 1,
      text: "Từ thấp đến cao",
    },
    {
      value: 2,
      text: "Từ cao đến thấp",
    },
  ];

  const getListProvince = () => {
    axios
      .get("http://localhost/raovatnhanh/api/tinhthanh")
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setListProvince(response.data);
        }
      })
      .catch((error) => console.log(error));
  };

  const onSubmit = () => {
    console.log("hahahaa");

    const dataModel = {
      tuychon: costType,
      mucgia: moneyType,
      tinhthanh: idProvince,
      IDTheLoaiSP:1
    };

    //console.log(dataModel);

    axios
      .post("http://localhost/raovatnhanh/api/locbaidang", dataModel)
      .then((response) => {
        if (response.status === 200) {
          //console.log(response.data);
          setListAllPostPhone(response.data);
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
                <h2>Danh sách bài đăng điện thoại di động</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="single-head">
                <h4 className="title">Lọc thông tin bằng: </h4>
                <hr />
                <div className="single-info row">
                  <h4 className="title col-lg-4 col-12">Số tiền:</h4>
                  <select
                    className="col-lg-8 col-12"
                    defaultValue={1}
                    onChange={(e) => setMoneyType(e.target.value)}
                  >
                    {typeMoney.map((item, index) => {
                      return (
                        <option key={index} value={item.value}>
                          {item.text}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <hr />
                <div className="single-info row">
                  <h4 className="title col-lg-4 col-12">Giá bán:</h4>
                  <select
                    className="col-lg-8 col-12"
                    defaultValue={1}
                    onChange={(e) => setCostType(e.target.value)}
                  >
                    {typeCost.map((item, index) => {
                      return (
                        <option key={index} value={item.value}>
                          {item.text}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <hr />
                <div className="single-info row">
                  <h4 className="title col-lg-4 col-12">Tỉnh thành:</h4>
                  <select
                    className="col-lg-8 col-12"
                    defaultValue={1}
                    onChange={(e) => setIDProvince(e.target.value)}
                  >
                    {listProvince.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {item._name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <hr />
                <div className="single-info">
                  <button type="submit" onClick={onSubmit} className="btn ">
                    Lọc kết quả
                  </button>
                </div>
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
                        {listAllPostPhone.map((itemPost, index) => {
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
                                      width={100}
                                      height={250}
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
};

export default ListAllOrderPhone;
