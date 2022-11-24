import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import './ManageSchedule.scss'
import { LANGUAGES } from '../../../utils/constant';
import userService from '../../../services/userService';
import DatePicker from '../../../components/Input/DatePicker'
import moment from 'moment';


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
            this.setState({
                rangeTime: this.props.allScheduleTime
            })
        }
        
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });

        let res =  await userService.getDetailInfoDoctor(selectedDoctor.value);
        if(res && res.errCode === 0 && res.data && res.data.Markdown){
            let Markdown = res.data.Markdown;
            this.setState({
                contentMarkdown: Markdown.contentMarkdown,
                contentHTML: Markdown.contentHTML,
                description: Markdown.description,
                hasOldData: true
            })
        }else{
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                hasOldData: false
            })
        }
        // console.log(res)
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
                                            className='btn' 
                                            key={item.id}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <button className='btn btn-save-schedule'><FormattedMessage id="manage-schedule.save"/></button>
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
