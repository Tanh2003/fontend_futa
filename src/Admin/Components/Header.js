import Admin from "../Admin.css";
import NavDropdown from 'react-bootstrap/NavDropdown';
export const Header = () => {
  

  return (
    <>
      <div className="headadmin d-flex">
        <div className="page_admin">
          <h1>Admin Page</h1>
        </div>
        <div className=" username d-flex">
          <h3> xin chào,Admin</h3>
          
         
        </div>
        <div>
        {/* <h3>
        <NavDropdown
         
         title={<i className="fas fa-cogs" style={{background:"white"}}></i>}
         id="basic-nav-dropdown"
       >
         <NavDropdown.Item >
           <i className="fas fa-key mr-3"></i>
           Đổi mật khẩu
         </NavDropdown.Item>

         <NavDropdown.Divider />

         <NavDropdown.Item >
           <i className="fas fa-sign-out-alt mr-3"></i>
           Đăng xuất
         </NavDropdown.Item>
       </NavDropdown>
        </h3> */}
        </div>
       
        
      </div>
    </>
  );
};
