import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "../../axios";




import _ from "lodash";

import "../Admin.css";

class ModalChuyenxe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrdiemdi:[],
      arrdiemden:[],
      tenchuyen: "",
      dodai:"",
      diemdi:"",
      diemden:" ", 
      gia:"",

   
    };
    this.listenToEmitter();
  }
  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      //reset state
      this.setState({
        tenchuyen: "",
        dodai:"",
        diemdi:"",
        diemden:" ", // Khởi tạo ngày mặc định
        gia:"",
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
      "tenchuyen","diemden","diemdi","dodai","gia"
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
                    <label>Tên chuyến</label>
                    <input
                      className="form-control"
                      placeholder="Nhập tên chuyến"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "tenchuyen");
                      }}
                      value={this.state.tenchuyen}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Độ dài</label>
                    <input
                      className="form-control"
                      placeholder="Nhập độ dài"
                      type="number"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "dodai");
                      }}
                      value={this.state.dodai}
                    />
                  </div>
                  
                  <div className="form-group col-md-6">
                    <label>Điểm đến</label>
                    <input
                      className="form-control"
                      placeholder="Họ và tên"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "diemden");
                      }}
                      value={this.state.diemden}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Điểm đi</label>
                    <input
                      className="form-control"
                      placeholder="Nhập điểm đi"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "diemdi");
                      }}
                      value={this.state.diemdi}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Giá</label>
                    <input
                      className="form-control"
                      placeholder="Nhập giá"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "gia");
                      }}
                      value={this.state.gia}
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

export default ModalChuyenxe;
