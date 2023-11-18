

import "./Admin.css";
import {DashBoard} from "../Admin/Components/DashBoard"
import {Header} from "../Admin/Components/Header"
import KhachhangManager from "./CRUD_KhachHang/KhachhangManager";
export const khachhangAdmin = () => {
  return (
    <>
    
      <div className="d_flex">
        <DashBoard />
        <div className="main--content">
          <Header/>
               <KhachhangManager/>
          
          
        </div>
        
      </div>
     
    </>
  );
};

export default khachhangAdmin;
