import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Footer from "../Common/Footer";
import Header from "../Common/Header";

export default function ManagePost() {
  const user = JSON.parse(localStorage.getItem("userLoggedIn"));

  const [listAllPostByUser, setListAllByUser] = useState([]);
  const [listAllPostSave, setListAllSave] = useState([]);
  const [isShowAllPost, setIsShowAllPost] = useState(true);
  const [isShowAllPostSaved, setIsShowAllPostSaved] = useState(false);

  const getAllPostByUser = () => {
    axios
      .get(`http://localhost/raovatnhanh/api/bdkh/${user?.IDKhachHang}`)
      .then((response) => {
        if (response.status === 200) {
          //console.log(response.data);
          setListAllByUser(response.data);
        }
      })
      .catch((error) => console.log(error));
  };

  const getAllPostSaved = () => {
    axios
      .get(`http://localhost/raovatnhanh/api/tinluu/${user?.IDKhachHang}`)
      .then((response) => {
        if (response.status === 200) {
          setListAllSave(response.data);
        }
      })
      .catch((error) => console.log(error));
  };

  const deletePost = (id) => {
    //console.log(id);
    axios
      .delete(`http://localhost/raovatnhanh/api/baidang/${id}`)
      .then((response) => {
        if (response.status === 200) {
          const newListPost = listAllPostByUser.filter((item) => {
            return item.IDBaiDang !== id;
          });

          setListAllByUser(newListPost);
        }
      })
      .catch((error) => console.log(error));
  };

  const deletePostSaved = (id) => {
    //console.log(id);
    axios
      .delete(`http://localhost/raovatnhanh/api/tinluu/${id}`)
      .then((response) => {
        if (response.status === 200) {
          const newListPostSaved = listAllPostSave.filter((item) => {
            return item.IDTinLuu !== id;
          });

          setListAllSave(newListPostSaved);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllPostByUser();
    getAllPostSaved();
  }, []);

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  return !user ? (
    <Redirect to="/login" />
  ) : (
    <div className="container shop checkout">
      <div className="row">
        <div className="col-lg-4 col-12">
          <div className="order-details">
            {/* Order Widget */}
            <div className="single-widget">
              <h2>QUẢN LÝ BÀI ĐĂNG CỦA BẠN</h2>
              <div className="content">
                <ul>
                  <li>
                    <button
                      type="button"
                      onClick={() => setIsShowAllPost(!isShowAllPost)}
                      className="btn btn-primary col-12"
                    >
                      Danh sách bài đăng
                    </button>
                  </li>
                  <li>
                    <Link to="/taobaidang">
                      <button className="btn btn-primary col-12">
                        Tạo bài đăng
                      </button>
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setIsShowAllPostSaved(!isShowAllPostSaved)}
                      className="btn btn-primary col-12"
                    >
                      Bài đăng đã lưu
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {isShowAllPost ? (
          <div className="col-lg-8 col-12 mt-4">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Danh sách bài đăng</h5>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: "5%" }}>STT</th>
                    <th style={{ width: "20%" }}>Tiêu đề</th>
                    <th style={{ width: "20%" }}>Nội dung</th>
                    <th style={{ width: "13%" }}>Giá Bán</th>
                    <th style={{ width: "25%" }}>Ngày đăng</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {listAllPostByUser.map((itemPost, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{itemPost.TieuDe}</td>
                        <td>{itemPost.NoiDung}</td>
                        <td className="d-none d-md-table-cell">
                          {itemPost.GiaBan}
                        </td>
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
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <button>
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
                              className="feather feather-trash align-middle"
                              onClick={() => deletePost(itemPost.IDBaiDang)}
                            >
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {isShowAllPostSaved ? (
          <div className="col-lg-8 col-12 mt-4">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Danh sách bài lưu</h5>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: "5%" }}>STT</th>
                    <th style={{ width: "20%" }}>Tiêu đề</th>
                    <th style={{ width: "20%" }}>Nội dung</th>
                    <th style={{ width: "13%" }}>Giá Bán</th>
                    <th style={{ width: "25%" }}>Ngày đăng</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {listAllPostSave.map((itemPost, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{itemPost.TieuDe}</td>
                        <td>{itemPost.NoiDung}</td>
                        <td className="d-none d-md-table-cell">
                          {itemPost.GiaBan}
                        </td>
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
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <button>
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
                              className="feather feather-trash align-middle"
                              onClick={() => deletePostSaved(itemPost.IDTinLuu)}
                            >
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
