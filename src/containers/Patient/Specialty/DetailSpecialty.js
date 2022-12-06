import React, { Component} from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailSpecialty.scss';
import { toast } from 'react-toastify';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import userService from '../../../services/userService';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';
import Select from 'react-select';



class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
           arrDoctorId: [],
           dataDetailSpecialty: {},
           listProvince: [],
           selectedProvince: null
        }
    }

    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id) {
            const id = this.props.match.params.id;

            const res = await userService.getAllDetailSpecialtyById({id: id, location: 'ALL'});
            const resProvince = await userService.getAllCodeService('PROVINCE');

            if(res && res.errCode === 0 && resProvince && resProvince.errCode === 0){

                let data = res.data;
                let arrDoctorId = [];

                if(data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;
                    if(arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                let dataProvince = resProvince.data;
                // let result = [];
                if(dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: 'ALL',
                        type: "PROVINCE",
                        valueEn: "All",
                        valueVi: "Toàn quốc"
                    })
                }

                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince
                })
            }
            
        }
    }

    
    handleChangeSelect = async (selectedProvince) => {
        // console.log(selectedProvince.value)

        if(this.props.match && this.props.match.params && this.props.match.params.id) {
            const id = this.props.match.params.id;
            const location = selectedProvince.value

            const res = await userService.getAllDetailSpecialtyById({id: id, location: location});
    

            if(res && res.errCode === 0 ){

                let data = res.data;
                let arrDoctorId = [];

                if(data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;
                    if(arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }


                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    selectedProvince: selectedProvince
                })

            }
        }

    }
    

    buildDataInputSelect = (inputData) => {
        let result = [];
        let {language} = this.props
        inputData.map((item, index) => {
            let Object = {};
            let labelVi = `${item.valueVi}`;
            let labelEn =  `${item.valueEn}`;
            Object.label = language === LANGUAGES.VI ? labelVi : labelEn;
            Object.value = item.keyMap;
            result.push(Object)
        })

        return result;

    }
 
    render() {

        const {arrDoctorId, dataDetailSpecialty, listProvince, selectedProvince} = this.state;
        const {language} = this.props;
        
        const options = this.buildDataInputSelect(listProvince);

        return (
            <div className='detail-specialty-container container'>
                <HomeHeader />
                <div className='des-specialty'>
                    {
                        dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                        <div dangerouslySetInnerHTML={{__html: dataDetailSpecialty.descriptionHTML}}></div>
                    }

                </div>
                <div className='search-sp-doctor' style={{width: "200px"}}>
                    <Select
                            value={selectedProvince}
                            onChange={this.handleChangeSelect}
                            options={options}
                            placeholder="Chọn Tỉnh Thành"
                        />
                </div>
                {
                    arrDoctorId && arrDoctorId.length > 0 && 
                    arrDoctorId.map((item) => {
                        return (
                            
                            <div className='each-doctor' key={item} >
                                <div className='dt-content-left'>
                                    <ProfileDoctor 
                                        doctorId = {item}
                                        isShowDescriptionDoctor={true}
                                        isShowLinkDetail={true}
                                        isShowPrice={false}
                                    />
                                </div>
                                <div className='dt-content-right'>
                                    <DoctorSchedule idFromParent = {item}/>
                                    <DoctorExtraInfor idFromParent = {item}/>
                                </div>
                             </div>

                        )

                    })
                }
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);