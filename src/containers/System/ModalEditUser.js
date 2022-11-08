import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
           email: '',
           password: '',
           firstName: '',
           lastName: '',
           address: '',

        }
    }


    componentDidMount() {

    }

    componentDidUpdate(prevProp, prevState) {
        const {userEdit} = this.props;
        if(userEdit && !_.isEmpty(userEdit)){

            // console.log('prevProp: ', prevProp);
            // console.log('prevState: ', prevState);
            if( prevState.email !== userEdit.email){
                this.setState({
                    email: userEdit.email,
                    id: userEdit.id,
                    password: 12345678,
                    firstName: userEdit.firstName,
                    lastName: userEdit.lastName,
                    address: userEdit.address,
                })
            }

        }
    }

    toggle = () => {
        this.props.togleFromParent();
    }

    handleOnchangeInput = (event, id) => {
        const copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }


    checkValidateInput = () => {
        let isValid = true;

        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];

        for(let i = 0; i < arrInput.length; i++) {
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing parameter: ' + arrInput[i])
                break;
            }
        }

        return isValid;
    }

    handleUpdateUser = () => {
        let isValid = this.checkValidateInput();
        if(isValid){
            this.props.doEditUser(this.state);
        }

        this.toggle();
    }


    render() {

        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={this.toggle} 
                className={'modal-user-container'}
            >
                <ModalHeader toggle={this.toggle}>Edit User</ModalHeader>
                <ModalBody>
                    <div className='input-container'>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email"
                            onChange={(e) => {this.handleOnchangeInput(e, 'email')}} 
                            value={this.state.email}
                            disabled
                        />
                    </div>
                    <div className='input-container'>
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password"
                            onChange={(e) => {this.handleOnchangeInput(e, 'password')}}
                            value={this.state.password} 
                            disabled
                        />
                    </div>
                    <div className='input-container'>
                        <label htmlFor="firstName">First name</label>
                        <input 
                            type="text" 
                            id="firstName" 
                            name="firstName"
                            onChange={(e) => {this.handleOnchangeInput(e, 'firstName')}} 
                            value={this.state.firstName}
                        />
                    </div>
                    <div className='input-container'>
                        <label htmlFor="lastName">Last name</label>
                        <input 
                            type="text" 
                            id="lastName" 
                            name="lastName"
                            onChange={(e) => {this.handleOnchangeInput(e, 'lastName')}} 
                            value={this.state.lastName}
                        />
                    </div>
                    <div className='input-container'>
                        <label htmlFor="address">Address</label>
                        <input 
                            type="text" 
                            id="address" 
                            name="address" 
                            onChange={(e) => {this.handleOnchangeInput(e, 'address')}}
                            value={this.state.address}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={this.handleUpdateUser}>Update</Button>{' '}
                    <Button color="secondary" className='px-3' onClick={this.toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);





