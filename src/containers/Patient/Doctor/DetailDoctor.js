import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import userService from '../../../services/userService';
import './DetailDoctor.scss';
import { LANGUAGES } from '../../../utils/constant';




class DetailDoctor extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {}
        }
    }
    
    
    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id) {
            const id = this.props.match.params.id;

            const res = await userService.getDetailInfoDoctor(id);
            if(res && res.errCode === 0){
                this.setState({
                    detailDoctor: res.data
                })
            }
            
        }
    }

    componentDidUpdate() {

    }

   

    render() {

        let {detailDoctor} = this.state;

        console.log(detailDoctor);

        let {language} = this.props
        let nameVi = ''; 
        let nameEn = '';

        if(detailDoctor && detailDoctor.positionData){
            nameVi = `${detailDoctor.positionData.valueVi}  ${detailDoctor.lastName} ${detailDoctor.firstName}`
            nameEn = `${detailDoctor.positionData.valueEn} ${detailDoctor.firstName} ${detailDoctor.lastName}`
        }

        return (
            <>
                <HomeHeader isShowBanner={false}/>
                <div className='doctor-detail-container'>
                    <div className='intro-doctor container'>
                        <div 
                            className='content-left avatar'
                            style={{backgroundImage: `url(${detailDoctor.image})`}}
                        >

                        </div>
                        <div className='content-right'>
                            <h2 className='up'>
                                <strong>
                                    {language === LANGUAGES.VI ? nameVi : nameEn}
                                </strong>
                            </h2>
                            <div className='down'>
                                {
                                    detailDoctor.Markdown && detailDoctor.Markdown.description && 
                                    <span>{detailDoctor.Markdown.description}</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='schedule-doctor'>

                    </div>
                    <div className='detail-info-doctor'>
                        <div className='container'>
                            {
                                detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
                                <div dangerouslySetInnerHTML={{__html: detailDoctor.Markdown.contentHTML}}></div>
                            }
                        </div>
                    </div>
                    <div className='comment-doctor'>

                    </div>
                </div>
            </>
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

    export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
