import React, { Component } from "react";
import { getAllXe, createNewXe, deleteXe, editXe } from "../../userService";
import { emitter } from "../../utils/emitter";
import { toast } from "react-toastify";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ModalXe from "./ModalXe";
import ModalEditXe from "./ModalEditXe";

class XeManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrXe: [],
      isOpenModalEditProduct: false,
      isOpenModalCategories: false,
      productEdit: {},
      currentPage: 1,
      productsPerPage: 5,
      previewImgURL: "",
    };
    this.handlePageChange = this.handlePageChange.bind(this); // Thêm dòng này
  }

  async componentDidMount() {
    await this.getAllXeReact();
  }
  getAllXeReact = async () => {
    let response = await getAllXe("ALL");
    if (response && response.errcode == 0) {
      this.setState({
        arrXe: response.xe,
      });
    }
  };

  handleAddCategories = () => {
    this.setState({
      isOpenModalCategories: true,
    });
  };
  toggleCategoriesModal = () => {
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
      let response = await createNewXe(data);
      if (response && response.errcode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllXeReact();
        this.setState({
          isOpenModalCategories: false,
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
      let res = await deleteXe(xe.id);
      if (res && res.errcode !== 0) {
        alert(res.errMessage);
        toast.error("Xóa thất bại");
      } else {
        await this.getAllXeReact();
        toast.success("Xóa thành công");
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
      let res = await editXe(user);
      if (res && res.errcode === 0) {
        await this.getAllXeReact();
        toast.success("Sửa thành công");
        this.setState({
          isOpenModalEditProduct: false,
        });
      } else {
        toast.error("Sửa thất bại");
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
    const { arrXe, currentPage, productsPerPage } = this.state;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = arrXe.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
    return (
      <div className="hello">
        <ModalXe
          isOpen={this.state.isOpenModalCategories}
          toggleFromParent={this.toggleCategoriesModal}
          createNewXe={this.createNewXe}
        />
        {this.state.isOpenModalEditProduct && (
          <ModalEditXe
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
                    <i class="fas fa-box mr-2"></i>Thêm Thông tin xe
                  </button>

                  <h2 className="h2--title">Danh sách thông tin xe</h2>

                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Số Xe</th>
                          <th>Loại xe</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentProducts &&
                          currentProducts.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.soxe}</td>
                                <td>{item.loaixe}</td>
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
                      <Pagination
                        shape="rounded"
                        count={Math.ceil(arrXe.length / productsPerPage)}
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

export default XeManager;
