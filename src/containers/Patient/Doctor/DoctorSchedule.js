import React, { Component } from 'react';
import { connect } from 'react-redux';
import userService from '../../../services/userService';
import './DoctorSchedule.scss';
import { LANGUAGES } from '../../../utils/constant';
import Select from 'react-select';
import localization from 'moment/locale/vi';
import moment, { locale } from 'moment'



class DoctorSchedule extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            allDays : [],
        }
    }
    
    setAllDays = (language) => {

        let arrDate = [];

        for(let i = 0; i < 7; i++) {

            let object = {}

            if(language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            }else{
                object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');

            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            arrDate.push(object);
        }

        this.setState({
            allDays: arrDate
        })
    }
    
    async componentDidMount() {

        // console.log('Moment vi: ', moment(new Date()).format('dddd - DD/MM'));
        // console.log('Moment en: ', moment(new Date()).locale('en').format('dddd - DD/MM'));

        this.setAllDays(this.props.language);
               
    }

    componentDidUpdate(prevProps) {
        if(this.props.language !== prevProps.language) {
            this.setAllDays(this.props.language);       
        }
    }

    handleChange = async (selectedOption) => {
       
        this.setState({ selectedOption });

        const doctorId = this.props.id;
        const date = selectedOption.value;

        console.log("date: ", date);

        const res = await userService.getScheduleDoctorByDate(doctorId, date);
        console.log(res);
      };
   

    render() {

       const {allDays} = this.state;

        return (
            <div className='doctor-schedule-container'>
                <div className='all-shcedule'>
                    <div style={{width: '200px'}}>
                        <Select 
                            options={allDays}
                            onChange={this.handleChange}
                            placeholder='chọn lịch'
                        />
                    </div>
                </div>
                <div className='all-available-time'>

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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
