import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LienHe.scss";

import Footer from "../FooterFuta/Footer";
import HeaderFutaMain from "../HeaderFuta/HeaderFutaMain";

function Contact() {
  const form = useRef();
  const notify = () => {
    toast("Gửi email thành công!", {
      autoClose: 3000,
      className: "custom-toast",
    });
  };
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_o2rjw9y",
        "template_n6ny7wh",
        form.current,
        "CNcSsmzjX51YBmXFV"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("sent mess");
        },
        (error) => {
          console.log(error.text);
          console.log("error");
        }
      );
  };

  return (
    <main>
      <p className="title2">Gửi thông tin liên hệ đến chúng tôi</p>
      <div className="custom-box2">
        <form ref={form} onSubmit={sendEmail}>
          <div className="row">
            <div className="col">
              <input
                type="text2"
                className="custom-inp"
                value="futabus.pat@gmail.com"
                disabled
              />
            </div>
            <div className="col">
              <input
                type="text2"
                className="custom-inp"
                name="user_name"
                placeholder="Họ và tên"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <input type="text2" name="user_email" placeholder="Email" />
            </div>
            <div className="col">
              <input
                type="text2"
                name="user_phonenumber"
                placeholder="Số điện thoại"
              />
            </div>
          </div>
          <div className="row">
            <input type="title2" name="user_title" placeholder="Nhập tiêu đề" />
          </div>
          <div className="row">
            <textarea type="note" name="message" placeholder="Ghi chú" />
          </div>
          <input type="submit" value="Gửi" onClick={notify} />
        </form>
      </div>
    </main>
  );
}

const LienHe = () => {
  return (
    <div>
      <HeaderFutaMain />
      <Contact />
      <Footer />
    </div>
  );
};

export default LienHe;
