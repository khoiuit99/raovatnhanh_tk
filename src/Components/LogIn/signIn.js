import React from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "../Common/Header";
import { useForm } from "react-hook-form";
import axios from "axios";
import Footer from "../Common/Footer";

export default function LogInPage() {
  const { register, errors, handleSubmit } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    axios
      .post("http://localhost/raovatnhanh/api/dangnhapp", data)
      .then((response) => {
        if (response.status === 200) {
          if (response.data === 0) {
            window.alert("Đăng nhập thất bại");
          } else {
            localStorage.setItem("userLoggedIn", JSON.stringify(response.data));
            history.push("/");
          }
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Header />
      <div className="container d-flex flex-column">
        <div className="row align-items-center justify-content-center no-gutters min-vh-100">
          <div className="col-md-6 col-lg-5 col-xl-4">
            <div className="text-center mb-3">
              <h1 className=" mt-2">Đăng nhập</h1>
            </div>
            <span className="clearfix" />
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="form-label">Email</label>
                <input
                  id="email"
                  type="email"
                  className="form-control "
                  name="Email"
                  placeholder="Email"
                  ref={register({ required: true })}
                />
              </div>
              <div className="mb-4 mb-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <label className="form-label">Password</label>
                  </div>
                  <div className="mb-2">
                    <a
                      href="#"
                      className="small text-muted text-underline--dashed"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <input
                  id="password"
                  type="password"
                  className="form-control "
                  name="MatKhau"
                  ref={register({ required: true })}
                />
              </div>
              <div className="text-center mb-3">
                <button type="submit" className="btn btn-block btn-primary">
                  Đăng nhập
                </button>
              </div>
              <div className="mt-4 text-center">
                <small>Bạn chưa có tài khoản?</small>
                <Link to="/signup" className="small font-weight-bold">
                  Đăng kí
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
