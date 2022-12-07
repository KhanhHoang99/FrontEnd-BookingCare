import React, { Component} from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailClinic.scss';
import { toast } from 'react-toastify';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import userService from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';




class DetailClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
           arrDoctorId: [],
           dataDetailClinic: {},
        }
    }

    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id) {
            const id = this.props.match.params.id;

            const res = await userService.getAllDetailClinicById(id);
            
            // console.log(res)

            if(res && res.errCode === 0){

                let data = res.data;
                let arrDoctorId = [];

                if(data && !_.isEmpty(res.data)) {
                    let arr = data.doctorClinic;
                    if(arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                

                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                   
                })
            }
            
        }
    }

    
    

    buildDataInputSelect = (inputData) => {
        let result = [];
        let {language} = this.props
        inputData.map((item, index) => {
            let Object = {};
            let labelVi = `${item.valueVi}`;
            let labelEn =  `${item.valueEn}`;
            Object.label = language === LANGUAGES.VI ? labelVi : labelEn;
            Object.value = item.keyMap;
            result.push(Object)
        })

        return result;

    }
 
    render() {

        const {arrDoctorId, dataDetailClinic} = this.state;
        const {language} = this.props;


        return (
            <div className='detail-specialty-container container'>
                <HomeHeader />
                <div className='des-specialty'>
                    {
                        dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                        <>
                            <div>{dataDetailClinic.name}</div>
                            <div dangerouslySetInnerHTML={{__html: dataDetailClinic.descriptionHTML}}></div>
                        </>
                    }

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
                                        isShowLinkDetail={true}
                                        isShowPrice={false}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);