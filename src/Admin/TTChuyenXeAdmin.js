

import "./Admin.css";
import {DashBoard} from "../Admin/Components/DashBoard"
import {Header} from "../Admin/Components/Header"
import TTChuyenxeManager from "./CRUD_TTChuyenXe/TTChuyenxeManager";
export const TTChuyenXeAdmin = () => {
  return (
    <>
    
      <div className="d_flex">
        <DashBoard />
        <div className="main--content">
          <Header/>
               <TTChuyenxeManager/>
          
          
        </div>
        
      </div>
     
    </>
  );
};

export default TTChuyenXeAdmin;
