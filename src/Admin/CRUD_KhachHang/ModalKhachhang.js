import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import _ from "lodash";

import "../Admin.css";

class ModalKhachhang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sdt: "",
      hoten:"",
      diachi:"",
      ngaysinh: new Date(), // Khởi tạo ngày mặc định
      gioitinh:"",
      email:"",
      matk:2

   
    };
    this.listenToEmitter();
  }
  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      //reset state
      this.setState({
        sdt: "",
        hoten:"",
        diachi:"",
        ngaysinh:"",
        gioitinh:"",
        email:"",
        matk:""
      });
    });
  };
 componentDidMount() {
  }

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
      "sdt","hoten","diachi","email","matk"
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

  handleAddXe = () => {
    let isValid = this.checkValideInput();

    if (isValid == true) {
      //call api create modal
      //  console.log('check props child:',this.props);
      this.props.createNewXe(this.state);
      // console.log('data modal:',this.state)
      toast.success("Tạo Thành công");
    }
  };
  handleDateChange = (date) => {
   

    this.setState({ ngaysinh: date });
  }

  render() {

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
  Thêm khách hàng
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
                    <label>Số Điện thoại:</label>
                    <input
                      className="form-control"
                      placeholder="Nhập số điện thoại"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "sdt");
                      }}
                      value={this.state.sdt}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Email:</label>
                    <input
                      className="form-control"
                      placeholder="Nhập email"
                      type="email"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "email");
                      }}
                      value={this.state.email}
                    />
                  </div>
                  
                  <div className="form-group col-md-6">
                    <label>Họ và Tên: </label>
                    <input
                      className="form-control"
                      placeholder="Họ và tên"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "hoten");
                      }}
                      value={this.state.hoten}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Địa chỉ:</label>
                    <input
                      className="form-control"
                      placeholder="Nhập địa chỉ"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "diachi");
                      }}
                      value={this.state.diachi}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Giới Tính:</label>
                   <select onChange={(event) => {
                        this.handleOnChangeInput(event, "gioitinh");
                      }}
                      value={this.state.gioitinh}
                      >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                   </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label>Ngày sinh: </label>
                    <DatePicker
                  selected={this.state.ngaysinh}
                  value={this.state.ngaysinh}
                  onChange={(event)=>{
                    this.handleDateChange(event,'ngaysinh')
            
                  }}
                  dateFormat="dd/MM/yyyy"
                />
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
              this.handleAddXe();
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

export default ModalKhachhang;
