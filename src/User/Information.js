import React, { useState, useEffect } from 'react';
import "react-toastify/dist/ReactToastify.css";
import "./ThongTinCaNhan.scss";
import {toast} from "react-toastify";
import Footer from "../FooterFuta/Footer";
import HeaderFutaMain from "../HeaderFuta/HeaderFutaMain";
import {getAllThongtintaikhoan} from "../userService";
import { Link,useHistory,Redirect } from "react-router-dom";
import _ from 'lodash';
import hinh from "../image/ahah.jpg";
function Thongtinprofile() {
    const history = useHistory();
  
  const [thongtin, setThongtin] = useState();
  useEffect(() => {
    const fetchData = async () => {


        const getAllTaikhoanReact = async () => {
            const taiKhoanData = JSON.parse(localStorage.getItem('taikhoan'));
            if (taiKhoanData) {
                const sdt = taiKhoanData.sdt;
                if (sdt) {
                    let response = await getAllThongtintaikhoan(sdt);
                    if (response && response.errcode === 0) {
                        setThongtin(response.info);
                    }
                }
            }
        };
        

        // Gọi hàm async
        await getAllTaikhoanReact();

      
    };

    // Gọi fetchData ngay khi component mount
    fetchData();
}, []); // Truyền mảng rỗng để chỉ gọi useEffect 1 lần khi component mount










  const handleUpdateInformation = () => {

   
    history.replace("/updateInformation");
  
  };



 







 

  














  const formatDate = (isoDate) => {
    const dateObject = new Date(isoDate);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    return `${day}/${month}/${year}`;
  };







  return (
    <main>
      <div className="custom-box-profile">
        
       <from>
       <div className='ttcannhan'>
        Thông Tin cá nhân
        </div>
          <div className="row">
            <div className="col-5">
             
                <img
                 src={hinh}
                  alt="Selected Avatar"
                  className="selected-image"
                />
             
            </div>
            <div className="col ds-profilt">
              <div className="row">
                <div className="col">
                  <label>Họ và tên:</label>
                </div>
                <div className="col">
                 {thongtin&&thongtin.hoten}
                </div>
              </div>

              

              <div className="row">
                <div className="col">
                  <label>Giới tính:</label>
                </div>
                <div className="col">
                {thongtin&&thongtin.gioitinh}
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label>Email:</label>
                </div>
                <div className="col">
                {thongtin&&thongtin.email}
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label>Ngày sinh:</label>
                </div>
                <div className="col">
                {formatDate(thongtin&&thongtin.ngaysinh)}
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label>Địa chỉ:</label>
                </div>
                <div className="col">
                {thongtin&&thongtin.diachi}
                </div>
              </div>

              
            </div>
          </div>
          <div className="row">
            <button type="submit2"onClick={handleUpdateInformation}>Cập nhật Thông tin</button>
          </div>
          </from>
      </div>
    </main>
  );
}

const Information = () => {
  return (
    <div>
      <HeaderFutaMain />
      <Thongtinprofile />
      <Footer />
    </div>
  );
};

export default Information;