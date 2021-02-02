import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { useForm } from "react-hook-form";
import Loading from "../Common/Loading";

export default function DetailPost() {
  const { id } = useParams();

  const [infoDetail, setInfoDetail] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

  const [isEdit, setIsEdit] = useState(true);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  const [listDistrict, setListDistrict] = useState([]);
  const [typeDistrict, setTypeDistrict] = useState();
  const [listProvince, setListProvince] = useState([]);
  const [typeProvince, setTypeProvince] = useState([]);

  const [contentReport, setContentReport] = useState("");

  const [image, setImage] = useState();

  const user = JSON.parse(localStorage.getItem("userLoggedIn"));

  const history = useHistory();

  const { register, errors, handleSubmit } = useForm();

  const getDetailPost = () => {
    axios
      .get(`http://localhost/raovatnhanh/api/baidang/${id}`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setInfoDetail(response.data);
          response.data[0].IDKhachHang === user?.IDKhachHang
            ? setIsOwner(true)
            : setIsOwner(false);
          setLoading(false);
        }
      })
      .catch((error) => console.log(error));
  };

  const getListProvince = () => {
    axios
      .get("http://localhost/raovatnhanh/api/tinhthanh")
      .then((response) => {
        if (response.status === 200) {
          //console.log(response);
          setListProvince(response.data);
        }
      })
      .catch((error) => console.log(error));
  };

  const getListDistrict = (data) => {
    if (data != null) {
      axios
        .get(`http://localhost/raovatnhanh/api/quanhuyen/${data}`)
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            setListDistrict(response.data);
          }
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .get(
          `http://localhost/raovatnhanh/api/quanhuyen/${infoDetail[0].TinhThanh}`
        )
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            setListDistrict(response.data);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const addPost = () => {
    const dataModel = {
      IDBaiDang: infoDetail[0].IDBaiDang,
      IDKhachHang: user?.IDKhachHang,
    };

    axios
      .post("http://localhost/raovatnhanh/api/tinluu", dataModel)
      .then((response) => {
        if (response.status === 200) {
          window.alert("Tin này bạn đã lưu rồi");
        } else if (response.status === 201) {
          window.alert("Lưu thành công");
          history.push("/quanlybaidang");
        }
      });
  };

  const onSubmit = (data) => {
    if (count === 0) {
      setIsEdit(!isEdit);
      getListDistrict();
    }

    if (!isEdit) {
      setLoading(true);

      const dataModel = {
        TieuDe: data ? data.TieuDe : infoDetail[0].TieuDe,
        NoiDung: data ? data.NoiDung : infoDetail[0].NoiDung,
        TinhThanh: data ? data.TinhThanh : infoDetail[0].TinhThanh,
        QuanHuyen: data ? data.QuanHuyen : infoDetail[0].QuanHuyen,
        GiaBan: data ? data.GiaBan : infoDetail[0].GiaBan,
        HinhAnh: image ? image : infoDetail[0]?.HinhAnh,
      };

      axios
        .put(
          `http://localhost/raovatnhanh/api/baidang/${infoDetail[0]?.IDBaiDang}`,
          dataModel
        )
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            setLoading(false);
            history.goBack();
          }
        });
    }

    //console.log(data);
  };

  const reportPost = () => {
    const dataModel = {
      IDBaiDang : infoDetail[0]?.IDBaiDang,
      IDNguoibaoCao : user?.IDKhachHang,
      NoiDungBaoCao : contentReport
    };

    //console.log(dataModel);

    axios.post("http://localhost/raovatnhanh/api/baocao",dataModel)
    .then(repsonse => {
      if(repsonse.status === 201){
        window.alert('Báo cáo thành công')
      }
    })
    .catch(error => console.log(error));
  }

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

  useEffect(() => {
    window.scrollTo(0, 0);
    getDetailPost();
    getListProvince();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div>
      <Header />
      <div className="breadcrumbs">
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
                    <Link to="#">Chi tiết bài đăng</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section id="contact-us" className="contact-us">
        <div className="container">
          <div className="contact-head">
            <div className="row">
              <div className="col-lg-8 col-12">
                <form className="form-main" onSubmit={handleSubmit(onSubmit)}>
                  <div className="title">
                    <h3>Chi tiết bài đăng</h3>
                    <hr />
                    {isEdit ? (
                      <h4>{infoDetail[0]?.TieuDe}</h4>
                    ) : (
                      <input
                        name="TieuDe"
                        type="text"
                        defaultValue={infoDetail[0]?.TieuDe}
                        ref={register({ required: true })}
                      />
                    )}
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-12">
                      <div className="form-group">
                        <label>Người đăng:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <label>{infoDetail[0]?.TenKhachHang}</label>
                      </div>
                    </div>
                    <div className="col-lg-6 col-12">
                      <div className="form-group">
                        <label>Số điện thoại:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <label>{infoDetail[0]?.SoDienThoai}</label>
                      </div>
                    </div>
                    <div className="col-lg-8 col-12">
                      <div className="form-group">
                        <label>
                          Địa chỉ email liên hệ:&nbsp;&nbsp;&nbsp;&nbsp;
                        </label>
                        <label>{infoDetail[0]?.Email}</label>
                      </div>
                    </div>
                    <div className="col-lg-4 col-12">
                      <div className="form-group">
                        <label>Giá bán:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        {isEdit ? (
                          <label>{infoDetail[0]?.GiaBan}</label>
                        ) : (
                          <input
                            name="GiaBan"
                            type="text"
                            defaultValue={infoDetail[0]?.GiaBan}
                            ref={register({
                              required: true,
                              pattern: /^[0-9\b]+$/,
                            })}
                          />
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 col-12">
                      <div className="form-group">
                        <label>Tỉnh/thành phố:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        {isEdit ? (
                          <label>{infoDetail[0]?.TenTinhThanh}</label>
                        ) : (
                          <select
                            class="form-control"
                            name="TinhThanh"
                            ref={register({ required: true })}
                            onChange={(e) => {
                              setTypeProvince(e.target.value);
                              getListDistrict(e.target.value);
                            }}
                          >
                            {listProvince && infoDetail ? (
                              listProvince.map((itemProvince) => {
                                var selected =
                                  itemProvince.id == infoDetail[0].TinhThanh
                                    ? true
                                    : false;
                                return (
                                  <option
                                    value={itemProvince.id}
                                    selected={selected}
                                  >
                                    {itemProvince._name}
                                  </option>
                                );
                              })
                            ) : (
                              <option>Loading</option>
                            )}
                          </select>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6 col-12">
                      <div className="form-group">
                        <label>Quận/Huyện:&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        {isEdit ? (
                          <label>{infoDetail[0]?.TenQuanHuyen}</label>
                        ) : (
                          <select
                            class="form-control"
                            name="QuanHuyen"
                            ref={register({ required: true })}
                          >
                            {listDistrict && infoDetail ? (
                              listDistrict.map((itemDistrict) => {
                                var selected =
                                  itemDistrict.id == infoDetail[0].QuanHuyen
                                    ? true
                                    : false;
                                return (
                                  <option
                                    value={itemDistrict.id}
                                    selected={selected}
                                  >
                                    {itemDistrict._name}
                                  </option>
                                );
                              })
                            ) : (
                              <option>Loading</option>
                            )}
                          </select>
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group message">
                        <label>Nội dung</label>
                        <textarea
                          name="NoiDung"
                          placeholder
                          defaultValue={infoDetail[0]?.NoiDung}
                          disabled={isEdit}
                          ref={register({ required: true })}
                        />
                      </div>
                    </div>
                    {isOwner ? (
                      isEdit ? (
                        <div className="col-12">
                          <div className="form-group button">
                            <button
                              type="submit"
                              className="btn"
                              disabled={user ? false : true}
                            >
                              Chỉnh sửa tin
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="col-12">
                          <div className="form-group button">
                            <button
                              type="submit"
                              className="btn"
                              disabled={user ? false : true}
                            >
                              Hoàn tất
                            </button>
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="col-12">
                        <div className="form-group button">
                          <button
                            disabled={user ? false : true}
                            type="button"
                            onClick={() => addPost()}
                            className="btn "
                          >
                            Lưu tin này
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </div>
              <div className="col-lg-4 col-12">
                <div className="single-head">
                  <h4 class="title">Hình ảnh</h4>
                  {isEdit ? (
                    <img src={infoDetail[0].HinhAnh} />
                  ) : (
                    <input
                      type="file"
                      className="form-control"
                      onChange={getBase64}
                      name="HinhAnh"
                    />
                  )}
                </div>
              </div>
              {!isOwner ? (
                <div className="col-12">
                  <div className="col-12 mt-3">
                    <div className="form-group button">
                      <textarea
                        name="NoiDungBaoCao"
                        placeholder="Nội dung báo cáo"
                        onChange={(e) => setContentReport(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group button">
                      <button
                        type="button"
                        onClick={() => reportPost()}
                        className="btn "
                      >
                        Báo cáo tin này
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
