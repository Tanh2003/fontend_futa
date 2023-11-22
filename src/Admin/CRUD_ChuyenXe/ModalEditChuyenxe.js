import React, { Component } from "react";
import "../Admin.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class ModalEditChuyenxe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "", // Thêm "id" vào trạng thái ban đầu
      tenchuyen: "",
      dodai: "",
      diemdi: "",
      diemden: " ", // Khởi tạo ngày mặc định
      gia: "",
    };
  }

  componentDidMount() {
    let user = this.props.currentUser;
    // cachs 2 //let {CurrentUser}=this.props;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        tenchuyen: user.tenchuyen,
        dodai: user.dodai,
        diemdi: user.diemdi,
        diemden: user.diemden,
        gia: user.gia,
      });
    }
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

  handleSaveUser = () => {
    this.props.editUser(this.state);
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
          Sửa thông tin chuyến xe
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
                      placeholder="Nhập điểm đến"
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
                      placeholder="Nhập giá vé"
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

export default ModalEditChuyenxe;
