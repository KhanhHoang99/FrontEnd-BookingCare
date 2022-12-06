import React, { Component} from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailSpecialty.scss';
import { toast } from 'react-toastify';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import userService from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';




class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
           arrDoctorId: [],
           dataDetailSpecialty: {},
           listProvince: []
        }
    }

    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id) {
            const id = this.props.match.params.id;
            this.setState({
                idFromParent : id
            })

            const res = await userService.getAllDetailSpecialtyById({id: id, location: 'ALL'});
            const resProvince = await userService.getAllCodeService('PROVINCE');

            if(res && res.errCode === 0 && resProvince && resProvince.errCode === 0){

                let data = res.data;
                let arrDoctorId = [];

                if(data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;
                    if(arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: resProvince.data
                })
            }
            
        }
    }

    handleOnChangeSelect = (event) => {
        
    }
 
    render() {

        const {arrDoctorId, dataDetailSpecialty, listProvince} = this.state;
        const {language} = this.props
        return (
            <div className='detail-specialty-container container'>
                <HomeHeader />
                <div className='des-specialty'>
                    {
                        dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                        <div dangerouslySetInnerHTML={{__html: dataDetailSpecialty.descriptionHTML}}></div>
                    }

                </div>
                <div className='search-sp-doctor'>
                    <select onChange={(event) => this.handleOnChangeSelect(event)}>
                        {
                            listProvince && listProvince.length > 0 &&
                            listProvince.map(item => {
                                return (
                                    <option key={item} value={item.keyMap}>
                                        {language === LANGUAGES.VI ? item.valueVi: item.valueEn}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                {
                    arrDoctorId && arrDoctorId.length > 0 && 
                    arrDoctorId.map((item) => {
                        return (
                            
                            <div className='each-doctor' key={item} >
                                <div className='dt-content-left'>
                                    <ProfileDoctor 
                                        doctorId = {item}
                                        isShowDescriptionDoctor={true}
                                    />
                                </div>
                                <div className='dt-content-right'>
                                    <DoctorSchedule idFromParent = {item}/>
                                    <DoctorExtraInfor idFromParent = {item}/>
                                </div>
                             </div>

                        )

                    })
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);