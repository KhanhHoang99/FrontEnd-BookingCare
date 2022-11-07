import React, { Component } from 'react';
import userService from '../../services/userService';
import { connect } from 'react-redux';
import ModalUser from './ModalUser';
import './UserManage.scss';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
        }
    }

    async componentDidMount() {
       await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let response = await userService.getAllUsers('All');
        if(response && response.errCode === 0){
            this.setState({arrUsers: response.users})
        }
    }

    handleAddNewUser = () => {
        this.setState({isOpenModalUser: true})
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        });
    }

    createNewUser =  async(data) => {
        try {
            let res = await userService.createNewUser(data);
            if(res && res.errCode !== 0){
                alert(res.message)
            }else{
                this.getAllUsersFromReact();
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    
    render() {
        return (
            <div className='users-container container'>
                <ModalUser 
                    isOpen={this.state.isOpenModalUser}
                    togleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                <div className="text-center">Manage users khanhhhh</div>
                <div className='mx-1'>
                    <button 
                        type="button" 
                        className='btn btn-primary px-4'
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className="fas fa-plus px-2"></i>
                        Add New User
                    </button>
                </div>
                <table className="table table-hover mt-3">
                        <thead>
                            <tr>
                                <th scope="col">Emai</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Address</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                               this.state.arrUsers && this.state.arrUsers.length > 0 && 
                               this.state.arrUsers.map((user) => {
                                    return (
                                        <tr key={user.id}>
                                            <td>{user.email}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td style={{textTransform: "capitalize"}}>{user.address}</td>
                                            <td>
                                                <button type="button" className='btn btn-primary px-4 mx-1 mb-1'>
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button type="button" className='btn btn-danger px-4 mx-1 mb-1'>
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                </table>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
