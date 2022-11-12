import React, { Component } from 'react';
import { connect } from 'react-redux';


class HomeFooter extends Component {

    

    render() {
        

        return (
            <div className='wrapper bg-gray footer'>
                <div className='container'>
                    <p>&copy;<a href='https://www.youtube.com/' target='_blank' rel="noreferrer">youtube</a></p>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
