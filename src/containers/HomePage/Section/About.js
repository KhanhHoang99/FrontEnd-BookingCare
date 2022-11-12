import React, { Component } from 'react';
import { connect } from 'react-redux';


class About extends Component {

    

    render() {
        

        return (
            <div className='wrapper about'>
                <div className='container'>
                    <p className='about-header'>Truyền thông nói về BookingCare</p>
                    <div className='about-content'>
                        <div className='content-left'>
                            <div className='video'>
                                <iframe  
                                    src="https://www.youtube.com/embed/Ws-QlpSltr8" 
                                    title="Đen - Trốn Tìm ft. MTV band (M/V)" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
                                </iframe>
                            </div>
                        </div>
                        <div className='content-right'>
                            <p>Đen - Trốn Tìm ft. MTV band (M/V)</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
