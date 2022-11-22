import React, { Component } from 'react';
import * as actions from "../../store/actions";
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import Select from 'react-select';
import { dateFormat, LANGUAGES } from '../../utils/constant';


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: null,
            description: '',
            listDoctors: []
        }
    }
    
    componentDidMount() {
        this.props.fetchAllDoctors();
    }
    
    componentDidUpdate(prev) {
        if(prev.allDoctors !== this.props.allDoctors){
            this.setState({
                listDoctors: this.props.allDoctors
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

        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value
        })
        // console.log(this.state)
    }

    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor });
        console.log(selectedDoctor)
      };
    
    
    handleOnChangeDesc = (e) => {
        this.setState({
            description: e.target.value
        })
      }

    buildDataInputSelect = (inputData) => {
        let result = [];

        let {language} = this.props

        if(inputData && inputData.length > 0) {
             inputData.map((item, index) => {

                let Object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                Object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                Object.value = item.id;
                result.push(Object)
            })
        }


        return result;
    }

    render() {

        const { selectedDoctor, listDoctors } = this.state;
        const options = this.buildDataInputSelect(listDoctors)
        return (
            
            <div className='manage-doctor-container container'>

                <div className='manage-doctor-title'>Tạo thêm thông tin bác sĩ</div>
                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={selectedDoctor}
                            onChange={this.handleChange}
                            options={options}
                            placeholder='Select the doctor here'
                        />
                    </div>
                    <div className='content-right form-group'>
                        <label>Thông tin giới thiệu:</label>
                        <textarea 
                            className='form-control' 
                            rows='4'
                            onChange={(e) => this.handleOnChangeDesc(e)}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor 
                        style={{ height: '500px' }} 
                        renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange} 
                    />
                </div>
                <div>
                    <button
                        onClick={this.handleSaveContentMarkDown} 
                        className='save-content-doctor'
                    >
                        Lưu thông tin
                    </button>
                </div>
            </div>
            
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors : () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

    export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
