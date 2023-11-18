import React, { Component } from "react";
import {
  getAllTaikhoan,
  createNewTaikhoan,
  deleteTaikhoan,
  editTaikhoan,
  

} from "../../userService";
import { emitter } from "../../utils/emitter";
import { toast } from "react-toastify";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ModalEditTaikhoan from "./ModalEditTaikhoan";
import ModalTaikhoan from "./ModalTaikhoan";




class TaikhoanManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrTaikhoan: [],
      isOpenModalEditProduct: false,
      isOpenModalCategories: false,
      productEdit: {},
      currentPage: 1,
      productsPerPage: 5,
    
    };
    this.handlePageChange = this.handlePageChange.bind(this); // Thêm dòng này
  }

  async componentDidMount() {
  
    await this.getAllTaikhoanReact();
  }
  getAllTaikhoanReact = async () => {
    let response = await getAllTaikhoan("ALL");
    if (response && response.errcode == 0) {
      this.setState({
        arrTaikhoan: response.taikhoans,
      });
    }
  };

  handleAddCategories = () => {
    this.setState({
      isOpenModalCategories: true,
    });
  };
  toggleCategoriesModal= () => {
    this.setState({
      isOpenModalCategories: !this.state.isOpenModalCategories,
    });
  };

 
  toggleUserEditModal = () => {
    this.setState({
      isOpenModalEditProduct: !this.state.isOpenModalEditProduct,
    });
  };
  
  createNewTaikhoan = async (data) => {
    try {
      let response = await createNewTaikhoan(data);
      if (response && response.errcode !== 0) {
        alert(response.errMessage);
      } else {
        await this. getAllTaikhoanReact();
        this.setState({
          isOpenModalCategories:false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
       
      }
      //  console.log("response create user: " , response)
    } catch (e) {
      console.log(e);
    }
    // console.log('check data from child',data)
  };

  handleDeleteUser = async (user) => {
    try {
      let res = await  deleteTaikhoan(user.id);
      if (res && res.errcode !== 0) {
        alert(res.errMessage);
        toast.error("Xóa thất bại");
      } else {
        await this. getAllTaikhoanReact();
        toast.success("Xóa Thành công");
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  handleEditUser = (user) => {
    this.setState({
      isOpenModalEditProduct: true,
      productEdit: user,
    });
  };

  doEditUser = async (user) => {
    try {
      let res = await editTaikhoan(user);
      if (res && res.errcode === 0) {
        await this. getAllTaikhoanReact();
        toast.success("Sửa Thành công");
        this.setState({
          isOpenModalEditProduct: false,
        });
      } else {
        toast.error("Sửa Thất bại");
      }
    } catch (e) {
      console.log(e);
    }
  };


  handlePageChange(event, page) {
    this.setState({
      currentPage: page,
    });
  }
  

  /**Life cycle
   * Run component:
   * 1.run contrucstor-> init state
   * 2.did mouth(set state)
   * 3.render
   */

  render() {
    const { arrTaikhoan, currentPage, productsPerPage } = this.state;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = arrTaikhoan.slice(indexOfFirstProduct, indexOfLastProduct);
    return (
      <div className="hello">
      
         <ModalTaikhoan
          isOpen={this.state.isOpenModalCategories}
          toggleFromParent={this.toggleCategoriesModal}
          createNewTaikhoan={this.createNewTaikhoan}
        />
        {this.state.isOpenModalEditProduct && (
          <ModalEditTaikhoan
            isOpen={this.state.isOpenModalEditProduct}
            toggleFromParent={this.toggleUserEditModal}
            currentUser={this.state.productEdit}
            editUser={this.doEditUser}
          />
        )}

        <div></div>
        <div className="users-table mt-4 mx-3">
          <div className="col">
            <div className="col-md-12">
              <div className="f-index">
                
                <div className="tabular--wrapper">
                  <button
                    className=" btn btn-primary px-3"
                    onClick={() => this.handleAddCategories()}
                  >
                  <i class="fas fa-box mr-2"></i>Thêm Tài khoản
                  </button>
                  
                  <h2 className="h2--title">Danh sách Tài khoản</h2>

                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Số điện thoại</th>
                          <th>Loại tài khoản</th>
                          <th>Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentProducts &&
                          currentProducts.map((item, index) => {
                    
                            return (
                              <tr key={index}>
                                <td>{item.sdt}</td>
                                <td>{item.idmaquyenData.tenquyen}</td>
  
                                <td>
                                  <button
                                    className="btn-edit"
                                    onClick={() => {
                                      this.handleEditUser(item);
                                    }}
                                  >
                                    <i className="fa-regular fa-pen-to-square"></i>
                                  </button>

                                  <span> </span>

                                  <button
                                    className="btn-del"
                                    onClick={() => {
                                      this.handleDeleteUser(item);
                                    }}
                                  >
                                    <i className="fa-regular fa-trash-can"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                                  
                          })}
                      </tbody>
                    </table>
                  </div>
                  <div className="phantrang">
                  <Stack spacing={2}>
                    <Pagination shape="rounded"
                      count={Math.ceil(arrTaikhoan.length / productsPerPage)}
                      page={currentPage}
                      onChange={this.handlePageChange}
                    />
                  </Stack>

                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TaikhoanManager;
