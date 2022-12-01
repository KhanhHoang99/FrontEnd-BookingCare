import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";
import './BookingModal.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash'

class BookingModal extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        }
    }
        
    async componentDidMount() {

       
               
    }

    async componentDidUpdate(prevProps) {
        if(this.props.language !== prevProps.language) {
           
        }

       
    }

    render() {

        const {language, isOpenModalBooking, closeBookingModal, dataScheduleTimeModal} = this.props;
        let doctorId = dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal) ? dataScheduleTimeModal.doctorId : ''
      
        return (
            <Modal 
                isOpen={isOpenModalBooking} 
                className='booking-modal-container'
                size='lg'
            >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'>Thông tin đặt lịch khám bệnh</span>
                        <span 
                            className='right' 
                            onClick={() => closeBookingModal()}
                        >
                            <i className='fas fa-times'></i>
                        </span>
                    </div>
                    <div className='booking-modal-body'>
                        {/* {JSON.stringify(dataScheduleTimeModal)} */}
                        <div className='doctor-infor'>
                            <ProfileDoctor doctorId={doctorId}/>
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Họ tên</label>
                                <input className='form-control'/>
                            </div>
                            <div className='col-6 form-group'>
                                <label>Số điện thoại</label>
                                <input className='form-control'/>
                            </div>
                            <div className='col-6 form-group'>
                                <label>Địa chỉ email</label>
                                <input className='form-control'/>
                            </div>
                            <div className='col-6 form-group'>
                                <label>Địa chỉ liên hệ</label>
                                <input className='form-control'/>
                            </div>
                            <div className='col-6 form-group'>
                                <label>Lý do khám</label>
                                <input className='form-control'/>
                            </div>
                            <div className='col-6 form-group'>
                                <label>Đặt cho ai</label>
                                <input className='form-control'/>
                            </div>
                            <div className='col-6 form-group'>
                                <label>Giới tính</label>
                                <input className='form-control'/>
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm'>Xác nhận</button>
                        <button 
                            className='btn-booking-cancel'
                            onClick={() => closeBookingModal()}
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
