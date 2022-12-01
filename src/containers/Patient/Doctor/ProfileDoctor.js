import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";
import './ProfileDoctor.scss';
import userService from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';



class ProfileDoctor extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
           dataProfile: {}
        }
    }
        
    async componentDidMount() {

        const data = await this.getInforDoctor(this.props.doctorId)
        this.setState({dataProfile: data})
                  
    }

    getInforDoctor = async (id) => {

        let result = {}
        if(id) {
            result = await userService.getProfileDoctorById(id);

            if(result && result.errCode === 0) {
                return result.data;
            }
        }

        return result;

    }

    async componentDidUpdate(prevProps) {
        if(this.props.language !== prevProps.language) {
           
        }

       
    }

    renderTimeBooking = (dataTime) => {

        const {language} = this.props;

        if(dataTime && !_.isEmpty(dataTime)) {

            let time = language === LANGUAGES.VI ? dataTime.timeTypeData?.valueVi : dataTime.timeTypeData?.valueEn

            let date = language === LANGUAGES.VI ?
             moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
             :
             moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY');

            return (
                <>
                    <div>{time} - {date}</div>
                    <div><FormattedMessage id="patient.booking-modal.priceBooking"/></div>
                </>
            )
        }

        return '';

    }

    render() {

        const {language, isShowDescriptionDoctor, dataTime} = this.props;
        const {dataProfile} = this.state

        let nameVi = ''; 
        let nameEn = '';

        if(dataProfile && dataProfile.positionData){
            nameVi = `${dataProfile.positionData.valueVi}  ${dataProfile.lastName} ${dataProfile.firstName}`
            nameEn = `${dataProfile.positionData.valueEn} ${dataProfile.firstName} ${dataProfile.lastName}`
        }


        return (
            <>
                <div className='intro-doctor container'>
                    <div 
                        className='content-left avatar'
                        style={{backgroundImage: `url(${dataProfile.image})`}}
                    >

                    </div>
                    <div className='content-right'>
                        <h2 className='up'>
                            <strong>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </strong>
                        </h2>
                        <div className='down'>
                            {isShowDescriptionDoctor ?
                                <>
                                    {
                                        dataProfile.Markdown && dataProfile.Markdown.description && 
                                        <span>{dataProfile.Markdown.description}</span>
                                    }
                                </>
                                :
                                <>
                                    {this.renderTimeBooking(dataTime)}
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className='price container'>
                    <span><FormattedMessage id="patient.booking-modal.price"/>: </span>
                    <span>
                        {dataProfile && dataProfile.Doctor_Infor && dataProfile.Doctor_Infor.priceTypeData && language === LANGUAGES.VI ?
                            <NumberFormat 
                                value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                                displayType={'text'} 
                                thousandSeparator={true} 
                                suffix={'VND'}
                            /> 
                            : ''
                        }
                        {dataProfile && dataProfile.Doctor_Infor && dataProfile.Doctor_Infor.priceTypeData && language === LANGUAGES.EN ?
                            <NumberFormat 
                                value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                                displayType={'text'} 
                                thousandSeparator={true} 
                                suffix={'$'}
                            /> 
                        : ''
                        }
                    </span>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
