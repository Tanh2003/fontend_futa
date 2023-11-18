import React, { useState, useEffect } from 'react';
import "react-toastify/dist/ReactToastify.css";
import "./ThongTinCaNhan.scss";
import {toast} from "react-toastify";
import Footer from "../FooterFuta/Footer";
import HeaderFutaMain from "../HeaderFuta/HeaderFutaMain";
import {getAllThongtintaikhoan,editKhachhang} from "../userService";
import { Link,useHistory,Redirect } from "react-router-dom";
import _ from 'lodash';
import hinh from "../image/ahah.jpg";
function CapNhapProfile() {
    const history = useHistory();
    const [state, setState] = useState({
        hoten:"",
        email:"",
       diachi:'',
       ngaysinh:'',
       gioitinh:'',
       email:"",
       sdt:""
       });


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

        // Tiếp tục xử lý dữ liệu sau khi hàm async hoàn thành
        if (thongtin && !_.isEmpty(thongtin)) {
            setState({
                hoten: thongtin.hoten,
                email: thongtin.email,
                diachi: thongtin.diachi,
                ngaysinh: thongtin.ngaysinh,
                gioitinh: thongtin.gioitinh
            });
        }
    };

    // Gọi fetchData ngay khi component mount
    fetchData();
}, []); // Truyền mảng rỗng để chỉ gọi useEffect 1 lần khi component mount










  const handleUpdateInformation = () => {

   
        capnhatthongtin ({
        sdt:thongtin.sdt,
        hoten:state.hoten,
        email:state.email,
       diachi:state.diachi,
       ngaysinh:state.ngaysinh,
       gioitinh:state.gioitinh,

       
      });
  
  };



  const capnhatthongtin = async (data) => {
    try {
      const response = await editKhachhang(data);
      if (response && response.errcode !== 0) {
        toast.error('Cập nhật thất bại !');
        alert(response.errMessage);
      } else {
        toast.success('Cập nhật thành công !');
        setState({
            hoten:"",
            email:"",
            diachi:'',
            ngaysinh:'',
            gioitinh:'',
            email:"",
       
         
        });
        history.replace("/");
      }
    } catch (e) {
      console.log(e);
    }
  };


  const handleOnChangeInput = (event, id) => {
    const copyState = { ...state };
    copyState[id] = event.target.value;
    setState({ ...copyState });
  };





 

  





















  return (
    <main>
      <div className="custom-box-profile">
        
       <from>
       <div className='ttcannhan'>
          Cập nhật  Thông Tin cá nhân
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
                  <input
                    type="text"
                    className='form-control'
                    onChange={(event) => {
                        handleOnChangeInput(event, 'hoten');
                      }}
                      value={state.hoten}
                  />
                </div>
              </div>

              

              <div className="row">
                <div className="col">
                  <label>Giới tính:</label>
                </div>
                <div className="col">
                  <select
                    type="text"
                    className='form-control'
                    onChange={(event) => {
                        handleOnChangeInput(event, 'gioitinh');
                      }}
                      value={state.gioitinh}
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>


                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label>Email:</label>
                </div>
                <div className="col">
                  <input
                    type="text"
                    className='form-control'
                    onChange={(event) => {
                        handleOnChangeInput(event, 'email');
                      }}
                      value={state.email}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label>Ngày sinh:</label>
                </div>
                <div className="col">
                  <input
                    type="text"
                    className='form-control'
                    onChange={(event) => {
                        handleOnChangeInput(event, 'ngaysinh');
                      }}
                      value={state.ngaysinh}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label>Địa chỉ:</label>
                </div>
                <div className="col">
                  <input
                    type="text"
                    className='form-control'
                    onChange={(event) => {
                        handleOnChangeInput(event, 'diachi');
                      }}
                      value={state.diachi}
                  />
                </div>
              </div>

              
            </div>
          </div>
          <div className="row">
            <button type="submit2"onClick={handleUpdateInformation}>Cập nhật</button>
          </div>
          </from>
      </div>
    </main>
  );
}

const ThongTinCaNhan = () => {
  return (
    <div>
      <HeaderFutaMain />
      <CapNhapProfile />
      <Footer />
    </div>
  );
};

export default ThongTinCaNhan;