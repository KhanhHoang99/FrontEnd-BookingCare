import React, { Component } from 'react';
import { connect } from 'react-redux';
import userService from '../../../services/userService';
import './DoctorSchedule.scss';
import { LANGUAGES } from '../../../utils/constant';
import Select from 'react-select';
import localization from 'moment/locale/vi';
import moment, { locale } from 'moment';
import { FormattedMessage } from "react-intl";
import BookingModal from './Modal/BookingModal'




class DoctorSchedule extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            allDays : [],
            allAvalableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {}
        }
    }
    

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    getAllDays = (language) => {

        let arrDate = [];

        for(let i = 0; i < 7; i++) {

            let object = {}

            if(language === LANGUAGES.VI) {
                if(i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`
                    object.label = this.capitalizeFirstLetter(today);
                }else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi);
                }
            }else{
                if(i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`
                    object.label = today;

                }else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
                }

            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            arrDate.push(object);
        }

        return arrDate;
    }
    
    async componentDidMount() {

        // console.log('Moment vi: ', moment(new Date()).format('dddd - DD/MM'));
        // console.log('Moment en: ', moment(new Date()).locale('en').format('dddd - DD/MM'));

       let allDays =  this.getAllDays(this.props.language);

       if(allDays && allDays.length > 0) {

       }

       this.setState({
            allDays : allDays
       })
               
    }

    async componentDidUpdate(prevProps) {
        if(this.props.language !== prevProps.language) {
            let allDays =  this.getAllDays(this.props.language);

            this.setState({
                allDays : allDays
            })     
        }

        if(this.props.idFromParent !== prevProps.idFromParent) {

            let allDays =  this.getAllDays(this.props.language);
            const doctorId = this.props.idFromParent;
            const res = await userService.getScheduleDoctorByDate(doctorId, allDays[0].value);
        
                if(res && res.errCode === 0 ) {
                    let data = res.data;
                    this.setState({
                        allAvalableTime: data || [],
                        selectedOption: allDays[0]
                    })
                }
        }
    }

    handleChange = async (selectedOption) => {
       
        this.setState({ selectedOption });

        const doctorId = this.props.idFromParent;
        
        const date = selectedOption.value;

        const res = await userService.getScheduleDoctorByDate(doctorId, date);

        if(res && res.errCode === 0 ) {
            let data = res.data;
            this.setState({
                allAvalableTime: data
            })
        }
      };
    
    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })

    }

    closeBookingModal = () => {
        this.setState({isOpenModalBooking: false})
    }

    render() {

       const {allDays, allAvalableTime} = this.state;
       const {language} = this.props;

        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-shcedule'>
                        <div style={{width: '200px'}}>
                            <Select 
                                options={allDays}
                                onChange={this.handleChange}
                                placeholder={allDays[0] ? allDays[0].label : ''}
                                className="select-schedule" 
                            />
                        </div>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <i className="fa fa-calendar" aria-hidden="true"></i><span><FormattedMessage id="patient.detail-doctor.schedule"/></span>
                        </div>
                        <div className='time-content'>
                            {
                                allAvalableTime && allAvalableTime.length > 0 ?
                                allAvalableTime.map(item => {

                                    let timeEn = item.timeTypeData.valueEn;
                                    let timeVi = item.timeTypeData.valueVi;
                                    return (
                                        <button 
                                            key={item.id}
                                            onClick={() => this.handleClickScheduleTime(item)}
                                        >
                                            {language === LANGUAGES.EN ? timeEn : timeVi}
                                        </button>
                                    )
                                })

                                :

                                <p><FormattedMessage id="patient.detail-doctor.no-schedule"/></p>
                            }
                        </div>
                    </div>
                </div>
                <BookingModal 
                    isOpenModalBooking={this.state.isOpenModalBooking}
                    closeBookingModal = {this.closeBookingModal}
                    dataScheduleTimeModal={this.state.dataScheduleTimeModal}

                />
            </>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
