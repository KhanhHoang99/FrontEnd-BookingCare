import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from "../../../utils";
import * as actions from "../../../store/actions";
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            isOpenLightBox: false,
            previewImgURL: '',

            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            address: "",
            gender: "",
            position: "",
            role: "",
            avatar: "",

            action: '',
            userEditId: '',

        }
    }

    async componentDidMount() {
        // try {
        //     const res = await userService.getAllCodeService('gender');
        //     if(res && res.data){
        //         this.setState({genderArr: res.data});
        //     }

        // } catch (error) {
        //     console.log(error)
        // }

        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();

    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.genderRedux !== prevProps.genderRedux) {
            let arrGender = this.props.genderRedux;
            this.setState({
                genderArr: arrGender,
                gender: arrGender && arrGender.length > 0 ? arrGender[0].key : ''
            })
        }
        if (this.props.positions !== prevProps.positions) {
            let arrPosition = this.props.positions;
            this.setState({
                positionArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].key : ''
            })
        }
        if (this.props.roles !== prevProps.roles) {
            let arrRole = this.props.roles;
            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].key : ''
            })
        }

        if (this.props.users !== prevProps.users) {

            let arrGender = this.props.genderRedux;
            let arrPosition = this.props.positions;
            let arrRole = this.props.roles;
            this.setState({
                
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                phoneNumber: "",
                address: "",
                gender: arrGender && arrGender.length > 0 ? arrGender[0].key : '',
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].key : '',
                role: arrRole && arrRole.length > 0 ? arrRole[0].key : '',
                avatar: "",
                
                action: '',
                
            })
        }

      }

      handleOnChangeImage = async (e) => {
        // console.log('event: ', e.target.files[0])
        const data = e.target.files;
        const file = data[0];
        if(file) {
            let base64 = await CommonUtils.getBase64(file);
            // console.log(base64);

            const ObjectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: ObjectUrl,
                avatar: base64
            });

        }
      }

      onChangeInput = (event, type) => {

        let copyState = {...this.state};
        copyState[type] = event.target.value;
        this.setState({...copyState});     
        
      }

      checkValidateInput = () => {
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];
        let isValid = true;
        for(let i = 0; i < arrCheck.length; i++) {

            if(!this.state[arrCheck[i]]) {
                isValid = false;
               
                alert("missing " + arrCheck[i])
                break;
            }
        }

        return isValid;

      }

      handleSaveUser = () => {
        let isValid = this.checkValidateInput();

        
        if(!isValid) return;
        

        const {action} = this.state;

        if(action === CRUD_ACTIONS.EDIT) {
            this.props.editUser({
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                id: this.state.userEditId,
                avatar: this.state.avatar

            })

        }else{
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                role: this.state.role,
                position: this.state.position,
                avatar: this.state.avatar

            })
        }

        this.setState({
            previewImgURL: '',
            avatar: ''
        })

        
      }

      handleEditUserFromParent = (user) => {

        let imageBase64 = "";
        if(user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }

        this.setState({
                
            email: user.email,
            password: "hardcode",
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id,
            previewImgURL: imageBase64,
            avatar: imageBase64,

    
            
        })
      }


    render() {
        const genderArr = this.state.genderArr;
        const positionArr = this.state.positionArr;
        const roleArr = this.state.roleArr;
        const language = this.props.language;
        const isLoadingGender = this.props.isLoadingGender;

        const {email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar} = this.state;
        // console.log(gender)
        
        return (
            <div className='user-redux-container'>
                <div className="title text-center">Manage User with Redux</div>
                <div className="text-center">{isLoadingGender ? 'Loading' : ''}</div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <form>
                            <div className="row">
                                <div><FormattedMessage id="manage-user.add" /> </div>
                                <div className="form-group col-3">
                                    <label className='my-1' htmlFor="inputEmail4">Email</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        id="inputEmail4" 
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => this.onChangeInput(e, 'email')}
                                        disabled={this.state.action === CRUD_ACTIONS.EDIT}
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <label className='my-1' htmlFor="inputPassword4"><FormattedMessage id="manage-user.password" /></label>
                                    <input 
                                        type="password" className="form-control" 
                                        id="inputPassword4" 
                                        placeholder='password'
                                        value={password}
                                        onChange={(e) => this.onChangeInput(e, 'password')}
                                        disabled={this.state.action === CRUD_ACTIONS.EDIT}
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <label className='my-1' htmlFor="inputAddress"><FormattedMessage id="manage-user.first-name" /></label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="inputAddress" 
                                        placeholder="First name" 
                                        value={firstName}
                                        onChange={(e) => this.onChangeInput(e, 'firstName')}
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <label className='my-1' htmlFor="inputAddress"><FormattedMessage id="manage-user.last-name" /></label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="inputAddress" 
                                        placeholder="Last name"
                                        value={lastName}
                                        onChange={(e) => this.onChangeInput(e, 'lastName')} 
                                     />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="form-group col-3">
                                    <label className='my-1' htmlFor="inputAddress"><FormattedMessage id="manage-user.phone-number" /></label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="inputAddress" 
                                        placeholder="Phone number"
                                        value={phoneNumber}
                                        onChange={(e) => this.onChangeInput(e, 'phoneNumber')} 
                                    />
                                </div>
                                <div className="form-group col-9">
                                    <label className='my-1' htmlFor="inputAddress2"><FormattedMessage id="manage-user.address" /></label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="inputAddress2" 
                                        placeholder="Address" 
                                        value={address}
                                        onChange={(e) => this.onChangeInput(e, 'address')} 
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-3">
                                    <label className='my-1' htmlFor="inputState"><FormattedMessage id="manage-user.gender" /></label>
                                    <select 
                                        className="form-select" 
                                        aria-label="Default select example"
                                        onChange={(e) => this.onChangeInput(e, 'gender')}
                                        value={gender} 
                                    >
                                        {
                                            genderArr && genderArr.length > 0 
                                            && genderArr.map((item) => {
                                                return (
                                                    <option 
                                                        key={item.id}
                                                        value={item.key}
                                                    >
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            }) 
                                        }
                                    </select>
                                </div>
                                <div className="form-group col-3">
                                    <label className='my-1' htmlFor="inputState"><FormattedMessage id="manage-user.position" /></label>
                                    <select 
                                        className="form-select" 
                                        aria-label="Default select example"
                                        onChange={(e) => this.onChangeInput(e, 'position')} 
                                        value={position} 
                                    >
                                        {
                                            positionArr && positionArr.length > 0 
                                            && positionArr.map((item) => {
                                                return (
                                                    <option 
                                                        key={item.id}
                                                        value={item.key}
                                                    >
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            }) 
                                        }
                                    </select>
                                </div>
                                <div className="form-group col-3">
                                    <label className='my-1' htmlFor="inputState"><FormattedMessage id="manage-user.role" /></label>
                                    <select 
                                        className="form-select" 
                                        aria-label="Default select example"
                                        onChange={(e) => this.onChangeInput(e, 'role')}
                                        value={role} 
                                    >
                                        {
                                            roleArr && roleArr.length > 0 
                                            && roleArr.map((item) => {
                                                return (
                                                    <option 
                                                        key={item.id}
                                                        value={item.key}
                                                    >
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            }) 
                                        }
                                    </select>
                                </div>
                                <div className="form-group col-3">
                                    <label className='my-1' htmlFor="inputState"><FormattedMessage id="manage-user.image" /></label>
                                    <div className='preview-image-container'>
                                        <input type='file' id="image" onChange={(e) => this.handleOnChangeImage(e)} hidden/>
                                        <label className='label-upload' htmlFor='image'>
                                            Upload Image <i className='fas fa-upload'></i>
                                        </label>
                                        <div className='preview-image' onClick={() => this.setState({ isOpenLightBox: true })}>
                                            {
                                                this.state.previewImgURL && 
                                                <img src={this.state.previewImgURL} alt='' title='xem anh'/>
                                            }
                                            {this.state.isOpenLightBox && this.state.previewImgURL &&
                                                <Lightbox
                                                    mainSrc={this.state.previewImgURL}
                                                    onCloseRequest={() => this.setState({  isOpenLightBox: false })}
                                                />
                                            }
                                        </div>
                                    </div>
                                </div>
                               
                            </div>
                            <div className='text-center'>
                                <button 
                                    type="button" 
                                    className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning my-3" : "btn btn-primary my-3"}
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {
                                        this.state.action === CRUD_ACTIONS.EDIT ? 
                                        <FormattedMessage id="manage-user.edit" /> : 
                                        <FormattedMessage id="manage-user.save" />
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <TableManageUser
                    handleEditUserFromParent = {this.handleEditUserFromParent}
                    action={this.state.action}
                />
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        positions: state.admin.positions,
        roles: state.admin.roles,
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchAllUserRedux : () => dispatch(actions.fetchAllUserStart()),
        editUser: (user) => dispatch(actions.editUser(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
