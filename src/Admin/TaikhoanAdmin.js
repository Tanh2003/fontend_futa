

import "./Admin.css";
import {DashBoard} from "../Admin/Components/DashBoard"
import {Header} from "../Admin/Components/Header"
import TaikhoanManager from "./CRUD_TaiKhoan/TaikhoanManager";
export const TaikhoanAdmin = () => {
  return (
    <>
    
      <div className="d_flex">
        <DashBoard />
        <div className="main--content">
          <Header/>
               <TaikhoanManager/>
          
          
        </div>
        
      </div>
     
    </>
  );
};

export default TaikhoanAdmin;
