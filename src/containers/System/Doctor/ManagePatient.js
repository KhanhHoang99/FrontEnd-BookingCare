import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker'




class ManagePatient extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            currentDate: new Date(),
        }
    }

    componentDidMount() {
        
    }
    
    componentDidUpdate(prev) {
       
    }

    handleOnchaneDatePicker = (date) => {
        console.log(date[0])
        this.setState({
            currentDate: date[0]
        })
        
    }

    render() {
       
        
         
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
                                    <th scope="col">#</th>
                                    <th scope="col">First</th>
                                    <th scope="col">Last</th>
                                    <th scope="col">Handle</th> 
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
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
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
      
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
