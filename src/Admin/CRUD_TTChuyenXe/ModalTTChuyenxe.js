import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import TimePicker from 'react-time-picker';
import { format } from "date-fns";


import { getAllChuyenxe } from "../../userService";

import _ from "lodash";

import "../Admin.css";

class ModalTTChuyenxe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrchuyenxe: [],
      machuyen: "",
      ngay: new Date(),
      soluongve: "",
      thoigian: new Date(),
      arrTTchuyenxe:[],
    };
    this.listenToEmitter();
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }
 


  generateData = () => {
    const { machuyen, soluongve, thoigian } = this.state;
    const startDate = new Date(this.state.ngay); // Lấy ngày từ state
    const arrTTchuyenxe = [];

    for (let i = 0; i < 15; i++) {
      const newDate = new Date(startDate);
      newDate.setDate(startDate.getDate() + i); // Tăng ngày lên i

      const newData = {
        machuyen,
        ngay: newDate,
        soluongve,
        thoigian,
      };

      arrTTchuyenxe.push(newData);
    }

    return arrTTchuyenxe;
  };












  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      //reset state
      this.setState({
        machuyen: "",
        ngay: new Date(),
        soluongve: "",
        thoigian: new Date(),
      });
    });
  };

  async componentDidMount() {
    await this.getAllchuyenxeReact();
  }

  getAllchuyenxeReact = async () => {
    let response = await getAllChuyenxe("ALL");
    if (response && response.errcode == 0) {
      this.setState({
        arrchuyenxe: response.chuyenxe,
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
    let arrInput = [];

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

    if (isValid) {
      const arrTTchuyenxe = this.generateData();
      
      // Thêm dữ liệu vào mảng arrTTchuyenxe
      this.setState(
        {
          arrTTchuyenxe,
        },
        () => {
          // call api create modal
          this.props.createNewXe(arrTTchuyenxe);
          toast.success("Tạo Thành công");
        }
      );
    }
  };
  handleTimeChange(time) {
    this.setState({ thoigian: time });
  }
  handleDateChange = (date) => {
    let ne=new Date(date.setHours(0, 0, 0, 0))
    this.setState({ ngay: ne });
  };

  render() {
    let arrchuyenxe = this.state.arrchuyenxe;
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
          Thêm Thông tin chuyến xe
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
                    <label>Tên chuyến xe</label>
                    <select
                      className="form-control"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "machuyen");
                      }}
                      value={this.state.machuyen}
                    >
                      <option value="">Chọn tên chuyến xe </option>
                      {arrchuyenxe &&
                        arrchuyenxe.length > 0 &&
                        arrchuyenxe.map((item, index) => {
                          return (
                            <option value={item.id}>{item.tenchuyen}</option>
                          );
                        })}
                    </select>
                  </div>
                
                  <div className="form-group col-md-6">
                    <label>Ngày:</label>
                    <div>
                    <DatePicker
                    
                    selected={this.state.ngay}
                    value={this.state.ngay}
                    onChange={(event) => {
                      this.handleDateChange(event, "ngay");
                    }}
                    dateFormat="dd/MM/yyyy"
                  />
                    </div>
                    
                  </div>
                  <div className="form-group col-md-6">
                    <label>Số lượng vé</label>
                    <input
                      className="form-control"
                      placeholder=" nhap so dien thoai...."
                      type="number"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "soluongve");
                      }}
                      value={this.state.soluongve}
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <label>Thời gian:</label>
                    <div >
                    <TimePicker
                    
                      onChange={this.handleTimeChange}
                      value={this.state.thoigian}
                      format="HH:mm"
                    />
                    </div>
                   
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

export default ModalTTChuyenxe;
