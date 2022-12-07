import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import userService from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';


class Specialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
           dataSpecialty : []
        }
    }

    async componentDidMount() {
        const res = await userService.getAllSpecialty();

        if(res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data || []
            })
        }
    }

    handleViewDetailSpecialty = (item) => {
        if(this.props.history){
            this.props.history.push({ pathname: `/detail-specialty/${item.id}`})
        }
    }

    render() {
        
        const {dataSpecialty} = this.state;
        // console.log(dataSpecialty)



        return (
            <div className='wrapper'>
                <div className='section-specialty container'>
                    <div className='section-content'>
                        <div className='section-header'>
                            <span className='section-header-title'><FormattedMessage id="homepage.speciality-popular"/></span>
                            <button><FormattedMessage id="homepage.more-info"/></button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                
                                {
                                    dataSpecialty && dataSpecialty.length > 0 &&
                                    dataSpecialty.map((item) => {
                                        return (
                                            <div 
                                                className='section-card' 
                                                key={item.id}
                                                onClick={() => this.handleViewDetailSpecialty(item)}
                                            >
                                                <div 
                                                    className='section-img bg-specialty' 
                                                    style={{backgroundImage: `url(${item.image})`}}/>
                                                <p className='section-title'>{item.name}</p>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)( withRouter(Specialty));;
