import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import './ManageSchedule.scss'
import { dateFormat, LANGUAGES } from '../../../utils/constant';
import userService from '../../../services/userService';
import DatePicker from '../../../components/Input/DatePicker'
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from "lodash"


class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            selectedDoctor: null,
            listDoctors: [],
            currentDate: '',
            rangeTime: []
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();
    }
    
    componentDidUpdate(prev) {
        if(prev.allDoctors !== this.props.allDoctors){
            this.setState({
                listDoctors: this.props.allDoctors
            })
        }

        if(prev.allScheduleTime !== this.props.allScheduleTime){

            let data = this.props.allScheduleTime;
            if(data && data.length > 0) {
                data = data.map(item => {
                    item.isSelected = false;
                    return item
                })
            }


            this.setState({
                rangeTime: data
            })
        }
        
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
      };

    buildDataInputSelect = (inputData) => {
        let result = [];

        let {language} = this.props

        if(inputData && inputData.length > 0) {
             inputData.map((item, index) => {

                let Object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                Object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                Object.value = item.id;
                result.push(Object)
            })
        }


        return result;
    }

    handleOnchaneDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
        // console.log('date: ', date)
    }

    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;

        const index = rangeTime.findIndex(object => {
            return object.id === time.id;
        });

        if (index !== -1) {
            rangeTime[index].isSelected = !rangeTime[index].isSelected;
        }

        this.setState({
            rangeTime: rangeTime
        })
    }

    handleSaveSchedule = () => {
        let { rangeTime, selectedDoctor, currentDate} = this.state;
        let result = [];

        if(!currentDate) {
            toast.error('Invalid Date!');
            return;
        }
        if(!selectedDoctor || _.isEmpty(selectedDoctor)) {
            toast.error('Invalid Selected doctor!');
            return;
        }

        let formateDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);

        if(rangeTime && rangeTime.length > 0) {

            let selectedTime = rangeTime.filter(item => item.isSelected === true);

            if(selectedTime && selectedTime.length > 0) {

                result = selectedTime.map(time => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formateDate;
                    object.time = time.keyMap;
                    return object;
                })
            }else {
                toast.error('Invalid Selected time!');
                return;
            }

            console.log('result: ', result)

        }


    }

    render() {
        const {  isLoggedIn, language } = this.props;
        const { selectedDoctor, listDoctors, rangeTime } = this.state;
        const options = this.buildDataInputSelect(listDoctors);
        
         
        return (
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id="manage-schedule.title"/>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.choose-doctor"/></label>
                            <Select
                                value={selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={options}
                                placeholder='Select the doctor here'
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.choose-date"/></label>
                            <DatePicker
                                onChange={this.handleOnchaneDatePicker}
                                className='form-control'
                                defaulValue={this.state.currentDate}
                                minDate={new Date()}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {
                                rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item) => {
                                    return (
                                        <button 
                                            className={`btn ${item.isSelected ? `active` : ''}`} 
                                            key={item.id}
                                            onClick={() => this.handleClickBtnTime(item)}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <button 
                            className='btn btn-save-schedule'
                            onClick={() => this.handleSaveSchedule()}
                        >
                            <FormattedMessage id="manage-schedule.save"/>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath.Component,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors : () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: (type) => dispatch(actions.fetchAllScheduleTime(type))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
