import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="footer">
        {/* Footer Top */}
        <div className="footer-top section">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-6 col-12">
                {/* Single Widget */}
                <div className="single-footer about">
                  <p className="text">
                    Sinh viên thực hiện: <br />
                    Hà Huy Khôi - 17520647 <br/>
                    Hoàng Xuân Tùng - 17521233
                  </p>
                  <p className="call">
                    Got Question? Call us 24/7
                    <span>
                      <a href="tel:123456789">(+84) 012 3456 789</a>
                    </span>
                  </p>
                </div>
                {/* End Single Widget */}
              </div>
              <div className="col-lg-2 col-md-6 col-12">
                {/* Single Widget */}
                <div className="single-footer links">
                  <h4>Thông tin</h4>
                  <ul>
                    <li>
                      <a href="#">Về chúng tôi</a>
                    </li>
                    <li>
                      <a href="#">Liện hệ</a>
                    </li>
                    <li>
                      <a href="#">Giúp đỡ</a>
                    </li>
                  </ul>
                </div>
                {/* End Single Widget */}
              </div>
              <div className="col-lg-2 col-md-6 col-12">
                {/* Single Widget */}
                <div className="single-footer links">
                  <h4>Dịch vụ kH</h4>
                  <ul>
                    <li>
                      <a href="#">Thanh toán</a>
                    </li>
                    <li>
                      <a href="#">Hoàn tiền</a>
                    </li>
                    <li>
                      <a href="#">Shipping</a>
                    </li>
                    <li>
                      <a href="#">Điều khoản</a>
                    </li>
                  </ul>
                </div>
                {/* End Single Widget */}
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                {/* Single Widget */}
                <div className="single-footer social">
                  <h4>Get In Touch</h4>
                  {/* Single Widget */}
                  <div className="contact">
                    <ul>
                      <li>UIT-ĐHCNTT</li>
                      <li>TPHCM</li>
                      <li>raovatnhanh@gmail.com</li>
                      <li>(+84) 012 3456 789</li>
                    </ul>
                  </div>
                  {/* End Single Widget */}
                  <ul>
                    <li>
                      <a href="#">
                        <i className="ti-facebook" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="ti-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="ti-flickr" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="ti-instagram" />
                      </a>
                    </li>
                  </ul>
                </div>
                {/* End Single Widget */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
