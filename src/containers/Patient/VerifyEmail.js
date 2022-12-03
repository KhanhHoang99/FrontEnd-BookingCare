import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";
import { userService } from '../../services';
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyEmail.scss';




class VerifyEmail extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
           statusVerify: false,
           errCode: -1
        }
    }
        
    async componentDidMount() {

        if(this.props.location && this.props.location.search) {

            const urlParams = new URLSearchParams(this.props.location.search);
            const token = urlParams.get('token');
            const doctorId = urlParams.get('doctorId');
            
            let res = await userService.postVerifyBookAppointment({token, doctorId});

            if(res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            }else{
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }

        }


      
                  
    }

   

    async componentDidUpdate(prevProps) {
        if(this.props.language !== prevProps.language) {
           
        }

       
    }

 

    render() {
    
        const {statusVerify, errCode} = this.state;
      console.log(this.state)

        return (
            <>
                <HomeHeader />
                {
                    <div className='verify-email-container container'>
                        {
                            statusVerify === false ?
                            <p>Loading........</p>
                            :
                            <>
                                {
                                    errCode === 0 ?
                                    <p>xác nhận lịch hẹn thành công!</p>
                                    :
                                    <p>Lịch hẹn đã được xác nhận hoặc không tồn tại!</p>
                                }
                            </>
                        }
                    </div>
                    
                }
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
