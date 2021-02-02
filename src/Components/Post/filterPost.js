import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { Link } from "react-router-dom";

export default function FilterPost() {
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
    };

    //console.log(dataModel);

    axios
      .post("http://localhost/raovatnhanh/api/locbaidang", dataModel)
      .then((response) => {
        if (response.status === 200) {
          //console.log(response.data);
          setListResult(response.data);
        }
      });
  };

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  useEffect(() => {
    getListProvince();
  }, []);

  return (
    <div>
      <Header />
      <section id="contact-us" className="contact-us mt-4">
        <div className="container">
          <div className="contact-head">
            <div className="row">
              <div className="col-lg-4 col-12">
                <div className="single-head">
                  <h4 className="title">Lọc thông tin bằng: </h4>
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
                  <div className="single-info">
                    <button type="submit" onClick={onSubmit} className="btn ">
                      Lọc kết quả
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-12">
                <div className="form-main">
                  <div className="title">
                    <h3>Danh sách bài đăng:</h3>
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th style={{ width: "20%" }}>Hình ảnh</th>
                        <th style={{ width: "15%" }}>Tiêu đề</th>
                        <th style={{ width: "15%" }}>Nội dung</th>
                        <th style={{ width: "16%" }}>Giá bán</th>
                        <th style={{ width: "20%" }}>Ngày đăng</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listResult.map((itemPost, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <img src={itemPost.HinhAnh} />
                            </td>
                            <td>{itemPost.TieuDe}</td>
                            <td>{itemPost.NoiDung}</td>
                            <td>{itemPost.GiaBan}</td>
                            <td>{formatDate(`${itemPost.NgayDang}`)}</td>
                            <td className="table-action">
                              <Link to={`/xemchitiet/${itemPost.IDBaiDang}`}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={24}
                                  height={24}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="feather feather-edit-2 align-middle"
                                >
                                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                                </svg>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
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
