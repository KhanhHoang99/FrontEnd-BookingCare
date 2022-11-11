import React, { Component } from 'react';
import { connect } from 'react-redux';

import HomeHeader from './HomeHeader';
import MedicalFacility from './Section/MedicalFacility';
import Specialty from './Section/Specialty';
import './HomePage.scss';
import OutStandingDoctor from './Section/OutStandingDoctor';


const ArrowLeft = ({currentSlide, slideCount, children, ...props}) => (
    <button
        {...props}
        className='btn-left'
    >
        <i className="fas fa-angle-left slick-icon"></i>
    </button>
);

const ArrowRight = ({currentSlide, slideCount, children, ...props}) => (
    <button
        {...props}
        className='btn-right'
    >
        <i className="fas fa-angle-right slick-icon"></i>
    </button>
);

class HomePage extends Component {

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
            <>
                <HomeHeader />
                <Specialty settings = {settings}/>
                <MedicalFacility settings = {settings}/>
                <OutStandingDoctor settings = {settings}/>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
