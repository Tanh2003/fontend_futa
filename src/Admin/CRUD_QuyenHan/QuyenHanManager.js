import React, { Component } from "react";
import {
  getAllQuyenhan,
  createNewQuyenhan,
  deleteQuyenhan,
  editQuyenhan
} from "../../userService";
import { emitter } from "../../utils/emitter";
import { toast } from "react-toastify";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";


import ModalQuyenHan from "./ModalQuyenHan";
import ModalEditQuyenHan from "./ModalEditQuyenHan";




class QuyenHanManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrquyenhan: [],
      isOpenModalEditProduct: false,
      isOpenModalCategories: false,
      productEdit: {},
      currentPage: 1,
      productsPerPage: 5,
      
    };
    this.handlePageChange = this.handlePageChange.bind(this); // Thêm dòng này
  }

  async componentDidMount() {
  
    await this.getAllQuyenHanReact();
  }
  getAllQuyenHanReact = async () => {
    let response = await  getAllQuyenhan("ALL");
    if (response && response.errcode == 0) {
      this.setState({
        arrquyenhan: response.quyenhan,
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
  
  createNewXe = async (data) => {
    try {
      let response = await createNewQuyenhan(data);
      if (response && response.errcode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllQuyenHanReact();
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

  handleDeleteXe = async (xe) => {
    try {
      let res = await deleteQuyenhan(xe.id);
      if (res && res.errcode !== 0) {
        alert(res.errMessage);
        toast.error("Xóa thất bại");
      } else {
        await this.getAllQuyenHanReact();
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

  doEditXe = async (user) => {
    try {
      let res = await  editQuyenhan(user);
      if (res && res.errcode === 0) {
        await this.getAllQuyenHanReact();
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
    const { arrquyenhan, currentPage, productsPerPage } = this.state;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = arrquyenhan.slice(indexOfFirstProduct, indexOfLastProduct);
    return (
      <div className="hello">
      
         <ModalQuyenHan
          isOpen={this.state.isOpenModalCategories}
          toggleFromParent={this.toggleCategoriesModal}
          createNewXe={this.createNewXe}
        />
        {this.state.isOpenModalEditProduct && (
          <ModalEditQuyenHan
            isOpen={this.state.isOpenModalEditProduct}
            toggleFromParent={this.toggleUserEditModal}
            currentUser={this.state.productEdit}
            editUser={this.doEditXe}
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
                  <i class="fas fa-box mr-2"></i>Thêm tên quyền
                  </button>
                  
                  <h2 className="h2--title">Danh sách quyền</h2>

                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>id</th>
                          <th>Tên quyền</th>
                          <th>Hành động</th>
                        
                        </tr>
                      </thead>
                      <tbody>
                        {currentProducts &&
                          currentProducts.map((item, index) => {
                    
                            return (
                              <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.tenquyen}</td>
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
                                      this.handleDeleteXe(item);
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
                      count={Math.ceil(arrquyenhan.length / productsPerPage)}
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

export default QuyenHanManager;
