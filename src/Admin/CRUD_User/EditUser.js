import React, { Component } from 'react';
import "./AddUser.scss"

import {createNewUseService} from '../../userService';
import DatePicker from "react-datepicker";


import {toast} from "react-toastify";
import {emitter} from '../../utils/emitter';

import "react-datepicker/dist/react-datepicker.css";

import Lightbox from 'react-image-lightbox'; 
import 'react-image-lightbox/style.css'; // Nhập các kiểu dáng
import CommonUtils from '../../utils/CommonUtils';

import UserManage from '../ListAccount/UserManage';
import _ from 'lodash';



class AddUser extends Component {

    constructor(props){
        super(props);
        this.state={
          id:'',
          phoneNumber:'',
          password:'',
          fullName:'',
          address:'',
          gender:'M',
          job:'',
          roleId: 'R1',
          dateOfBirth: new Date(), // Add a dateOfBirth property to your state
          avatar:'',
          previewImgURL:"",
          isZoomOpen: false,

        }
        this.listenToEmitter();
    }

   async componentDidMount() {
    let user=this.props.currentUser;
    // cachs 2 //let {CurrentUser}=this.props;
    if(user&&!_.isEmpty(user)){
      this.setState({
        
          id:user.id,
          phoneNumber:user.phoneNumber,
          fullName:user.fullName,      
          address:user.address,
          gender:user.gender,
          job:user.job,
          dateOfBirth:user.dateOfBirth,
          avatar:user.avatar,
          roleId:user.roleId

      })
    }
   
    }

    listenToEmitter=()=>{
        emitter.on('EVENT_CLEAR_MODAL_DATA',()=>{
          //reset state
          this.setState({
            phoneNumber:'',
            password:'',
            fullName:'',
            address:'',
            gender:'M',
            job:'',
            roleId: 'R1',
            dateOfBirth: new Date(), // Add a dateOfBirth property to your state
            avatar:'',
          })
        });
  
      }


  
    handleOnChangeInput=(event,id)=>{
        let copyState={...this.state};
        copyState[id]=event.target.value;
        this.setState({
          ...copyState
        })
    }
    
