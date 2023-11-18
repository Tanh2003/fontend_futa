

import "./Admin.css";
import {DashBoard} from "../Admin/Components/DashBoard"
import {Header} from "../Admin/Components/Header"
import NhanvienManager from "./CRUD_NhanVien/NhanvienManager";
export const NhanvienAdmin = () => {
  return (
    <>
    
      <div className="d_flex">
        <DashBoard />
        <div className="main--content">
          <Header/>
               <NhanvienManager/>
          
          
        </div>
        
      </div>
     
    </>
  );
};

export default NhanvienAdmin;
