import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import userService from '../../../services/userService';
import { withRouter } from 'react-router-dom';





class MedicalFacility extends Component {

    constructor(props) {
        super(props);
        this.state = {
           dataClinics : []
        }
    }

    async componentDidMount() {
        const res = await userService.getAllClinic();

        if(res && res.errCode === 0) {
            this.setState({
                dataClinics: res.data || []
            })
        }
    }

    handlleViewDetailClinic = (clinic) => {
        // console.log('click: ', clinic)
        if(this.props.history){
            this.props.history.push({ pathname: `/detail-clinic/${clinic.id}`})
        }
    }

    render() {
        
        const {dataClinics} = this.state;
        // console.log(dataClinics);

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
                                {
                                    dataClinics && dataClinics.length > 0 && 
                                    dataClinics.map((item)=> {
                                        return (
                                            <div 
                                                className='section-card' 
                                                key={item.id}
                                                onClick={() => this.handlleViewDetailClinic(item)}
                                            >
                                                <div 
                                                    className='section-img bg-medical'
                                                    style={{backgroundImage: `url(${item.image})`}}
                                                />
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MedicalFacility));
