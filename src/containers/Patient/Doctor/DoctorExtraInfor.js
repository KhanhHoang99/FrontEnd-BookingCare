import React, { Component } from 'react';
import { connect } from 'react-redux';
import userService from '../../../services/userService';
import './DoctorExtraInfor.scss';
import { LANGUAGES } from '../../../utils/constant';
import Select from 'react-select';

import { FormattedMessage } from "react-intl";



class DoctorExtraInfor extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false
        }
    }
    

    async componentDidMount() {

               
    }

    async componentDidUpdate(prevProps) {
        if(this.props.language !== prevProps.language) {
           
        }

        
    }

    handleChange = async (selectedOption) => {
       
      };
   

    render() {
     
       const {language} = this.props;
       const {isShowDetailInfor} = this.state;

        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'>ĐỊA CHỈ KHÁM</div>
                    <div className='name-clinic'>Phòng khám Chuyên khoa Da Liễu</div>
                    <div className='detail-address'>207 Phố Huế - Hai Bà Trưng - Hà Nội</div>
                </div>
                <div className='content-down'>
                    <div className='detail-price'>
                        Giá Khám: <span>300000 VND</span>
                        <span className='show-detail' onClick={() => this.setState({isShowDetailInfor: true})}> xem chi tiết</span>
                    </div>
                    {
                        isShowDetailInfor && 
                        <>  
                            <div className='more-detail-price'>
                                <div className='note'>
                                    <p>Giá khám <span>300000 VND</span></p>
                                    <p className='note-down'>Được ưu tiên khám trước khi đật khám qua BookingCare. Giá khám cho người nước ngoài là 30 USD</p>
                                </div>
                                <div className='payment'>
                                    Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt và quẹt thẻ
                                </div>
                            </div>
                            <div>
                                <span 
                                    className='show-detail'
                                    onClick={() => this.setState({isShowDetailInfor: false})}
                                >
                                    Ẩn bảng giá
                                </span>
                            </div>
                        </>
                    }
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
