import React, { Component } from 'react';
import './UserManage.scss';
import { getAllUser, editUserService, deleteUserService } from '../../userService';
import { toast } from "react-toastify";


class UserManage extends Component {
    navigateToDestination = (path) => {
        // Thực hiện điều hướng tới path
    }

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            userEdit: {}
        };
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }

    getAllUserFromReact = async () => {
        let response = await getAllUser('ALL');
        if (response && response.errcode === 0) {
            this.setState({
                arrUsers: response.users
            });
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUserService(user.id);
            if (res && res.errcode !== 0) {
                alert(res.errMessage);
                toast.error("Xóa thất bại");
            } else {
                await this.getAllUserFromReact();
                toast.success("Xóa Thành công");
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleEditUser = (user) => {
        this.setState({
            userEdit: user
        });

        // Sử dụng this.props.history để điều hướng
        this.props.onNavigate('/sua');
    }

    doEditUser = async (user) => {
        try {
            let res = await editUserService(user);
            if (res && res.errcode === 0) {
                await this.getAllUserFromReact();
            } else {
                toast.error("Sửa Thất bại");
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        let arrUsers = this.state.arrUsers;

        return (
            
            <div className="users-container">
                <div className='title text-center'>
                    Danh sách tài khoản
                </div>
                
                <div className='users-table mt-4 mx-3'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Số điện thoại</th>
                                <th>Họ và Tên</th>
                                <th>Địa chỉ</th>
                                <th>Giới tính</th>
                                <th>Ngày sinh</th>
                                <th>Quyền</th>
                                <th>Hành động</th>
                            </tr>
                            {
                                arrUsers && arrUsers.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.phoneNumber}</td>
                                            <td>{item.fullName}</td>
                                            <td>{item.address}</td>
                                            <td>{item.gender}</td>
                                            <td>{item.dateOfBirth}</td>
                                            <td>{item.roleId}</td>
                                            <td>
                                                <button className='btn-edit'
                                                    onClick={() => {
                                                        this.handleEditUser(item);
                                                    }}
                                                ><i className="fas fa-pencil-alt"></i></button>
                                                <button className='btn-delete'
                                                    onClick={() => {
                                                        this.handleDeleteUser(item);
                                                    }}
                                                ><i className="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default UserManage;
