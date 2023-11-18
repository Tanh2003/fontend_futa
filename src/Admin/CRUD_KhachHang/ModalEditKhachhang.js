import React, { Component } from "react";
import "../Admin.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";




class ModalEditKhachhang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "", // Thêm "id" vào trạng thái ban đầu
      sdt: "",
      hoten:"",
      diachi:"",
      ngaysinh:" ", // Khởi tạo ngày mặc định
      gioitinh:"",
      email:"",
      
     
    };
  }

  componentDidMount() {
    let user = this.props.currentUser;
    // cachs 2 //let {CurrentUser}=this.props;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        sdt: user.sdt,
        hoten:user.hoten,
        diachi:user.diachi,
        ngaysinh:user.ngaysinh,
        gioitinh:user.gioitinh,
        email:user.email,
      
       
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
  handleDateChange = (date) => {
    this.setState({ ngaysinh: date });
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
  Sửa Tên quyền
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
                      placeholder=" nhap so dien thoai...."
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
                      placeholder=" nhap so dien thoai...."
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
                      placeholder=" nhap so dien thoai...."
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
  selected={new Date(this.state.ngaysinh)}
  value={this.state.ngaysinh}
  onChange={(date) => {
    this.handleDateChange(date);
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

export default ModalEditKhachhang;
