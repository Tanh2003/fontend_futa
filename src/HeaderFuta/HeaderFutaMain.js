import "../HeaderFuta/HeaderFutaMain.scss";
import person from "../image/person.svg";
import { getAllThongtintaikhoan } from "../userService";
import React, { useState, useEffect } from 'react';
import { Link, useHistory, Redirect } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';


const linkStyle = {
  textDecoration: 'none',
  color: 'black',
};

const HeaderFutaMain = () => {
  const history = useHistory();
  const [thongtin, setThongtin] = useState();
  useEffect(() => {
    const getAllTaikhoanReact = async () => {
      const taiKhoanData = JSON.parse(localStorage.getItem('taikhoan'));
      if(taiKhoanData){
        const sdt = taiKhoanData.sdt;
        if (sdt) {
          let response = await getAllThongtintaikhoan(sdt);
          if (response && response.errcode === 0) {
            setThongtin(response.info);
          }
        }
      }
    
     
    };

    getAllTaikhoanReact();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("taikhoan");
   
setThongtin(null);
    history.replace("/Login"); // Sử dụng replace thay vì push
    window.location.reload(); // Tải lại trang
  };



  return (
    <div>
      <div className="daune">
        <div className="box-ovan"></div>
        <div className="text-loginleft">
        {thongtin&&thongtin.hoten !== " " ? (
 <Dropdown>
 <Dropdown.Toggle variant="white" >
 <img src={person} className="mr-2" />
    {thongtin.hoten}
 </Dropdown.Toggle>

 <Dropdown.Menu>
   <Dropdown.Item ><Link to="/Informationprofile" >Thông tin cá nhân</Link></Dropdown.Item>
   <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>

 </Dropdown.Menu>
</Dropdown>
) : (
  <Link to="/Login" style={linkStyle}>
    <img src={person} className="mr-2" />
    <a>Đăng nhập/Đăng ký</a>
  </Link>
)}
        </div>
        <div className="main-menu">
          <ul>
            <li>
              <Link to="/trangchu">Trang chủ</Link>
            </li>
            <li>
              <Link to="/timkiem">Kiểm tra vé</Link>
            </li>
            <li>
             <Link to="/lienhe"> <a>Liên hệ</a></Link>
            </li>
            <li>
              <a href="#">Giới thiệu</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeaderFutaMain;
