import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {emitter} from "../../utils/emitter";

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
           email: '',
           password: '',
           firstName: '',
           lastName: '',
           address: '',

        }

        this.listenToEmitter()
    }

    listenToEmitter() {
        emitter.on('EVEN_CLEAR_MODAL_DATA', ()=> {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            })
        });
    }

    componentDidMount() {
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

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if(isValid){
            this.props.createNewUser(this.state);
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
                <ModalHeader toggle={this.toggle}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className='input-container'>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email"
                            onChange={(e) => {this.handleOnchangeInput(e, 'email')}} 
                            value={this.state.email}
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
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password"
                            onChange={(e) => {this.handleOnchangeInput(e, 'password')}}
                            value={this.state.password} 
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
                    <Button color="primary" className='px-3' onClick={this.handleAddNewUser}>Add new</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);