      checkValideInputEdit=()=>{
        let isValid=true;

        const password = this.state.password;
        const phoneNumber = this.state.phoneNumber;
  
        let arrInput=['phoneNumber','password','fullName','address'];
       
        for(let i=0;i<arrInput.length;i++){
          console.log('check inside loop',this.state[arrInput[i]],arrInput[i]);
          if(!this.state[arrInput[i]])
          {
            isValid=false;
            alert('Vui lòng điền vào : '+arrInput[i]);
           
            
          }
          
          else if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
            isValid = false;
            alert("Mật khẩu yêu cầu ít nhất một chữ cái viết thường, ít nhất một chữ cái viết hoa,ít nhất một số,mật khẩu phải có ít nhất 8 ký tự");
            break;
      
            
          }
          if (!/^\d{10}$/.test(phoneNumber)) {
            isValid = false;
            alert("Số điện thoại phải là số  và phải có 10 số");
            break;
            
          }
          break;
         
      
        
        }
    
        
        return isValid;
      }
    

    
    handleSaveUser=()=>{
        let isValid= this.checkValideInputEdit();

        if(isValid==true){
       
          this.props.editUser(this.state);
          toast.success("Sửa thành công !")

        }


     
       

      }

   
    handleDateChange = (date) => {
   

        this.setState({ dateOfBirth: date });
      }
      

    
      handleOnChangeImage= async(event)=>{
        let data =event.target.files;
        let file=data[0];
        if(file){
            let base64= await CommonUtils.getBase64(file);
           
            let objectUrl=URL.createObjectURL(file);
            this.setState({
                previewImgURL:objectUrl,
                avatar:base64

            })
            
        }
        
       
    }

      handleImageClick = () => {
        this.setState({ isZoomOpen: true });
      };
      
    render() {
        const { isZoomOpen, previewImgURL } = this.state;
       
        return (
            <>
            
             <div className="container-fluid" id="main">
               <div className="row row-offcanvas row-offcanvas-left">
              
            <div className="col main pt-5 mt-3">

                <div className='title'>
                Quản lý Tài khoản


            </div >
         
            <div className="user-redux-body" >

               <div className='container center'>
                <div className='row-12'>
              
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                <label>Số Điện thoại</label>
                                <input  className="form-control" placeholder="0399121048"  
                                  onChange={(event)=>{
                                    this.handleOnChangeInput(event,'phoneNumber')
                            
                                  }}
                                  value={this.state.phoneNumber}                              
                                />
                                </div>
                                <div className="form-group col-md-6">
                                <label >Mật khẩu</label>
                                <input type="password" className="form-control" placeholder="********"
                                  onChange={(event)=>{
                                    this.handleOnChangeInput(event,'password')
                            
                                  }}
                                  value={this.state.password}
                                />
                                </div>
                            </div>
                         <div className="form-row">

                            <div className="form-group col-md-12">
                                <label>Họ và Tên</label>
                                <input type="text" className="form-control"  placeholder="Anh"
                                  onChange={(event)=>{
                                    this.handleOnChangeInput(event,'fullName')
                            
                                  }}
                                  value={this.state.fullName}
                                />

                            </div>

                            </div>
                            <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Địa chỉ</label>
                                <input type="text" className="form-control"  placeholder="1234 Main St"
                                onChange={(event)=>{
                                    this.handleOnChangeInput(event,'address')
                            
                                  }}
                                  value={this.state.address}
                              />
                            </div>
                            <div className="form-group col-md-6">
                                <label >Công việc</label>
                                <input type="text" className="form-control"  placeholder="0123456789"
                                  onChange={(event)=>{
                                    this.handleOnChangeInput(event,'job')
                            
                                  }}
                                  value={this.state.job}
                                />
                            </div>

                        </div>
                            <div className="form-row">
                            <div className="form-group col-md-3">
                                <label >Giới Tính</label>
                                <select  className="form-control"
                                onChange={(event)=>{
                                    this.handleOnChangeInput(event,'gender')
                            
                                  }}
                                  value={this.state.gender}
                                >
                                      <option value="0">Nam</option>
                                      <option value="1">Nữ</option>
                                      <option value="2">Khác</option>
                                </select>
                                <div className='row-12'>
                            <button  className="btn btn-warning mt-3 px-3"   onClick={()=>{this.handleSaveUser()}}>
Thêm mới
                                </button>

                            </div>
                                </div>
                           
                                <div className="form-group col-md-3">
                                        <label>Ngày sinh</label>
                                        <DatePicker
                          className="form-control date-picker"
                          selected={this.state.dateOfBirth}
                          dateFormat="dd-MM-yyyy" // Định dạng ngày tháng từ đầu
                          value={this.state.dateOfBirth}
                          onChange={(event)=>{
                            this.handleDateChange(event,'dateOfBirth')
                    
                          }}
                        />
                                    </div>

                               
                                <div className="form-group col-md-3">
                                <label >Quyền</label>
                                <select  className="form-control"
                                >

                                </select>
                                </div>
                                
                                
                                                            <div className="form-group col-md-3">
                                                                
                                                            <label >Hình ảnh</label>
                                                            <div className='lamdep'>
                                                            <input type='file' id='previewImg' hidden
                                                               onChange={(event)=>this.handleOnChangeImage(event)}
                                                            
                                                            
                                                            ></input>
                                                                
                                                            <label className='label-upload' htmlFor='previewImg'>tải ảnh <i className="fas fa-upload"></i></label>
                                                            <div className='preview-image'
                                                              onClick={this.handleImageClick}
                                                            style={{backgroundImage:`url(${this.state.previewImgURL})`}}
                                                           
                                                            >
                                                                 {isZoomOpen && (
                                                                <Lightbox
                                                                  mainSrc={previewImgURL}
                                                                  onCloseRequest={() => this.setState({ isZoomOpen: false })}
                                                                />
                                                              )}
                                                            
                                                            
                                                            
                                                            </div>
                                                            
                                                            </div>
                                                            
                                                            </div>
                               
                            </div>
                            <UserManage/>

        
                       
                

                </div>
            </div>
           
            

          
           
           
            
            </div>
            
            </div>
            </div>
          </div>  
            </>
            
        )
    }

}



export default (AddUser);
