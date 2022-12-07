import React, { Component } from 'react';
import * as actions from "../../../store/actions";
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageClinic.scss';
import Select from 'react-select';
import { FormattedMessage } from 'react-intl';
import {  CRUD_ACTIONS, LANGUAGES } from '../../../utils/constant';
import { userService } from '../../../services';
import { toast } from 'react-toastify';
import {CommonUtils} from "../../../utils";


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',

        }
    }

    componentDidMount() {
       
    }

    handleOnchangeInput = (event, id) => {
        let stateCopy = {...this.state};
        stateCopy[id] = event.target.value;

        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ( html, text ) => {
        this.setState({
            descriptionHTML: html.html,
            descriptionMarkdown: html.text,
        })
    }

    handleOnChangeImage = async (e) => {
        // console.log('event: ', e.target.files[0])
        const data = e.target.files;
        const file = data[0];
        if(file) {
            let base64 = await CommonUtils.getBase64(file);
            // console.log(base64);
            this.setState({
                imageBase64: base64
            });

        }
      }

    handleSaveNewClinic = async () => {

        let res = await userService.createNewClinic(this.state);

        if(res && res.errCode === 0) {
            toast.success('create new clinic success!');
            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
    
            });
        }else {
            toast.error('create new clinic error!');
        }
    }

    
    render() {

      
        return (
            
            <div className="manage-specialty-container container">
                <div className='ms-title'>
                    Quản lý phòng khám
                </div>

                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên phòng khám</label>
                        <input 
                            className='form-control' 
                            type='text'
                            value={this.state.name}
                            onChange={(event) => this.handleOnchangeInput(event, 'name')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh phòng khám</label>
                        <input 
                            className='form-control-file' 
                            type='file'
                            onChange={(event) => this.handleOnChangeImage(event)}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Địa chỉ phòng khám</label>
                        <input 
                            className='form-control' 
                            type='text'
                            value={this.state.address}
                            onChange={(event) => this.handleOnchangeInput(event, 'address')}
                        />
                    </div>
                    <MdEditor 
                        style={{ height: '300px' }} 
                        renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange}
                        value={this.state.descriptionMarkdown}
                    />
                </div>
                <div className='btn-add-new-specialty'>
                    <button
                        onClick={() => this.handleSaveNewClinic()}
                    >
                        Save
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

    export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
