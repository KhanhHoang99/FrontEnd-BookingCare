import React, { Component } from 'react';
import { connect } from 'react-redux';
import userService from '../../../services/userService';
import './DoctorExtraInfor.scss';
import { LANGUAGES } from '../../../utils/constant';
import Select from 'react-select';

import { FormattedMessage } from "react-intl";
import NumberFormat from 'react-number-format';



class DoctorExtraInfor extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor : {}
        }
    }
    

    async componentDidMount() {

               
    }

    async componentDidUpdate(prevProps) {
        if(this.props.language !== prevProps.language) {
           
        }
        if(this.props.idFromParent !== prevProps.idFromParent) {
            let res = await userService.getExtraInforDoctorById(this.props.idFromParent);
            if(res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }   

        
    }

    handleChange = async (selectedOption) => {
       
      };
   

    render() {
     
       const {language} = this.props;
       const {isShowDetailInfor, extraInfor} = this.state;

        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'><FormattedMessage id="patient.detail-doctor.clinic-address"/></div>
                    <div className='name-clinic'>{extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ""}</div>
                    <div className='detail-address'>{extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ""}</div>
                </div>
                <div className='content-down'>
                    <div className='detail-price'>
                        <p>
                            <span className='title'><FormattedMessage id="patient.detail-doctor.examination-price"/>:</span>
                            {
                                extraInfor && extraInfor.priceTypeData && isShowDetailInfor === false ?
                                <span className='number-price'>
                                    <NumberFormat 
                                        value={language === LANGUAGES.VI ? extraInfor.priceTypeData.valueVi :  extraInfor.priceTypeData.valueEn} 
                                        displayType={'text'} 
                                        thousandSeparator={true} 
                                        suffix={language === LANGUAGES.VI ? 'VND' : '$'} 
                                    />
                                </span>
                                : ''
                            }
                            {
                                isShowDetailInfor === false &&
                                <span className='show-detail' onClick={() => this.setState({isShowDetailInfor: true})}>
                                    <FormattedMessage id="patient.detail-doctor.show-detail"/>
                                </span>
                            }
                        </p>
                    </div>
                    {
                        isShowDetailInfor && 
                        <>  
                            <div className='more-detail-price'>
        
                                <div className='note'>
                                <p>
                                    <FormattedMessage id="patient.detail-doctor.examination-price"/>
                                    {
                                        extraInfor && extraInfor.priceTypeData ?
                                        <span className='number-price'>
                                            <NumberFormat 
                                                value={language === LANGUAGES.VI ? extraInfor.priceTypeData.valueVi :  extraInfor.priceTypeData.valueEn} 
                                                displayType={'text'} 
                                                thousandSeparator={true} 
                                                suffix={language === LANGUAGES.VI ? 'VND' : '$'} 
                                            />
                                        </span>
                                        : ''
                                    }
                                </p>
                                <p className='note-down'>{extraInfor && extraInfor.note ? extraInfor.note : ""}</p>
                                </div>
                                <div className='payment'>
                                    <FormattedMessage id="patient.detail-doctor.payment"/>
                                    {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.VI ? 
                                    <span> {extraInfor.paymentTypeData.valueVi}</span> : ""}
                                    {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.EN ? 
                                    <span> {extraInfor.paymentTypeData.valueEn}</span> : ""} 
                                </div>
                            </div>
                            <div>
                                <span 
                                    className='show-detail'
                                    onClick={() => this.setState({isShowDetailInfor: false})}
                                >
                                    <FormattedMessage id="patient.detail-doctor.hide-table"/>
                                </span>
                            </div>
                        </>
                    }
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
