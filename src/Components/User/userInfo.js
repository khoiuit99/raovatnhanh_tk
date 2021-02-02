import React, { useState } from "react";
import axios from "axios";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import ManagePost from "../Post/managePost";

export default function UserInfo() {
  const { register, errors, handleSubmit } = useForm();

  const [isEdit, setIsEdit] = useState(true);
  const [count, setCount] = useState(0);
  const [image, setImage] = useState(0);
  const [changePass, setChangePass] = useState(0);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const user = JSON.parse(localStorage.getItem("userLoggedIn"));

  const history = useHistory();

  const onSubmit = (data) => {
    if (count === 0) {
      setIsEdit(!isEdit);
    }

    if (!isEdit) {
      const dataModel = {
        TenKhachHang: data ? data.TenKhachHang : user?.TenKhachHang,
        DiaChi: data ? data.DiaChi : user?.DiaChi,
        SoDienThoai: data ? data.SoDienThoai : user?.SoDienThoai,
        HinhAnh: image ? image : user?.HinhAnh,
      };

      axios
        .put(
          `http://localhost/raovatnhanh/api/khachhang/${user?.IDKhachHang}`,
          dataModel
        )
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            localStorage.removeItem("userLoggedIn");
            history.push("/login");
          }
        });
    }
  };

  const onSubmit1 = () => {
    const dataPass = {
      MatKhau: oldPassword,
      MatKhauMoi: newPassword,
    };

    axios
      .post(
        `http://localhost/raovatnhanh/api/doimatkhauu/${user?.IDKhachHang}`,
        dataPass
      )
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("userLoggedIn");
          history.push("/login");
        }
      })
      .catch((error) => console.log(error));

    console.log(dataPass);
  };

  function getBase64(e) {
    var file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  // function formatDate(string) {
  //   var options = { year: "numeric", month: "long", day: "numeric" };
  //   return new Date(string).toLocaleDateString([], options);
  // }
  return !user ? (
    <Redirect to="/login" />
  ) : (
    <div>
      <Header />
      {/* <div className="breadcrumbs">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bread-inner">
                <ul className="bread-list">
                  <li>
                    <Link to="/">
                      Trang chủ
                      <i className="ti-arrow-right" />
                    </Link>
                  </li>
                  <li className="active">
                    <Link to="#">Thông tin cá nhân</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="product-area section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title">
                <h2>Thông tin cá nhân</h2>
              </div>
            </div>
          </div>
          <div className="row contact-us">
            <div className="col-12">
              <div className="product-info">
                <div className="nav-main">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-toggle="tab"
                        href="#infoUser"
                        role="tab"
                      >
                        Thông tin của bạn
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-toggle="tab"
                        href="#infoPost"
                        role="tab"
                      >
                        Bài đăng của bạn
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="infoUser"
                    role="tabpanel"
                  >
                    <div className="tab-single">
                      <div className="row">
                        <div className="col-lg-8 col-12">
                          <div className="form-main">
                            <div className="title">
                              <h3>Thông tin cá nhân</h3>
                            </div>
                            <form
                              className="form"
                              onSubmit={handleSubmit(onSubmit)}
                            >
                              <div className="row">
                                <div className="col-lg-6 col-12">
                                  <div className="form-group">
                                    <label>Họ và tên:</label>
                                    <input
                                      name="TenKhachHang"
                                      type="text"
                                      defaultValue={user?.TenKhachHang}
                                      disabled={isEdit}
                                      ref={register({ required: true })}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-12">
                                  <div className="form-group">
                                    <label>Số điện thoại:</label>
                                    <input
                                      name="SoDienThoai"
                                      type="text"
                                      defaultValue={user?.SoDienThoai}
                                      disabled={isEdit}
                                      ref={register({
                                        required: true,
                                        pattern: /^[0-9\b]+$/,
                                        maxLength: 10,
                                      })}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-12">
                                  <div className="form-group">
                                    <label>Hình ảnh:</label>
                                    <input
                                      name="HinhAnh"
                                      type="file"
                                      disabled={isEdit}
                                      onChange={getBase64}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-6 col-12">
                                  <div className="form-group">
                                    <label>Địa chỉ</label>
                                    <input
                                      name="DiaChi"
                                      type="text"
                                      defaultValue={user?.DiaChi}
                                      disabled={isEdit}
                                      ref={register({ required: true })}
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-4 col-12">
                                  <div className="form-group button mt-4">
                                    <button
                                      type="submit"
                                      className={
                                        isEdit
                                          ? "btn-danger btn"
                                          : "btn btn-primary"
                                      }
                                    >
                                      {isEdit ? "Sửa thông tin" : "Lưu lại"}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="col-12">
                            <div className="form-group button mt-4">
                              <button
                                onClick={() => setChangePass(!changePass)}
                                className={"btn btn-primary"}
                              >
                                Đổi mật khẩu
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-12">
                          <div className="single-head">
                            <div className="single-info">
                              <i class="fa fa-image"></i>
                              <h4 className="title">Ảnh đại diện hiện tại</h4>
                              {!isEdit ? (
                                <input
                                  type="file"
                                  className="form-control"
                                  onChange={getBase64}
                                  name="HinhAnh"
                                />
                              ) : (
                                <img src={user?.HinhAnh} />
                              )}
                            </div>
                          </div>
                        </div>
                        {changePass ? (
                          <div className="col-lg-8 col-12">
                            <div className="form-main">
                              <div className="title">
                                <h3>Đổi mật khẩu</h3>
                              </div>
                              <form
                                className="form-horizontal"
                                onSubmit={handleSubmit(onSubmit1)}
                              >
                                <div className="form-group row">
                                  <label
                                    htmlFor="inputOld"
                                    className="col-sm-4 col-form-label"
                                  >
                                    Mật khẩu cũ:
                                  </label>
                                  <div className="col-sm-8">
                                    <input
                                      type="password"
                                      className="form-control"
                                      id="inputOld"
                                      name="MatKhauCu"
                                      placeholder="Mật khẩu cũ"
                                      onChange={(e) =>
                                        setOldPassword(e.target.value)
                                      }
                                      ref={register({
                                        maxLength: 30,
                                        minLength: 6,
                                      })}
                                    />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label
                                    htmlFor="inputNew"
                                    className="col-sm-4 col-form-label"
                                  >
                                    Mật khẩu mới:
                                  </label>
                                  <div className="col-sm-8">
                                    <input
                                      type="password"
                                      className="form-control"
                                      id="inputNew"
                                      name="MatKhauMoi"
                                      placeholder="Mật khẩu mới"
                                      onChange={(e) =>
                                        setNewPassword(e.target.value)
                                      }
                                      ref={register({
                                        maxLength: 30,
                                        minLength: 6,
                                      })}
                                    />
                                  </div>
                                </div>
                                <div className="form-group row">
                                  <label
                                    htmlFor="inputConfirm"
                                    className="col-sm-4 col-form-label"
                                  >
                                    Xác nhận Mật khẩu mới:
                                  </label>
                                  <div className="col-sm-8">
                                    <input
                                      type="password"
                                      className="form-control"
                                      id="inputConfirm"
                                      name="XacNhanMatKhauMoi"
                                      placeholder="Xác nhận mật khẩu mới"
                                      onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                      }
                                      ref={register({
                                        maxLength: 30,
                                        minLength: 6,
                                      })}
                                    />
                                    {newPassword !== confirmPassword ? (
                                      <p>Wrong new password</p>
                                    ) : (
                                      <p></p>
                                    )}
                                  </div>
                                </div>
                                <div className="col-lg-4 col-12">
                                  <div className="button mt-4">
                                    <button
                                      onClick={() => onSubmit1()}
                                      className={"btn btn-primary"}
                                    >
                                      Xác nhận
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="infoPost" role="tabpanel">
                    <div className="tab-single">
                      <div className="row">
                        <ManagePost />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
