import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Header from "../Common/Header";
import axios from "axios";
import Footer from "../Common/Footer";
import {useHistory} from 'react-router-dom';

export default function CreatePost() {
  const [listCategory, setListCategory] = useState([]);
  const [typeCategory, setTypeCategory] = useState(1);
  const [typeNameBrand, setTypeBrand] = useState();
  const [typeNameModel, setTypeModel] = useState();
  const [listDistrict, setListDistrict] = useState([]);
  const [typeDistrict, setTypeDistrict] = useState();
  const [listProvince, setListProvince] = useState([]);
  const [typeProvince, setTypeProvince] = useState([]);
  const [listModel, setListModel] = useState([]);
  const [detailModel, setDetailModel] = useState({});
  const [image, setImage] = useState();

  const { register, errors, handleSubmit } = useForm();

  const user = JSON.parse(localStorage.getItem("userLoggedIn"));

  const history = useHistory();

  const getListCategory = (id) => {
    axios
      .get(`http://localhost/raovatnhanh/api/hangsx/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setListCategory(response.data);
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
    axios
      .get(`http://localhost/raovatnhanh/api/quanhuyen/${data}`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setListDistrict(response.data);
        }
      })
      .catch((error) => console.log(error));
  };

  const getListModel = (nameBrand) => {
    const dataModel = {
      IDTheLoaiSP: typeCategory,
      IDHangSX: nameBrand,
    };

    axios
      .post("http://localhost/raovatnhanh/api/modelsp", dataModel)
      .then((response) => {
        if (response.status === 200) {
          setListModel(response.data);
        }
      })
      .catch((error) => console.log(error));
  };

  const getDetailModel = (nameModel) => {
    const dataModel = {
      IDTheLoaiSP: typeCategory,
      IDModel: nameModel,
    };

    axios
      .post("http://localhost/raovatnhanh/api/chitietmodel", dataModel)
      .then((response) => {
        setDetailModel(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getListCategory(typeCategory);
    getListProvince();
  }, []);

  const onSubmit = (data) => {
    const dataModel = {
      IDKhachHang: user?.IDKhachHang,
      IDTheLoaiSP: typeCategory,
      IDModel: typeCategory == 3 || typeCategory == 4 ? 0 : typeNameModel,
      TieuDe: data.TieuDe,
      NoiDung: data.NoiDung,
      GiaBan: data.GiaBan,
      TinhThanh: typeProvince,
      QuanHuyen: typeDistrict,
      HinhAnh: image,
    };

    console.log(dataModel);

    axios
      .post("http://localhost/raovatnhanh/api/baidang", dataModel)
      .then((response) => {
        if(response.status === 201){
          window.alert('Đăng bài thành công');
          history.push('/')
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

  const caretories = [
    {
      value: 1,
      text: "Điện thoại di động",
    },
    {
      value: 2,
      text: "Laptop",
    },
    {
      value: 3,
      text: "Linh kiện di động",
    },
    {
      value: 4,
      text: "Linh kiện laptop",
    },
  ];

  return (
    <div>
      <Header />
      <div className="container-fluid p-5">
        <h1 className="h3 mb-3">Tạo bài đăng</h1>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Thông tin người đăng</h5>
              </div>
              <div className="card-body row row-cols-md-auto align-items-center">
                <div className="col-6">
                  <label>Tên người đăng</label>
                  <input
                    type="text"
                    className="form-control mb-2 mr-sm-2"
                    name="TenNguoiDang"
                    placeholder="Tên"
                    defaultValue={user?.TenKhachHang}
                    disabled
                  />
                </div>
                <div className="col-6">
                  <label>Số điện thoại liên hệ</label>
                  <div className="input-group mb-2 mr-sm-2">
                    <input
                      type="text"
                      className="form-control"
                      name="SoDienThoai"
                      placeholder="Số điện thoại"
                      defaultValue={user?.SoDienThoai}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-3">
                  <label>Chọn tỉnh/thành phố</label>
                  <div className="input-group mb-2 mr-sm-2">
                    <select
                      className="form-control"
                      name="TinhThanh"
                      onChange={(e) => {
                        setTypeProvince(e.target.value);
                        getListDistrict(e.target.value);
                      }}
                    >
                      {listProvince.map((itemProvince, index) => {
                        return (
                          <option value={itemProvince.id} key={index}>
                            {itemProvince._name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-3">
                  <label>Chọn quận/huyện</label>
                  <div className="input-group mb-2 mr-sm-2">
                    <select
                      className="form-control"
                      name="QuanHuyen"
                      onChange={(e) => setTypeDistrict(e.target.value)}
                    >
                      {listDistrict.map((itemDistrict, index) => {
                        return (
                          <option value={itemDistrict.id} key={index}>
                            {itemDistrict._name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Thông tin sản phẩm</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="mb-3 col-md-12">
                      <label className="form-label">Tiêu đề</label>
                      <input
                        type="text"
                        className="form-control"
                        name="TieuDe"
                        placeholder="Tiêu đề"
                        ref={register({ required: true })}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nội dung</label>
                    <textarea
                      type="text"
                      className="form-control"
                      name="NoiDung"
                      placeholder="Nội dung bài đăng"
                      rows={5}
                      ref={register({ required: true })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Hình ảnh</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={getBase64}
                      name="HinhAnh"
                    />
                  </div>
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label" htmlFor="inputCity">
                        Danh mục sản phẩm
                      </label>
                      <select
                        className="form-control"
                        name="IDTheLoaiSP"
                        onChange={(e) => {
                          setTypeCategory(e.target.value);
                          getListCategory(e.target.value);
                        }}
                      >
                        {caretories.map((itemCaretory, index) => {
                          return (
                            <option value={itemCaretory.value} key={index}>
                              {itemCaretory.text}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Thể loại sản phẩm</label>
                      <select
                        className="form-control"
                        onChange={(e) => {
                          setTypeBrand(e.target.value);
                          getListModel(e.target.value);
                        }}
                      >
                        {listCategory?.map((itemCaretory, index) => {
                          return (
                            <option
                              value={
                                typeCategory == 1 || typeCategory == 2
                                  ? itemCaretory.IDHangSX
                                  : typeCategory == 3
                                  ? itemCaretory.IDLinhKienDD
                                  : itemCaretory.IDLinhKienMT
                              }
                              key={index}
                            >
                              {typeCategory == 1 || typeCategory == 2
                                ? itemCaretory.TenHangSX
                                : typeCategory == 3
                                ? itemCaretory.TenLinhKienDD
                                : itemCaretory.TenLinhKienMT}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    {typeCategory == 1 || typeCategory == 2 ? (
                      <div className="mb-3 col-md-6">
                        <label className="form-label">Tên sản phẩm</label>
                        <select
                          name="IDModel"
                          className="form-control"
                          onChange={(e) => {
                            setTypeModel(e.target.value);
                            getDetailModel(e.target.value);
                          }}
                        >
                          {listModel?.map((itemModel, index) => {
                            return (
                              <option
                                value={
                                  typeCategory == 1
                                    ? itemModel.IDModelDT
                                    : itemModel.IDModelLT
                                }
                                key={index}
                              >
                                {typeCategory == 1
                                  ? itemModel.TenModelDT
                                  : itemModel.TenModelLT}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Giá bán</label>
                      <input
                        type="text"
                        className="form-control"
                        name="GiaBan"
                        placeholder="Giá bán"
                        ref={register({
                          required: true,
                          pattern: /^[0-9\b]+$/,
                        })}
                      />
                    </div>
                    {typeCategory == 1 ? (
                      <div>
                        <div className="mb-1 col-md-2">
                          <label className="form-label">
                            Chi tiết sản phẩm
                          </label>
                        </div>
                        <div className="row ml-1">
                          <div className="mb-3 col-md-2">
                            <label className="form-label">Hệ điều hành</label>
                            <input
                              type="text"
                              className="form-control"
                              disabled
                              defaultValue={detailModel[0]?.HeDieuHanh}
                            />
                          </div>
                          <div className="mb-3 col-md-2">
                            <label className="form-label">Kích thước</label>
                            <input
                              type="text"
                              className="form-control"
                              disabled
                              defaultValue={detailModel[0]?.KichThuoc}
                            />
                          </div>
                          <div className="mb-3 col-md-2">
                            <label className="form-label">Chíp xử lý</label>
                            <input
                              type="text"
                              className="form-control"
                              disabled
                              defaultValue={detailModel[0]?.ChipXuLi}
                            />
                          </div>
                          <div className="mb-3 col-md-2">
                            <label className="form-label">Ram</label>
                            <input
                              type="text"
                              className="form-control"
                              disabled
                              defaultValue={detailModel[0]?.Ram}
                            />
                          </div>
                          <div className="mb-3 col-md-2">
                            <label className="form-label">Camera</label>
                            <input
                              type="text"
                              className="form-control"
                              disabled
                              defaultValue={detailModel[0]?.Camera}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary mt-3 ml-1">
                    Đăng bài
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
