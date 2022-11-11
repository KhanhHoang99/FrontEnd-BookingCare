import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




class MedicalFacility extends Component {

    

    render() {
        

        return (
            <div className='wrapper bg-gray'>
                <div className='section-specialty container'>
                    <div className='section-content'>
                        <div className='section-header'>
                            <span className='section-header-title'>Cơ sở y tế nổi bật</span>
                            <button>Xem thêm</button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                <div className='section-card'>
                                    <div className='section-img bg-medical'/>
                                    <p className='section-title'>Bệnh viện chợ rẫy 1</p>
                                </div>
                                <div className='section-card'>
                                    <div className='section-img bg-medical'/>
                                    <p className='section-title'>Bệnh viện chợ rẫy 2</p>
                                </div>
                                <div className='section-card'>
                                    <div className='section-img bg-medical'/>
                                    <p className='section-title'>Bệnh viện chợ rẫy 3</p>
                                </div>
                                <div className='section-card'>
                                    <div className='section-img bg-medical'/>
                                    <p className='section-title'>Bệnh viện chợ rẫy 4</p>
                                </div>
                                <div className='section-card'>
                                    <div className='section-img bg-medical'/>
                                    <p className='section-title'>Bệnh viện chợ rẫy 5</p>
                                </div>
                                <div className='section-card'>
                                    <div className='section-img bg-medical'/>
                                    <p className='section-title'>Bệnh viện chợ rẫy 6</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
