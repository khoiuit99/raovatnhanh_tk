import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "../Common/Header";
import { useForm } from "react-hook-form";
import axios from 'axios';

export default function SignUpPage() {
  const { register, errors, handleSubmit } = useForm();

  const [password, setPassword] = useState();
  const [confirmPassword, setconfirmPassword] = useState();
  const [image, setImage] = useState();

  const history = useHistory();

  const onSubmit = (data) => {
    
    const dataModel = {
      TenKhachHang : data.TenKhachHang,
      DiaChi : data.DiaChi,
      Email : data.Email,
      SoDienThoai : data.SoDienThoai,
      MatKhau : data.MatKhau,
      HinhAnh : image
    }

    axios
      .post("http://localhost/raovatnhanh/api/khachhang", dataModel)
      .then((response) => {
        if(response.status === 201){
          history.push('/login');
        }
      })
      .catch((error) => console.log(error));
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

  return (
    <div>
      <Header />
      <div className="container d-flex flex-column py-5 py-md-0 mt-2">
        <div className="row align-items-center justify-content-center no-gutters min-vh-100">
          <div className="col-md-9 col-lg-8 col-xl-8">
            <div className="text-center mb-3">
              <h1 className="mb-2">Tạo tài khoản</h1>
            </div>
            <span className="clearfix" />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-lg-4">
                  <div className="mb-4">
                    <label className="form-label">Họ và tên</label>
                    <input
                      type="text"
                      className="form-control"
                      name="TenKhachHang"
                      placeholder="Họ và tên"
                      ref={register({ required: true })}
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="mb-4">
                    <label className="form-label">Địa chỉ</label>
                    <input
                      type="text"
                      className="form-control"
                      name="DiaChi"
                      placeholder="Địa chỉ"
                      ref={register({ required: true })}
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="mb-4">
                    <label className="form-label">Số điện thoại</label>
                    <input
                      type="text"
                      className="form-control"
                      name="SoDienThoai"
                      placeholder="Số điện thoại"
                      ref={register({ required: true, pattern:/^[0-9\b]+$/, maxLength:10 })}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5">
                  <div className="mb-4">
                    <label className="form-label">Địa chỉ email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="Email"
                      placeholder="Email"
                      ref={register({ required: true })}
                    />
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="mb-4">
                    <label className="form-label">Ảnh đại diện</label>
                    <input
                      type="file"
                      className="form-control"
                      name="HinhAnh"
                      onChange={getBase64}
                      ref={register({ required: true })}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5">
                  <div className="mb-4">
                    <label className="form-label">Mật khẩu</label>
                    <div className="input-group mb-3">
                      <input
                        type="password"
                        className="form-control "
                        style={{ borderRight: 0 }}
                        name="MatKhau"
                        ref={register({ required: true })}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="mb-4">
                    <label className="form-label">Nhập lại mật khẩu</label>
                    <input
                      type="password"
                      className="form-control "
                      name="password_confirmation"
                      ref={register({ required: true })}
                      onChange={(e) => setconfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                {password === confirmPassword ? (
                  <div className="col-lg-2">
                    <div className="mb-2">
                      <label className="form-label"></label>
                      <i className="ti-check"></i>
                    </div>
                  </div>
                ) : (
                  <div className="col-lg-2">
                    <div className="mb-2">
                      <label className="form-label"></label>
                      <i className="ti-close"></i>
                    </div>
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-block btn-primary mb-3 mb-sm-0"
              >
                Tạo tài khoản
              </button>
              <div className="mt-2 text-center">
                <small>Bạn đã có tài khoản?</small>
                <Link
                  to="/login"
                  className="text-warning small font-weight-bold"
                >
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
