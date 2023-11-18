import * as React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IndexAdmin from "../Admin/IndexAdmin";
import LoginFuta from "../Dangnhap_DangKy/LoginFuta";

import TrangChu from "../User/TrangChu";
import LienHe from "../User/LienHe";
import DatXe from "../User/DatXe";

import QuyenAdmin from "../Admin/QuyenAdmin";
import TaikhoanAdmin from "../Admin/TaikhoanAdmin";
import khachhangAdmin from "../Admin/khachhangAdmin";
import NhanvienAdmin from "../Admin/NhanvienAdmin";
import ChuyenxeAdmin from "../Admin/ChuyenxeAdmin";
import InformationFuta from "../Dangnhap_DangKy/InformationFuta";

import RegisterFuta from "../Dangnhap_DangKy/RegisterFuta";
import TTChuyenXeAdmin from "../Admin/TTChuyenXeAdmin";
import ThongTinCaNhan from "../User/ThongTinCaNhan";
import Information from "../User/Information";
import TicketConfirmation from "../User/TicketConfirmation";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin/ttchuyenxe" exact component={TTChuyenXeAdmin} />
        <Route path="/admin/chuyenxe" exact component={ChuyenxeAdmin} />
        <Route path="/admin/nhanvien" exact component={NhanvienAdmin} />
        <Route path="/admin/khachhang" exact component={khachhangAdmin} />
        <Route path="/admin/taikhoan" exact component={TaikhoanAdmin} />
        <Route path="/admin/xe" exact component={IndexAdmin} />
        <Route path="/admin/quyen" component={QuyenAdmin} />
        <Route path="/Login" component={LoginFuta} />
        <Route path="/register" component={RegisterFuta} />
        <Route path="/infomation" component={InformationFuta} />
        <Route path="/Informationprofile" component={Information} />
        <Route path="/updateInformation" component={ThongTinCaNhan} />
        <Route path="/lienhe" exact component={LienHe} />
        <Route path="/datxe/:id" component={DatXe} />
        <Route path="/datvethanhcong/:phone" exact component={TicketConfirmation} />
        // phải để dấu "/" ở cuối route
        <Route path="/" component={TrangChu} />
      </Switch>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Router>
  );
}

export default App;
