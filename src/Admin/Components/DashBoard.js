import React from "react";

import { useHistory } from 'react-router-dom';


// Bây giờ bạn có thể sử dụng useHistory trong file này

export const DashBoard = () => {
  const history = useHistory();

  const handleManagekhachhang = () => {
    history.replace("/admin/khachhang");
  };
  const handleManageNhanvien = () => {
    history.replace("/admin/nhanvien");
  };
  const handleManageQuyen = () => {
    history.replace("/admin/quyen"); // Sử dụng replace thay vì push
  };

  const handleManageXe = () => {
    history.replace("/admin/xe");
  };
  const handleManageChuyenxe = () => {
    history.replace("/admin/chuyenxe");
  };

  const handleManageTTChuyenxe = () => {
    history.replace("/admin/ttchuyenxe");
  };
 

  const handleManageTaikhoan = () => {

    history.replace("/admin/taikhoan");
  };

  return (
    <>
      <div className="sidebar">
        <div className="logo"></div>
        <ul className="menu">
          <li className="active">
            <i className="fa-solid fa-house"></i>
            <span>Trang chủ </span>
          </li>
          <li onClick={() => handleManageTaikhoan()}>
          <i className="fas fa-users mr-2"></i>
            <span>Quản lý tài khoản</span>
          </li>
          <li onClick={() => handleManageNhanvien()}>
          <i className="fas fa-users-cog mr-2"></i>
            <span>Quản lý nhân viên</span>
          </li>
          <li onClick={() => handleManagekhachhang()}>
          <i className="fas fa-user-tie mr-2"></i>
            <span>Quản lý khách hàng </span>
          </li>
          <li onClick={() => handleManageQuyen()}>
          <i className="fas fa-flag-checkered mr-2"></i>
            <span>Quản lý Quyền </span>
          </li>

          <li onClick={() => handleManageXe()}>
          <i className="fas fa-bus mr-2"></i>
            <span>Quản lý Xe</span>
          </li>
          <li onClick={() => handleManageChuyenxe()}>
          <i className="fas fa-shuttle-van mr-2"></i>
            <span>Quản lý Chuyến Xe</span>
          </li>
          <li onClick={() => handleManageTTChuyenxe()}>
          <i className="fas fa-shuttle-van mr-2"></i>
            <span>Quản lý Thông tin chuyến xe</span>
          </li>

       
          <li className="logout">
            <i className="fas fa-sign-out-alt"></i>
            <span>Đăng xuất</span>
          </li>
        </ul>
      </div>
    </>
  );
};
