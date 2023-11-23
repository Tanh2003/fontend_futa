import React, { Component } from "react";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import _ from "lodash";
import "../Admin.css";

import  {getAllQuyenhan} from "../../userService";

class ModalEditTaikhoan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrquyenhan: [],
      sdt: "" ,
      matkhau:"",
      maquyen:""
    };
  }

  async componentDidMount() {
    await this.getAllQuyenHanReact();
    let user = this.props.currentUser;
    // cachs 2 //let {CurrentUser}=this.props;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
       sdt:user.sdt,
       matkhau:user.matkhau,
       maquyen:user.maquyen
      });
    }
  }
  getAllQuyenHanReact = async () => {
    let response = await  getAllQuyenhan("ALL");
    if (response && response.errcode == 0) {
      this.setState({
        arrquyenhan: response.quyenhan,
      });
    }
  };
  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (event, id) => {
    //good code
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        // console.log('check good state: ',this.state);
      }
    );
    //console.log('copystate: ',copyState);

    // console.log(event.target.value,id)
  };

  checkValideInputEdit = () => {
    let isValid = true;
    let arrInput = ["sdt","matkhau","maquyen"];

    for (let i = 0; i < arrInput.length; i++) {
      console.log("check inside loop", this.state[arrInput[i]], arrInput[i]);
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }

    return isValid;
  };

  handleSaveUser = () => {
    let isValid = this.checkValideInputEdit();

    if (isValid == true) {
      this.props.editUser(this.state);
    }
  };
  render() {
    let quyen=this.state.arrquyenhan;
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className={"model-user-container"}
        size="lg"
        centered
      >
         <ModalHeader
  className="custom-header" // Use the custom CSS class
  toggle={() => {
    this.toggle();
  }}
>
  Sửa thông tin tài khoản
  <span className="close-button" onClick={this.toggle}>
    &times; {/* X symbol */}
  </span>
</ModalHeader>
        <ModalBody>
          <div className="user-redux-body">
            <div className="container center">
              <div className="row-12">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Tài khoản</label>
                    <input
                      className="form-control"
                      placeholder="Nhập tên tài khoản"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "sdt");
                      }}
                      value={this.state.sdt}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Mật khẩu</label>
                    <input
                      className="form-control"
                      placeholder="Nhập mật khẩu"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "matkhau");
                      }}
                      value={this.state.matkhau}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Quyền</label>
                    <select className="form-control"
                     onChange={(event) => {
                      this.handleOnChangeInput(event, "maquyen");
                    }}
                    value={this.state.maquyen}>
                         <option  value=''>Chọn quyền</option>
                     {
                      quyen&&quyen.length>0
                      &&quyen.map((item,index)=>{
                        return(
                          <option  value={item.id}>{item.tenquyen}</option>
                        )
                      })
                     }
                     
                    </select>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="primary"
            color="primary"
            className="px-3"
            onClick={() => {
              this.handleSaveUser();
            }}
          >
            Lưu thay đổi
          </Button>
          <Button
            variant="secondary"
            color="danger"
            className="px-3"
            onClick={() => {
              this.toggle();
            }}
          >
            Đóng
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalEditTaikhoan;
