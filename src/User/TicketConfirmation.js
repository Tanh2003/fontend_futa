import React, { useState, useEffect } from 'react';
import './TicketConfirmation.scss';
import { getAllVexe, getAllTTchuyenxe, getAllChuyenxe, } from "../userService";
import { Link, useHistory, Redirect } from "react-router-dom";
import Footer from "../FooterFuta/Footer";
import HeaderFutaMain from "../HeaderFuta/HeaderFutaMain";

const TicketConfirmation = (props) => {
 
  const history = useHistory();


 






 

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
        
        
        
        <p> Cảm ơn bạn đã đặt !!.Thông tin vé chúng tôi đã gửi về email cho bạn :33</p>
      </div>

    </div>
    <hr/>
    <Footer />
    </>
  );
};

export default TicketConfirmation;
