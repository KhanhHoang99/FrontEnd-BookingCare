import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import userService from '../../../services/userService';
import {LANGUAGES} from "../../../utils";
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: []

        }
    }

    async componentDidMount() {
        try {
            const res = await userService.getAllCodeService('gender');
            if(res && res.data){
                this.setState({genderArr: res.data});
            }

        } catch (error) {
            console.log(error)
        }
    }


    render() {

        const gender = this.state.genderArr;
        const language = this.props.language;
        // console.log(gender)
        return (
            <div className='user-redux-container'>
                <div className="title text-center">Manage User with Redux</div>
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
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <div className="form-group col-3">
                                    <label className='my-1' htmlFor="inputState"><FormattedMessage id="manage-user.role" /></label>
                                    <select className="form-select" aria-label="Default select example">
                                        <option defaultValue>{language === LANGUAGES.VI ? "Chọn vai trò" : "Choose role" }</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <div className="form-group col-3">
                                    <label className='my-1' htmlFor="inputState"><FormattedMessage id="manage-user.image" /></label>
                                    <select className="form-select" aria-label="Default select example">
                                        <option defaultValue>{language === LANGUAGES.VI ? "Chọn hình ảnh" : "Choose image" }</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
