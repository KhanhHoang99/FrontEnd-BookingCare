import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class OutStandingDoctor extends Component {

    
    render() {
        
        return (
            <div className='wrapper'>
                <div className='section-specialty container'>
                    <div className='section-content'>
                        <div className='section-header'>
                            <span className='section-header-title'>Bác sĩ nổi bật tuần qua</span>
                            <button>Xem thêm</button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                <div className='section-card'>
                                    <div className='section-card-doctor'>
                                        <div className='section-img bg-specialty avatar'></div>
                                        <p className='doctor-name'>Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng</p>
                                        <p className='specialist-doctor'>Da liễu</p>
                                    </div>
                                </div>
                                <div className='section-card'>
                                    <div className='section-card-doctor'>
                                        <div className='section-img bg-specialty avatar'></div>
                                            <p className='doctor-name'>Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng</p>
                                            <p className='specialist-doctor'>Da liễu</p>
                                        </div>
                                    </div>
                                <div className='section-card'>
                                    <div className='section-card-doctor'>
                                        <div className='section-img bg-specialty avatar'></div>
                                        <p className='doctor-name'>Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng</p>
                                        <p className='specialist-doctor'>Da liễu</p>
                                    </div>
                                </div>
                                <div className='section-card'>
                                    <div className='section-card-doctor'>
                                        <div className='section-img bg-specialty avatar'></div>
                                        <p className='doctor-name'>Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng</p>
                                        <p className='specialist-doctor'>Da liễu</p>
                                    </div>
                                </div>
                                <div className='section-card'>
                                    <div className='section-card-doctor'>
                                        <div className='section-img bg-specialty avatar'></div>
                                        <p className='doctor-name'>Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng</p>
                                        <p className='specialist-doctor'>Da liễu</p>
                                    </div>
                                </div>
                                <div className='section-card'>
                                    <div className='section-card-doctor'>
                                        <div className='section-img bg-specialty avatar'></div>
                                        <p className='doctor-name'>Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng</p>
                                        <p className='specialist-doctor'>Da liễu</p>
                                    </div>
                                </div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
