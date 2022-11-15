import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import userService from '../../../services/userService';
import {LANGUAGES} from "../../../utils";
import * as actions from "../../../store/actions";
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpenLightBox: false,

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
            this.setState({
                genderArr: this.props.genderRedux
            })
        }
        if (this.props.positions !== prevProps.positions) {
            this.setState({
                positionArr: this.props.positions
            })
        }
        if (this.props.roles !== prevProps.roles) {
            this.setState({
                roleArr: this.props.roles
            })
        }
      }

      handleOnChangeImage = (e) => {
        // console.log('event: ', e.target.files[0])
        const data = e.target.files;
        const file = data[0];
        const ObjectUrl = URL.createObjectURL(file);
        this.setState({previewImgURL: ObjectUrl});
        // console.log(ObjectUrl)
      }


    render() {

        const gender = this.state.genderArr;
        const positionArr = this.state.positionArr;
        const roleArr = this.state.roleArr;
        const language = this.props.language;
        const isLoadingGender = this.props.isLoadingGender;
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
                                    <input type="email" className="form-control" id="inputEmail4" placeholder="Email" />
                                </div>
                                <div className="form-group col-3">
                                    <label className='my-1' htmlFor="inputPassword4"><FormattedMessage id="manage-user.password" /></label>
                                    <input 
                                        type="password" className="form-control" 
                                        id="inputPassword4" 
                                        placeholder='password' 
                                    />
                                </div>
                                <div className="form-group col-3">
                                    <label className='my-1' htmlFor="inputAddress"><FormattedMessage id="manage-user.first-name" /></label>
                                    <input type="text" className="form-control" id="inputAddress" placeholder="First name" />
                                </div>
                                <div className="form-group col-3">
                                    <label className='my-1' htmlFor="inputAddress"><FormattedMessage id="manage-user.last-name" /></label>
                                    <input type="text" className="form-control" id="inputAddress" placeholder="Last name" />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="form-group col-3">
                                    <label className='my-1' htmlFor="inputAddress"><FormattedMessage id="manage-user.phone-number" /></label>
                                    <input type="text" className="form-control" id="inputAddress" placeholder="Phone number" />
                                </div>
                                <div className="form-group col-9">
                                    <label className='my-1' htmlFor="inputAddress2"><FormattedMessage id="manage-user.address" /></label>
                                    <input type="text" className="form-control" id="inputAddress2" placeholder="Address" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-3">
                                    <label className='my-1' htmlFor="inputState"><FormattedMessage id="manage-user.gender" /></label>
                                    <select className="form-select" aria-label="Default select example">
                                        <option defaultValue>{language === LANGUAGES.VI ? "Chọn giới tính" : "Choose gender" }</option>
                                        {
                                            gender && gender.length > 0 
                                            && gender.map((item) => {
                                                return (
                                                    <option 
                                                        key={item.id}
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
                                    <select className="form-select" aria-label="Default select example">
                                        <option defaultValue>{language === LANGUAGES.VI ? "Chọn vị trí" : "Choose position" }</option>
                                        {
                                            positionArr && positionArr.length > 0 
                                            && positionArr.map((item) => {
                                                return (
                                                    <option 
                                                        key={item.id}
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
                                    <select className="form-select" aria-label="Default select example">
                                        <option defaultValue>{language === LANGUAGES.VI ? "Chọn vai trò" : "Choose role" }</option>
                                        {
                                            roleArr && roleArr.length > 0 
                                            && roleArr.map((item) => {
                                                return (
                                                    <option 
                                                        key={item.id}
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
                                <button type="submit" className="btn btn-primary my-3"><FormattedMessage id="manage-user.save" /></button>
                            </div>
                        </form>
                    </div>
                </div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
