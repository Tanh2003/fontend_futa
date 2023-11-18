

import "./Admin.css";
import {DashBoard} from "../Admin/Components/DashBoard"
import {Header} from "../Admin/Components/Header"
import ChuyenxeManager from "./CRUD_ChuyenXe/ChuyenxeManager";
export const ChuyenxeAdmin = () => {
  return (
    <>
    
      <div className="d_flex">
        <DashBoard />
        <div className="main--content">
          <Header/>
               <ChuyenxeManager/>
          
          
        </div>
        
      </div>
     
    </>
  );
};

export default ChuyenxeAdmin;
