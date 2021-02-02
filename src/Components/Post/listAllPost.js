import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ListAllOrder = () => {
  const [listAllPost, setListAllPost] = useState([]);

  const user = JSON.parse(localStorage.getItem('userLoggedIn'));

  const getListAllPost = () => {
    axios
      .get("http://localhost/raovatnhanh/api/baidangclient")
      .then((response) => {
        if (response.status === 200) {
          //console.log(response);
          setListAllPost(response.data);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getListAllPost();
  }, []);


  const addPost = (id) => {
    const dataModel = {
      IDBaiDang : id,
      IDKhachHang : user?.IDKhachHang
    }
    
    axios.post("http://localhost/raovatnhanh/api/tinluu",dataModel)
    .then(response => {
      if(response.status === 200){
        window.alert('Tin này bạn đã lưu rồi')
      }else if(response.status === 201){
        window.alert('Lưu thành công');
      }
    })
  }

  return (
    <div>
      <section className="product-area section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title">
                <h2>Danh sách bài đăng</h2>
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
                        {listAllPost.map((itemPost, index) => {
                          return (
                            <div className="col-xl-3 col-lg-4 col-md-4 col-12" key={index}>
                              <div className="single-product">
                                <div className="product-img">
                                  <Link
                                    to={`/xemchitiet/${itemPost.IDBaiDang}`}
                                  >
                                    <img
                                      className="default-img"
                                      src={itemPost.HinhAnh}
                                      alt="#"
                                      width="100px"
                                      height="200px"
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
                                      <a title="Wishlist" onClick={() => addPost(itemPost.IDBaiDang)}>
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
    </div>
  );
};

export default ListAllOrder;
