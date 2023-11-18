

import "./Admin.css";
import {DashBoard} from "../Admin/Components/DashBoard";
import {Header} from "../Admin/Components/Header";
import XeManager from "../Admin/CRUD_xe/XeManager";
export const IndexAdmin = () => {
  return (
    <>
    
      <div className="d_flex">
        <DashBoard />
        <div className="main--content">
          <Header/>
               <XeManager/>
          
          
        </div>
        
      </div>
     
    </>
  );
};

export default IndexAdmin;
