import phone from "../image/phone.svg";
import loginxe from "../image/TVC.svg";
import logotext from "../image/logoText.svg";
import React, { useState } from 'react';
import "./LoginFuta.scss";
import Footer from "../FooterFuta/Footer";
import HeaderFutaMain from "../HeaderFuta/HeaderFutaMain";
import {handleLoginFuta,getAllThongtintaikhoan} from "../userService";
import { Link,useHistory,Redirect } from "react-router-dom";

function LoginFuta() { // Đặt tên thành phần React là Login thay vì login
    const history = useHistory();

    const [sdt, setsdt] = useState('');
    const [matkhau, setmatkhau] = useState('');
   
    const [errMessage, setErrMessage] = useState('');
    const handleOnChangeUsername = (event) => {
        setsdt(event.target.value);
    }
    
    const handleOnChangematkhau= (event) => {
        setmatkhau(event.target.value);
    }
    const handleLoginne = async () => {
        setErrMessage('');
      
        try {
          let data = await handleLoginFuta(sdt,matkhau);
          if (data && data.errcode !== 0) {
            setErrMessage(data.message);
          }
          if (data && data.errcode === 0) {
            localStorage.setItem('taikhoan', JSON.stringify(data.taikhoan));
            if (data.taikhoan.maquyen === 2) {
              history.replace("/admin/quyen");
              window.location.reload();
            } else {
              history.replace("/");
              window.location.reload();
            }
            console.log("login succeeds");
          }
        } catch (error) {
          if (error.response) {
            if (error.response.data) {
              setErrMessage(error.response.data.message);
            }
          }
          console.log("Ntanh", error.response);
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
                         <b>Đăng nhập tài khoản</b>
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
                              value={sdt}
                              onChange={handleOnChangeUsername}
                             />
                            
                         </div>
                         <div className="input-group">
                             <input type={isShowPassword ? 'text' : 'password'} required name="password" placeholder="Nhập mật khẩu" 
                              value={matkhau}
                              onChange={handleOnChangematkhau}
                             />
                              <span onClick={handleShowHidePassword} className="conmat">
    <i className={isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
  </span> 
                         </div>
                         <div className='col-12' style={{ color: 'red' }}>
                        {errMessage}
                    </div>
                         <button  className="btn-login" onClick={handleLoginne}>Đăng nhập</button>
                     </div>
                 </div>
             </div>
         </main>
   <Footer/>
     </div>
    );
}

export default LoginFuta;
