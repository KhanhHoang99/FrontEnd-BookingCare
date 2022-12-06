import React, { Component} from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailSpecialty.scss';
import { toast } from 'react-toastify';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';




class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
           arrDoctorId: [26, 27, 29]
        }
    }

    componentDidMount() {
       
    }

 
    render() {

        const {arrDoctorId} = this.state;

        return (
            <div className='detail-specialty-container container'>
                <HomeHeader />
                <div className='des-specialty'>
                    DetailSpecialty
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);