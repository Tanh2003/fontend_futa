import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import { toast } from "react-toastify";
import _ from "lodash";
import "../Admin.css";

import  {getAllQuyenhan} from "../../userService";


class ModalTaikhoan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrquyenhan: [],
      sdt: "" ,
      matkhau:"",
      maquyen:""
    };
    this.listenToEmitter();
  }
  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      //reset state
      this.setState({
        sdt: "" ,
        matkhau:"",
        maquyen:""
      });
    });
  };
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
  checkValideInput = () => {
    let isValid = true;
    let arrInput = [
      "sdt","matkhau","maquyen"
    ];

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

  handleAddCategories = () => {
    let isValid = this.checkValideInput();

    if (isValid == true) {
      //call api create modal
      //  console.log('check props child:',this.props);
      this.props.createNewTaikhoan(this.state);
      // console.log('data modal:',this.state)
      toast.success("Tạo Thành công");
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
  Thêm Tài khoản
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
                    <label>Tài khoản </label>
                    <input
                      className="form-control"
                      placeholder="Iphone..."
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
                      placeholder="Iphone..."
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
              this.handleAddCategories();
            }}
          >
            Thêm
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

export default ModalTaikhoan;
