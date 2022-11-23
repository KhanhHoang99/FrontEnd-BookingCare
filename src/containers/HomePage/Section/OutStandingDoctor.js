import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from 'react-intl';
import * as action from '../../../store/actions';
import {LANGUAGES} from '../../../utils/constant';
// import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class OutStandingDoctor extends Component {

    constructor(props){
        super(props)
        this.state = {
            arrDoctors: []
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors();
    }

    componentDidUpdate(prev){
        if(prev.topDoctorsRedux !== this.props.topDoctorsRedux){
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
    }
    
    
    handleViewDetailDoctor = (doctor) => {
        this.props.history.push({ pathname: `/detail-doctor/${doctor.id}`})
    }

    render() {
        let arrDoctors = this.state.arrDoctors;
        arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors)
        let {language} = this.props;

        return (
            <div className='wrapper'>
                <div className='section-specialty container'>
                    <div className='section-content'>
                        <div className='section-header'>
                            <span className='section-header-title'><FormattedMessage id="homepage.outstanding-doctor" /></span>
                            <button><FormattedMessage id="homepage.more-info" /></button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                {
                                    arrDoctors && arrDoctors.length > 0 &&
                                    arrDoctors.map((doctor) => {

                                        let imageBase64 = '';
                                        if(doctor.image){
                                            imageBase64 = new Buffer(doctor.image, 'base64').toString('binary');
                                        }

                                        let nameVi = `${doctor.positionData.valueVi}  ${doctor.lastName} ${doctor.firstName}`
                                        let nameEn = `${doctor.positionData.valueEn} ${doctor.firstName} ${doctor.lastName}`

                                        return (
                                            <div className='section-card' key={doctor.id} onClick={() => this.handleViewDetailDoctor(doctor)}>
                                                <div className='section-card-doctor'>
                                                    <div className='section-img bg-specialty avatar'
                                                        style={{backgroundImage: `url(${imageBase64})`}}
                                                    >
                                                    </div>
                                                    <p className='doctor-name'>{language === LANGUAGES.VI ? nameVi : nameEn}</p>
                                                    <p className='specialist-doctor'>Da liễu</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(action.fetchTopDoctor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)( withRouter(OutStandingDoctor));
