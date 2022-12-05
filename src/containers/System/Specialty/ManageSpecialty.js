import React, { Component} from 'react';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css'
import {CommonUtils} from "../../../utils";
import userService from '../../../services/userService';

import './ManageSpecialty.scss';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
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

    handleSaveNewSpecialty = async () => {

        let res = await userService.createNewSpecialty(this.state);

        if(res && res.errCode === 0) {
            toast.success('create new specialty success!');
        }else {
            toast.error('create new specialty error!');
        }
    }

    render() {

        return (
            <div className="manage-specialty-container container">
                <div className='ms-title'>
                    Quản lý chuyên khoa
                </div>

                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên chuyên khoa</label>
                        <input 
                            className='form-control' 
                            type='text'
                            value={this.state.name}
                            onChange={(event) => this.handleOnchangeInput(event, 'name')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>ảnh chuyên khoa</label>
                        <input 
                            className='form-control-file' 
                            type='file'
                            onChange={(event)=> this.handleOnChangeImage(event)}
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
                        onClick={() => this.handleSaveNewSpecialty()}
                    >
                        Save
                    </button>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);