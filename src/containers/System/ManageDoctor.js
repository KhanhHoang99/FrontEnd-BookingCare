import React, { Component } from 'react';
import * as actions from "../../store/actions";
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';
import {  CRUD_ACTIONS, LANGUAGES } from '../../utils/constant';
import userService from '../../services/userService';


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
            selectedPrice: null,
            selectedPayment: null,
            selectedProvince: null,
            nameClinic: '',
            addressClinic: '',
            note: ''
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
            const {resPayment, resPrice, resProvince} = this.props.allRequiredDoctorInfor;
            let dataSelectedPrice = this.buildDataInputSelect(resPrice);
            let dataSelectedPayment = this.buildDataInputSelect(resPayment);
            let dataSelectedProvince = this.buildDataInputSelect(resProvince);


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

        let {hasOldData} = this.state;

        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })
        // console.log(this.state)
    }

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });

        let res =  await userService.getDetailInfoDoctor(selectedDoctor.value);
        if(res && res.errCode === 0 && res.data && res.data.Markdown){
            let Markdown = res.data.Markdown;
            this.setState({
                contentMarkdown: Markdown.contentMarkdown,
                contentHTML: Markdown.contentHTML,
                description: Markdown.description,
                hasOldData: true
            })
        }else{
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                hasOldData: false
            })
        }
        console.log(res)
      };
    
    
    handleOnChangeDesc = (e) => {
        this.setState({
            description: e.target.value
        })
      }

    buildDataInputSelect = (inputData, type) => {
        let result = [];

        let {language} = this.props

        if(inputData && inputData.length > 0) {
             inputData.map((item, index) => {

                let Object = {};
                let labelVi = type === "USERS" ? `${item.lastName} ${item.firstName}` : item.valueVi;
                let labelEn = type === "USERS" ? `${item.firstName} ${item.lastName}` : item.valueEn;
                Object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                Object.value = item.id;
                result.push(Object)
            })
        }


        return result;
    }

    render() {

        const { selectedDoctor, listDoctors } = this.state;
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
                            placeholder='Select the doctor here'
                        />
                    </div>
                    <div className='content-right form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.intro"/></label>
                        <textarea 
                            className='form-control' 
                            rows='4'
                            onChange={(e) => this.handleOnChangeDesc(e)}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>
                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label>Chọn giá</label>
                        <Select
                            // value={selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listPrice}
                            placeholder='Select price here'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chọn phương thức thanh toán</label>
                        <Select
                            // value={selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listPayment}
                            placeholder='Select payment here'
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label>Chọn tỉnh thành</label>
                        <Select
                            // value={selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listProvince}
                            placeholder='Select price here'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chọn giá</label>
                        <Select
                            // value={selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listPrice}
                            placeholder='Select price here'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chọn giá</label>
                        <Select
                            // value={selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listPrice}
                            placeholder='Select price here'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chọn giá</label>
                        <Select
                            // value={selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listPrice}
                            placeholder='Select price here'
                        />
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor 
                        style={{ height: '500px' }} 
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
