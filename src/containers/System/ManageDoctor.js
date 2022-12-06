import React, { Component } from 'react';
import * as actions from "../../store/actions";
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';
import {  CRUD_ACTIONS, LANGUAGES } from '../../utils/constant';
import userService from '../../services/userService';
import { toast } from 'react-toastify';


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    
    constructor(props) {
        super(props);
        this.state = {

            // save to Markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: null,
            description: '',
            listDoctors: [],
            hasOldData: false,
            
            // save to doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: null,
            selectedPayment: null,
            selectedProvince: null,
            selectedClinic: null,
            selectedSpecialty: null,

            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: ''
        }
    }
    
    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getAllRequiredDoctorInfor()
    }
    
    componentDidUpdate(prev) {
        if(prev.allDoctors !== this.props.allDoctors){
            this.setState({
                listDoctors: this.props.allDoctors
            })
        }

        if(prev.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor){
            // console.log('allRequiredDoctorInfor: ', this.props.allRequiredDoctorInfor)
            const {resPayment, resPrice, resProvince, resSpecialty} = this.props.allRequiredDoctorInfor;
            let dataSelectedPrice = this.buildDataInputSelect(resPrice, "PRICE");
            let dataSelectedPayment = this.buildDataInputSelect(resPayment);
            let dataSelectedProvince = this.buildDataInputSelect(resProvince);
            let dataSelectedSpecialty = this.buildDataInputSelect(resSpecialty, "SPECIALTY");


            this.setState({
                listPrice: dataSelectedPrice,
                listPayment: dataSelectedPayment,
                listProvince: dataSelectedProvince,
                listSpecialty: dataSelectedSpecialty
            })
        }

        if(prev.language !== this.props.language) {
            const {resPayment, resPrice, resProvince} = this.props.allRequiredDoctorInfor;
            let dataSelectedPrice = this.buildDataInputSelect(resPrice, "PRICE");
            let dataSelectedPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
            let dataSelectedProvince = this.buildDataInputSelect(resProvince, "PROVINCE");
            this.setState({
                listPrice: dataSelectedPrice,
                listPayment: dataSelectedPayment,
                listProvince: dataSelectedProvince,
            })

        }
        
    }

    
    handleEditorChange = ( html, text ) => {
        this.setState({
            contentMarkdown: html.text,
            contentHTML: html.html,
        })
    }

    handleSaveContentMarkDown = () => {

        let {   hasOldData, contentHTML, 
            contentMarkdown, description , selectedDoctor,
            selectedPrice, selectedPayment, 
            selectedProvince, nameClinic, 
            addressClinic, note} = this.state;

        if(!selectedDoctor || !selectedPrice || !selectedPayment || !selectedProvince){
            toast.error("some field are empty")
            return;
        }

        this.props.saveDetailDoctor({
            contentHTML: contentHTML,
            contentMarkdown: contentMarkdown,
            description: description,
            doctorId: selectedDoctor.value,
            selectedPrice: selectedPrice.value,
            selectedPayment: selectedPayment.value,
            selectedProvince: selectedProvince.value,
            nameClinic: nameClinic,
            addressClinic: addressClinic,
            note: note,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
            specialtyId: this.state.selectedSpecialty.value
        })
        // console.log(this.state)
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });

        let { listPayment, listPrice, listProvince, listSpecialty} = this.state;

        let res =  await userService.getDetailInfoDoctor(selectedDoctor.value);
        if(res && res.errCode === 0 && res.data && res.data.Markdown){
            let Markdown = res.data.Markdown;
            
            let addressClinic = '', nameClinic = '', note = '', paymentId = '', priceId = '', provinceId = '', specialtyId = '',
            selectedPayment = '', selectedPrice = '', selectedProvince = '', selectedSpecialty = '';
;

            if(res.data.Doctor_Infor) {

                addressClinic = res.data.Doctor_Infor.addressClinic;
                nameClinic = res.data.Doctor_Infor.nameClinic;
                note = res.data.Doctor_Infor.note;

                paymentId = res.data.Doctor_Infor.paymentId;
                priceId = res.data.Doctor_Infor.priceId;
                provinceId = res.data.Doctor_Infor.provinceId;
                specialtyId = res.data.Doctor_Infor.specialtyId;
                

                selectedPayment = listPayment.find(item => {
                    if(item.value === paymentId) {
                        return item
                    }
                })

                selectedPrice = listPrice.find(item => {
                    if(item.value === priceId) {
                        return item
                    }
                })

                selectedProvince = listProvince.find(item => {
                    if(item.value === provinceId) {
                        return item
                    }
                })

                selectedSpecialty = listSpecialty.find(item => {
                    if(item.value === specialtyId) {
                        return item
                    }
                })
    
            }

            this.setState({
                contentMarkdown: Markdown.contentMarkdown,
                contentHTML: Markdown.contentHTML,
                description: Markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty
               
            })
        }else{
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                addressClinic: '',
                nameClinic: '',
                note: '',
                selectedPayment: '',
                selectedPrice: '',
                selectedProvince: '',
                selectedSpecialty: '',
                hasOldData: false
            })
        }
        // console.log(res)
      };
    
    handleChangeSelectDoctorInfor = async (selectOption, name) => {

        // console.log('selectOption: ', selectOption)
        
        let stateName = name.name;
        let stateCopy = {...this.state};
        stateCopy[stateName] = selectOption
        this.setState(stateCopy);
       
    }
    
    handleOnChangeText = (e, id) => {
        let stateCopy = {...this.state};
        stateCopy[id] = e.target.value;

        this.setState({
            ...stateCopy
        })
      }

    buildDataInputSelect = (inputData, type) => {
        let result = [];

        let {language} = this.props

        if(inputData && inputData.length > 0) {

            if(type === "USERS") {
                inputData.map((item, index) => {
   
                   let Object = {};
                   let labelVi = `${item.lastName} ${item.firstName}` ;
                   let labelEn = `${item.firstName} ${item.lastName}` ;
                   Object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                   Object.value = item.id;
                   result.push(Object)
               })
            }

            else if(type === "SPECIALTY") {
                inputData.map((item, index) => {
   
                    let Object = {};
                    Object.label = item.name;
                    Object.value = item.id;
                    result.push(Object)
                })
            }

            else if(type === "PRICE") {
                inputData.map((item, index) => {

                    let Object = {};
                    let labelVi = `${item.valueVi} VND` ;
                    let labelEn =  `${item.valueEn} USD`;
                    Object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    Object.value = item.keyMap;
                    result.push(Object)
                })
            }
            
            else {
                inputData.map((item, index) => {

                    let Object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn =  `${item.valueEn}`;
                    Object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    Object.value = item.keyMap;
                    result.push(Object)
                })
            }


        }



        return result;
    }

    render() {

        const { selectedDoctor, listDoctors, selectedPayment, selectedPrice, selectedProvince, selectedSpecialty } = this.state;
        const options = this.buildDataInputSelect(listDoctors, 'USERS');
        return (
            
            <div className='manage-doctor-container container'>

                <div className='manage-doctor-title'><FormattedMessage id="admin.manage-doctor.title"/></div>
                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.select-doctor"/></label>
                        <Select
                            value={selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={options}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor"/>}
                        />
                    </div>
                    <div className='content-right form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.intro"/></label>
                        <textarea 
                            className='form-control' 
                            rows='4'
                            onChange={(e) => this.handleOnChangeText(e, 'description')}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>
                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label>Chọn giá</label>
                        <Select
                            value={selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price"/>}
                            name='selectedPrice'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chọn phương thức thanh toán</label>
                        <Select
                            value={selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment"/>}
                            name='selectedPayment'
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label>Chọn tỉnh thành</label>
                        <Select
                            value={selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province"/>}
                            name='selectedProvince'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Tên phòng khám</label>
                        <input 
                            className='form-control'
                            onChange={(e) => this.handleOnChangeText(e, 'nameClinic')}
                            value={this.state.nameClinic}
                        />
                        
                    </div>
                    <div className='col-4 form-group'>
                        <label>Địa chỉ phòng khám</label>
                        <input 
                            className='form-control'
                            onChange={(e) => this.handleOnChangeText(e, 'addressClinic')}
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Ghi chú</label>
                        <input 
                            className='form-control'
                            onChange={(e) => this.handleOnChangeText(e, 'note')}
                            value={this.state.note}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chọn chuyên khoa</label>
                        <Select
                            value={selectedSpecialty}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listSpecialty}
                            placeholder="Chọn chuyên khoa"
                            name='selectedSpecialty'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chọn phòng khám</label>
                        <input 
                            className='form-control'
                            // onChange={(e) => this.handleOnChangeText(e, 'note')}
                            // value={this.state.note}
                        />
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor 
                        style={{ height: '400px' }} 
                        renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <div>
                    <button
                        onClick={this.handleSaveContentMarkDown} 
                        className='save-content-doctor'
                    >
                        {
                            this.state.hasOldData ? 
                            <FormattedMessage id="admin.manage-doctor.add"/> 
                            : <FormattedMessage id="admin.manage-doctor.save"/> 
                        }
                    </button>
                </div>
            </div>
            
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors : () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        getAllRequiredDoctorInfor: () => dispatch(actions.getAllRequiredDoctorInfor()),
    };
};

    export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
