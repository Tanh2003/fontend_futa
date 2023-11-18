

import "./Admin.css";
import {DashBoard} from "../Admin/Components/DashBoard"
import {Header} from "../Admin/Components/Header"
import QuyenHanManager from "./CRUD_QuyenHan/QuyenHanManager";
export const QuyenAdmin = () => {
  return (
    <>
    
      <div className="d_flex">
        <DashBoard />
        <div className="main--content">
          <Header/>
               <QuyenHanManager/>
          
          
        </div>
        
      </div>
     
    </>
  );
};

export default QuyenAdmin;
