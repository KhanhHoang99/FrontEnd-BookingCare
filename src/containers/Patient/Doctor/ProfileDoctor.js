import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";
import './ProfileDoctor.scss';
import userService from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant';
import NumberFormat from 'react-number-format';



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

    render() {

        const {language} = this.props;
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
                            {
                                dataProfile.Markdown && dataProfile.Markdown.description && 
                                <span>{dataProfile.Markdown.description}</span>
                            }
                        </div>
                    </div>
                </div>
                <div className='price container'>
                    <span>Giá khám bệnh: </span>
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
