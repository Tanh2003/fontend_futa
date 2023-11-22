import React, { Component } from "react";
import "../Admin.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import {getAllChuyenxe} from "../../userService";




class ModalEditTTChuyenxe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "", // Thêm "id" vào trạng thái ban đầu
      arrchuyenxe: [],
      machuyen: "",
      ngay:new Date(),
      soluongve:"",
      thoigian:new Date(),
     
      
     
    };
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  async componentDidMount() {
    await this.getAllchuyenxeReact();
    let user = this.props.currentUser;
    // cachs 2 //let {CurrentUser}=this.props;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
       machuyen:user.machuyen,
       ngay:user.ngay,
       soluongve:user.soluongve,
       thoigian:user.thoigian
      
       
      });
    }
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

  

  handleSaveUser = () => {
   

  
      this.props.editUser(this.state);
   
  };
  handleTimeChange(time) {
    this.setState({ thoigian: time });
  }
  handleDateChange = (date) => {
   

    this.setState({ ngay: date });
  }
  
  render() {
    let arrchuyenxe=this.state.arrchuyenxe;
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
  Sửa Thông Tin chuyến xe
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
                    <select className="form-control"
                     onChange={(event) => {
                      this.handleOnChangeInput(event, "machuyen");
                    }}
                    value={this.state.machuyen}>
                         <option  value=''>Chọn tên chuyến xe </option>
                     {
                      arrchuyenxe&&arrchuyenxe.length>0
                      &&arrchuyenxe.map((item,index)=>{
                        return(
                          
                          <option  value={item.id}>{item.tenchuyen}</option>
                        )
                      })
                     }
                     
                    </select>
                  </div>
                <div className="form-group col-md-6">
                    <label>Tên chuyến:</label>
                    <DatePicker
                  selected={this.state.ngay}
                  value={this.state.ngay}
                  onChange={(event)=>{
                    this.handleDateChange(event,'ngay')
            
                  }}
                  dateFormat="dd/MM/yyyy"
                />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Ngày:</label>
                    <DatePicker
                  selected={this.state.ngay}
                  value={this.state.ngay}
                  onChange={(event)=>{
                    this.handleDateChange(event,'ngay')
            
                  }}
                  dateFormat="dd/MM/yyyy"
                />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Số lượng vé</label>
                    <input
                      className="form-control"
                      placeholder="Nhập số lượng vé"
                      type="number"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "soluongve");
                      }}
                      value={this.state.soluongve}
                    />
                  </div>
                  
                 
                  <div className="form-group col-md-6">
                    <label>Thời gian:</label>
                    <TimePicker
                      onChange={this.handleTimeChange}
                      value={this.state.thoigian}
                      format="HH:mm"
                      clearIcon={null}
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

export default ModalEditTTChuyenxe;
