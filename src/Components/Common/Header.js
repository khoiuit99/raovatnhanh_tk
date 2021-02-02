import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Header() {
  const [listProvince, setListProvince] = useState([]);
  const [idProvince, setIDProvince] = useState();

  const user = JSON.parse(localStorage.getItem("userLoggedIn"));

  const history = useHistory();

  const { handleSubmit, register } = useForm();

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

  const LogOut = () => {
    localStorage.removeItem("userLoggedIn");
  };

  function clickOnMe(val) {
    setIDProvince(val);
  }

  const onFind = (data) => {
    if (data.TuKhoa == null && idProvince) {
      const dataModel = {
        IDTinhThanh: idProvince,
      };

      axios
        .post("http://localhost/raovatnhanh/api/bdtt", dataModel)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            history.push("/ketquatimkiem", response.data);
          }
        })
        .catch((error) => console.log(error));
    } else if (data.TuKhoa != null && !idProvince) {
      const dataModel = {
        TuKhoa: data.TuKhoa,
      };

      axios
        .post("http://localhost/raovatnhanh/api/bdtk", dataModel)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            history.push("/ketquatimkiem", response.data);
          }
        });
    } else if (data.TuKhoa != null && idProvince) {
      const dataModel = {
        IDTinhThanh: idProvince,
        TuKhoa: data.TuKhoa,
      };

      axios
        .post("http://localhost/raovatnhanh/api/bdtttk", dataModel)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            history.push("/ketquatimkiem", response.data);
          }
        });
    }
  };

  return (
    <div>
      <header className="header shop">
        {/* Topbar */}
        <div className="topbar">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-12 col-12">
                {/* Top Left */}
                <div className="top-left">
                  <ul className="list-main">
                    <li>
                      <i className="ti-headphone-alt" /> 0123-456-789
                    </li>
                    <li>
                      <i className="ti-email" /> raovatnhanh@gmail.com
                    </li>
                  </ul>
                </div>
                {/*/ End Top Left */}
              </div>
              <div className="col-lg-8 col-md-12 col-12">
                {/* Top Right */}
                <div className="right-content">
                  <ul className="list-main">
                    <li>
                      <i className="ti-bell" /> <a href="#">Thông báo</a>
                    </li>
                    <li>
                      <i className="ti-user" />{" "}
                      <Link to="/thongtincanhan">Quản lý cá nhân</Link>
                    </li>
                    <li>
                      <i className="ti-power-off" />
                      {user ? (
                        <Link to="#" onClick={LogOut}>
                          Đăng xuất
                        </Link>
                      ) : (
                        <Link to="/login">Đăng nhập/Đăng kí</Link>
                      )}
                    </li>
                  </ul>
                </div>
                {/* End Top Right */}
              </div>
            </div>
          </div>
        </div>
        {/* End Topbar */}
        <div className="middle-inner">
          <div className="container">
            <div className="row">
              <div className="col-lg-2 col-md-2 col-12">
                {/* Logo */}
                <div className="logo">
                  <Link to="/">
                    <h3> RaoVatNhanhTK </h3>
                  </Link>
                </div>
                <div className="search-top">
                  <div className="top-search">
                    <a href="#0">
                      <i className="ti-search" />
                    </a>
                  </div>
                  <div className="search-top">
                    <form className="search-form">
                      <input
                        type="text"
                        placeholder="Search here..."
                        name="search"
                      />
                      <button value="search" type="submit">
                        <i className="ti-search" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-7 col-12">
                <div className="search-bar-top">
                  <div className="search-bar">
                    <div
                      className="nice-select"
                      id="cssmenu"
                      onClick={getListProvince}
                    >
                      <span className="current">Chọn Tỉnh/TP</span>
                      <ul className="list" style={{ columnCount: 6 }}>
                        {listProvince.map((itemProvince, index) => {
                          return (
                            <li
                              data-value={itemProvince.id}
                              key={index}
                              onClick={clickOnMe.bind(this, itemProvince.id)}
                              className="option"
                            >
                              {itemProvince._name}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <form onSubmit={handleSubmit(onFind)}>
                      <input
                        name="TuKhoa"
                        placeholder="Nhập sản phẩm bạn muốn tìm"
                        ref={register({})}
                      />
                      <button className="btnn" type="submit">
                        <i className="ti-search" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-inner">
          <div className="container">
            <div className="cat-nav-head">
              <div className="row">
                <div className="col-lg-9 col-12">
                  <div className="menu-area">
                    {/* Main Menu */}
                    <nav className="navbar navbar-expand-lg">
                      <div className="navbar-collapse">
                        <div className="nav-inner">
                          <ul className="nav main-menu menu navbar-nav">
                            <li>
                              <Link to="/">Trang chủ</Link>
                            </li>
                            <li>
                              <Link to="/dtdd">Điện thoại di động</Link>
                            </li>
                            <li>
                              <Link to="/laptop">Laptop</Link>
                            </li>
                            <li>
                              <Link to="/lkdidong">Linh kiện di động</Link>
                            </li>
                            <li>
                              <Link to="/lklaptop">Linh kiện laptop</Link>
                            </li>
                            
                            <li>
                              <Link to="/taobaidang">Tạo bài đăng</Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
