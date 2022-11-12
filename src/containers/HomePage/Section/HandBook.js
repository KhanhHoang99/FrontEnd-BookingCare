import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




class HandBook extends Component {

    

    render() {
        

        return (
            <div className='wrapper bg-gray'>
                <div className='section-specialty container'>
                    <div className='section-content'>
                        <div className='section-header'>
                            <span className='section-header-title'>Cẩm nang</span>
                            <button>Tất cả bài viết</button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                <div className='section-card'>
                                    <div className='handBook'>
                                        <div className='section-img bg-medical'></div>
                                        <p className='section-title'>Bệnh viện chợ rẫy 1</p>
                                    </div>
                                </div>
                                <div className='section-card handBook'>
                                    <div className='handBook'>
                                        <div className='section-img bg-medical'></div>
                                        <p className='section-title'>Bệnh viện chợ rẫy 1</p>
                                    </div>
                                </div>
                                <div className='section-card handBook'>
                                    <div className='handBook'>
                                        <div className='section-img bg-medical'></div>
                                        <p className='section-title'>Bệnh viện chợ rẫy 1</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
