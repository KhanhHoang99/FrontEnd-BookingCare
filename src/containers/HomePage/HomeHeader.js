import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";
import './HomeHeader.scss';


const OPTIONS = [
    {
        icon: <i className="fas fa-hospital"></i>,
        title: 'Khám chuyên khoa'
    },
    {
        icon: <i className="fas fa-phone"></i>,
        title: 'Khám từ xa'
    },
    {
        icon: <i className="fas fa-stethoscope"></i>,
        title: 'Khám tổng quát'
    },
    {
        icon: <i className="fas fa-flask"></i>,
        title: 'Xét nghiệm y học'
    },
    {
        icon: <i className="fas fa-hospital"></i>,
        title: 'Khám chuyên khoa'
    },
    {
        icon: <i className="fas fa-briefcase-medical"></i>,
        title: 'Khám nha khoa'
    },
    
];



class HomeHeader extends Component {

    
    render() {
        
        console.log('props: ', this.props)

        return (
            <>
                <div className='home-header-container container'>
                        <div className='home-header-content'>
                            <div className='left-content'>
                                <i className="fas fa-bars bar-logo"></i>
                                <div className='header-logo'></div>
                            </div>
                            <div className='center-content'>
                                <div className='child-content'>
                                    <div><b><FormattedMessage id="home-header.speciality" /></b></div>
                                    <div className='sub-title'><FormattedMessage id="home-header.search-doctor" /></div>
                                </div>
                                <div className='child-content'>
                                    <div><b><FormattedMessage id="home-header.health-facilities" /></b></div>
                                    <div className='sub-title'><FormattedMessage id="home-header.select-room" /></div>
                                </div>
                                <div className='child-content'>
                                    <div><b><FormattedMessage id="home-header.doctor" /></b></div>
                                    <div className='sub-title'><FormattedMessage id="home-header.select-doctor" /></div>
                                </div>
                                <div className='child-content'>
                                    <div><b><FormattedMessage id="home-header.fee" /></b></div>
                                    <div className='sub-title'><FormattedMessage id="home-header.check-health" /></div>
                                </div>
                            </div>
                            <div className='right-content'>
                                <span><i className="fas fa-question-circle"></i><FormattedMessage id="home-header.support" /></span>
                                <span className='language-vi'>VN</span>
                                <span className='language-en'>EN</span>
                            </div>
                        </div>
                </div>
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <h1 className='title'><FormattedMessage id="banner.title1" /><br/><b><FormattedMessage id="banner.title2" /></b></h1>
                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <input 
                                type='text'
                                placeholder='Tìm bác sĩ'
                            />
                        </div>
                    </div>
                    <div className='content-down'>
                        <ul className='options'>
                            {
                                OPTIONS && OPTIONS.length > 0 &&
                                OPTIONS.map((item, index) => {
                                    return (
                                        <li className='option-child' key={`option${index}`}>
                                            <span className='icon-child'>{item.icon}</span>
                                            <p className='text-child'>{item.title}</p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
