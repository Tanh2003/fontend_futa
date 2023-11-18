import phone from "../image/phone.svg";
import loginxe from "../image/TVC.svg";
import logotext from "../image/logoText.svg";
import React, { useState,} from 'react';
import "./LoginFuta.scss";
import {toast} from "react-toastify";
import Footer from "../FooterFuta/Footer";
import HeaderFutaMain from "../HeaderFuta/HeaderFutaMain";
import {createNewTaikhoan} from "../userService";
import { Link,useHistory,Redirect } from "react-router-dom";

function RegisterFuta() { // Đặt tên thành phần React là Login thay vì login
  const history = useHistory();
    const [state, setState] = useState({
        sdt:'',
        matkhau:'',
        nhaplaimatkhau:'',
        maquyen:'3'
      });
  
  

      const handleOnChangeInput = (event, id) => {
        const copyState = { ...state };
        copyState[id] = event.target.value;
        setState({ ...copyState });
      };
      const checkValidInput = () => {
        let isValid = true;
        const checkPass = state. nhaplaimatkhau;
        const password = state.matkhau;
        const phoneNumber = state.sdt;
       
        const arrInput=['sdt','matkhau','nhaplaimatkhau'];
    
        for (let i = 0; i < arrInput.length; i++) {
          if (!state[arrInput[i]]) {
            isValid = false;
            alert('Vui lòng điền vào: ' + arrInput[i]);
            break;
          } else if (checkPass !== state.matkhau) {
            isValid = false;
            alert('Mật khẩu nhập lại không giống vui lòng kiểm tra lại');
            break;
          }
           else if (
            password.length < 8 ||
            !/[A-Z]/.test(password) ||
            !/[a-z]/.test(password) ||
            !/\d/.test(password)
          ) {
            isValid = false;
            alert('Mật khẩu yêu cầu ít nhất một chữ cái viết thường, ít nhất một chữ cái viết hoa, ít nhất một số, mật khẩu phải có ít nhất 8 ký tự');
            break;
          }
          if (!/^\d{10}$/.test(phoneNumber)) {
            isValid = false;
            alert('Số điện thoại phải là số và phải có 10 số');
            break;
          }
        }
        return isValid;
      };


      const handleAddNewUser = () => {
        const isValid = checkValidInput();
        if (isValid) {
          taomoinguoidung({
            sdt: state.sdt,
            matkhau: state.matkhau,
            maquyen:state.maquyen
          });
          localStorage.setItem('sdt', state.sdt);
         
        }
      };



      const taomoinguoidung = async (data) => {
        try {
          const response = await createNewTaikhoan(data);
          if (response && response.errcode !== 0) {
           
            alert(response.errMessage);
          } else {
           
            setState({
              sdt: '',
              matkhau: '',
              nhaplaimatkhau: '',
              maquyen:'',
             
            });
            history.replace("/infomation");
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
                         <b>Tạo tài khoản</b>
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
                             />
                            
                         </div>
                         <div className="input-group">
                             <input type={isShowPassword ? 'text' : 'password'} required name="password" placeholder="Nhập mật khẩu" 
                              onChange={(event) => {
                                handleOnChangeInput(event, 'matkhau');
                              }}
                              value={state.matkhau}
                             />
                              <span onClick={handleShowHidePassword} className="conmat">
    <i className={isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
  </span> 
                         </div>
                         <div className="input-group">
                             <input type={isShowPassword ? 'text' : 'password'} required name="password" placeholder="Nhập lai mật khẩu" 
                             onChange={(event) => {
                                handleOnChangeInput(event, 'nhaplaimatkhau');
                              }}
                              value={state.nhaplaimatkhau}
                             />
                              <span onClick={handleShowHidePassword} className="conmat">
    <i className={isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
  </span> 
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

export default RegisterFuta;
