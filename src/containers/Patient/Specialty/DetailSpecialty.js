import React, { Component} from 'react';
import { connect } from 'react-redux';



import './DetailSpecialty.scss';
import { toast } from 'react-toastify';
import Header from '../../Header/Header';



class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
           

        }
    }

    componentDidMount() {
       
    }

 
    render() {

        return (
            <div>
                <Header />
                DetailSpecialty
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);