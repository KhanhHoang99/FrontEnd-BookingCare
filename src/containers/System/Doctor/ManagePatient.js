import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker'
import userService from '../../../services/userService';
import moment from 'moment';



class ManagePatient extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            currentDate:  moment(new Date()).startOf('day').valueOf(),
            dataPatient: {}
        }
    }

    async componentDidMount() {
        let {user} = this.props;
        let {currentDate}  = this.state;
        let formatedDate = new Date(currentDate).getTime();

        this.getDataPatient(user, formatedDate)

    }
    
    getDataPatient = async (user, formatedDate) => {
        let res = await userService.getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        })
        
        if(res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }

    }
    
    componentDidUpdate(prev) {
       
    }

    handleOnchaneDatePicker = (date) => {
        console.log(date[0])
        this.setState({
            currentDate: date[0]
        }, () => {
            let {user} = this.props;
            let {currentDate}  = this.state;
            let formatedDate = new Date(currentDate).getTime();
    
            this.getDataPatient(user, formatedDate)
        })
        
    }

    render() {
       
        const {dataPatient} = this.state;

         
        return (
            <div className='manage-patient-container container'>
                <div className='m-p-title'>
                    Quản lý bệnh nhân khám bệnh
                </div>
                <div className='manage-patient-body row'>
                    <div className='col-4 form-group'>
                        <label>Chọn ngày khám</label>
                        <DatePicker
                            onChange={this.handleOnchaneDatePicker}
                            className='form-control my-2'
                            defaulvalue={this.state.currentDate}
                        />
                    </div>
                    <div className='col-12 py-5'>
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Giới Tính</th>
                                    <th scope="col">Thời Gian</th>
                                    <th scope="col">Hành Động</th> 
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dataPatient && dataPatient.length > 0 &&
                                    dataPatient.map((item) => {
                                        console.log(item)
                                        return (

                                            <tr key={item.id}>
                                                <td>{item.patientData.firstName}</td>
                                                <td>{item.patientData.genderData.valueVi}</td>
                                                <td>{item.timeTypeDataPatient.valueVi}</td>
                                                <td>
                                                    <button type="button" class="btn btn-success mx-2">Xác Nhận Khám</button>
                                                    <button type="button" class="btn btn-primary">Gửi Hóa Đơn</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
      
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
