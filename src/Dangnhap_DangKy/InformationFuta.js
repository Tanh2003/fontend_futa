import phone from "../image/phone.svg";
import loginxe from "../image/TVC.svg";
import logotext from "../image/logoText.svg";
import React, { useState, useEffect } from 'react';
import "./LoginFuta.scss";
import {toast} from "react-toastify";
import Footer from "../FooterFuta/Footer";
import HeaderFutaMain from "../HeaderFuta/HeaderFutaMain";
import {createNewKhachhang} from "../userService";
import { Link,useHistory,Redirect } from "react-router-dom";
function InformationFuta() { // Đặt tên thành phần React là Login thay vì login
    const history = useHistory();
    const [state, setState] = useState({
       hoten:'',
       email:'',
       sdt:''
      });
      useEffect(() => {
        // Lấy thông tin từ localStorage nếu có
        const savedSdt = localStorage.getItem('sdt');
      
        // Nếu có thông tin, cập nhật trạng thái component
        if (savedSdt) {
          setState({
           
            sdt: savedSdt,
          });
        }
      }, []);
  

      const handleOnChangeInput = (event, id) => {
        const copyState = { ...state };
        copyState[id] = event.target.value;
        setState({ ...copyState });
      };
      const checkValidInput = () => {
        let isValid = true;
        const arrInput=['hoten','email','sdt'];
    
        for (let i = 0; i < arrInput.length; i++) {
          if (!state[arrInput[i]]) {
            isValid = false;
            alert('Vui lòng điền vào: ' + arrInput[i]);
            break;
          }
        
        }
        return isValid;
      };


      const handleAddNewUser = () => {
        const isValid = checkValidInput();
        if (isValid) {
          taomoinguoidung({
            hoten:state.hoten,
            email:state.email,
            sdt: state.sdt,
           
          });
        }
      };



      const taomoinguoidung = async (data) => {
        try {
          const response = await createNewKhachhang(data);
          if (response && response.errcode !== 0) {
            toast.error('Tạo Tài khoản thất bại !');
            alert(response.errMessage);
          } else {
            toast.success('Tạo Tài khoản thành công !');
            setState({
                hoten:'',
                email:'',
                sdt:''
             
            });
            history.replace("/Login");
          }
        } catch (e) {
          console.log(e);
        }
      };








    
    const [isShowPassword, setIsShowPassword] = useState(false);
    const handleShowHidePassword = () => {
      setIsShowPassword(!isShowPassword);
    };


 
    return (
        <div>
            
        <HeaderFutaMain/>
         <main>
             <div className="body-content">
                 <div className="login-box">
                     <div className="login-images">
                         <div className="login-image1"><img src={logotext}/></div>
                         <div className="login-image2"><img src={loginxe}/></div>
                     </div>
                     <div className="create-account">
                         <b>Cập nhật thông tin</b>
                         <div className="login-left">
                            <img src={phone} className=""/>
                            <Link to="/login" className="login">
  Đăng nhập
</Link>
<Link to="/register" className="register">
  Đăng ký
</Link>
                         </div>
                         <hr className="custom-hr" />
                         <div className="input-group">
                             <input type="text" placeholder="Nhập số điện thoại" 
                             onChange={(event) => {
                                handleOnChangeInput(event, 'sdt');
                              }}
                              value={state.sdt}
                              readOnly
                             />
                            
                         </div>
                         <div className="input-group">
                             <input type="text" placeholder="Nhập Họ và tên" 
                             onChange={(event) => {
                                handleOnChangeInput(event, 'hoten');
                              }}
                              value={state.hoten}
                             />
                            
                         </div>
                         <div className="input-group">
                             <input type="text" placeholder="Nhập Email" 
                             onChange={(event) => {
                                handleOnChangeInput(event, 'email');
                              }}
                              value={state.email}
                             />
                            
                         </div>
                       
                         
                         <button  className="btn-login"onClick={()=>{handleAddNewUser()}} >Tiếp tục</button>
                     </div>
                 </div>
             </div>
         </main>
   <Footer/>
     </div>
    );
}

export default InformationFuta;
