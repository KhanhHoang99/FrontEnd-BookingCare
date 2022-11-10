import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const ArrowLeft = (props) => (
    <button
        {...props}
        className='btn-left'
    >
        <i className="fas fa-angle-left slick-icon"></i>
    </button>
);

const ArrowRight = (props) => (
    <button
        {...props}
        className='btn-right'
    >
        <i className="fas fa-angle-right slick-icon"></i>
    </button>
);

class Specialty extends Component {

    

    render() {
        
        let settings = {
            className: 'section-slider-custom',
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            nextArrow: <ArrowLeft />,
            prevArrow: <ArrowRight />
          };

        return (
            <div className='wrapper'>
                <div className='section-specialty container'>
                    <div className='specialty-content'>
                        <div className='specialty-header'>
                            <span className='specialty-header-title'>Chuyên khoa phổ biến</span>
                            <button>Xem thêm</button>
                        </div>
                        <div className='specialty-body'>
                            <Slider {...settings}>
                                <div className='specialty-card'>
                                    <div className='specialty-img'/>
                                    <p className='specialty-title'>Cơ xương khớp 1</p>
                                </div>
                                <div className='specialty-card'>
                                    <div className='specialty-img'/>
                                    <p className='specialty-title'>Cơ xương khớp 2</p>
                                </div>
                                <div className='specialty-card'>
                                    <div className='specialty-img'/>
                                    <p className='specialty-title'>Cơ xương khớp 3</p>
                                </div>
                                <div className='specialty-card'>
                                    <div className='specialty-img'/>
                                    <p className='specialty-title'>Cơ xương khớp 4</p>
                                </div>
                                <div className='specialty-card'>
                                    <div className='specialty-img'/>
                                    <p className='specialty-title'>Cơ xương khớp 5</p>
                                </div>
                                <div className='specialty-card'>
                                    <div className='specialty-img'/>
                                    <p className='specialty-title'>Cơ xương khớp 6</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
