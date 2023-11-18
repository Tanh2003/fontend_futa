import React, { useState, useEffect } from 'react';
import './TicketConfirmation.scss';
import { getAllVexe, getAllTTchuyenxe, getAllChuyenxe, } from "../userService";
import { Link, useHistory, Redirect } from "react-router-dom";
import Footer from "../FooterFuta/Footer";
import HeaderFutaMain from "../HeaderFuta/HeaderFutaMain";

const TicketConfirmation = (props) => {
  const sdtne = props.location.state && props.location.state.idchuyenxene;
  const history = useHistory();
  const [hoadon, sethoadon] = useState("");
  const [ttxe, setttxe] = useState({});
  const [chuyenxe11, setchuyenxe] = useState("");

  useEffect(() => {
   

    fetchData();
  }, [sdtne]);

  const fetchData = async () => {
    const hoadonData = await thongtinhoadon();
    if (hoadonData) {
      const ttxeData = await thongtinxe(hoadonData);
      if (ttxeData) {
        await chuyenxe(ttxeData);
      }
    }
  };

  const thongtinhoadon = async () => {
    let response = await getAllVexe(sdtne);
    if (response && response.errcode === 0) {
      sethoadon(response.vexe);
      return response.vexe; // Trả về dữ liệu hoadon
    }
    return null; // Hoặc có thể xử lý lỗi khác ở đây
  };

  const thongtinxe = async (hoadonData) => {
    if (!hoadonData || !hoadonData.machuyen) {
      console.error("Mã chuyến không hợp lệ");
      return null;
    }
    let response = await getAllTTchuyenxe(hoadonData.machuyen);
    if (response && response.errcode === 0) {
      setttxe(response.TTchuyenxe);
      return response.TTchuyenxe; // Trả về dữ liệu ttxe
    }
    return null;
  };

  const chuyenxe = async (ttxeData) => {
    if (!ttxeData || !ttxeData.machuyen) {
      console.error("Mã chuyến không hợp lệ");
      return;
    }
    let response = await getAllChuyenxe(ttxeData.machuyen);
    if (response && response.errcode === 0) {
      setchuyenxe(response.chuyenxe);
    }
  };

  const formatDate = (isoDate) => {
    const dateObject = new Date(isoDate);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    return `${day}/${month}/${year}`;
  };








 

  const handlevetrangchu=()=>{
    history.push("/")
  }
  return (
    <>
    <HeaderFutaMain />
    <div className="ticket-confirmation">
        
      <button className='vip'onClick={handlevetrangchu}>Về trang chủ</button>
      <h1>Đặt vé thành công</h1>
      <div className="ticket-info-box">
        <strong>Thông tin chi tiết vé</strong>
        <p>Vé số:{hoadon.id} </p>
        <p>Ngày đặt: {formatDate(hoadon.thoigianbatdau)}</p>
        <p>Giờ đi: {hoadon.thoigianmua}</p>
      
        <p>Số ghế: {hoadon.soghe}</p>
        <p>Điểm đi: {chuyenxe11.diemdi}</p>
        <p>Điểm đến: {chuyenxe11.diemden}</p>
        <p>Tổng giá: {hoadon.giave}</p>
      </div>

    </div>
    <hr/>
    <Footer />
    </>
  );
};

export default TicketConfirmation;
