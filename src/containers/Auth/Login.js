import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { userService } from '../../services';



class Login extends Component {
    constructor(props) {
        super(props);
            this.state = {
                userName: '',
                password: '',
                isShowPassword: false,
                errorMessage: '',
            }
    }

    handleOnChangeInput = (e) => {
        this.setState({
            userName: e.target.value
        })
    }

    handleOnChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleLogin = async () => {
        
        this.setState({
            errorMessage: ''
        })

        try {
            let data = await userService.handleLoginAPI(this.state.userName, this.state.password);
            if(data && data.errCode !== 0){
                this.setState({
                    errorMessage: data.message
                })
            }else {
                this.props.userLoginSuccess(data.user);
                console.log('login success');
            }
            console.log(data)
        } catch (error) {
            if (error.response) {
                if(error.response.data){
                    this.setState({
                        errorMessage: error.response.data?.message
                    })
                }
        
            }
        }
    }

    TooglePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group'>
                            <label htmlFor='username'>User Name:</label>
                            <input 
                                type='text' 
                                id='username' 
                                name='username' 
                                className='form-control'
                                placeholder='Enter your username'
                                value={this.state.userName}
                                onChange={(e) => this.handleOnChangeInput(e)}
                            />
                        </div>
                        <div className='col-12 form-group'>
                            <label htmlFor='password'>Password:</label>
                            <div className='custom-input-password'>
                                <input 
                                    className='form-control'
                                    type={this.state.isShowPassword ? 'text' : 'password'} 
                                    id='password' 
                                    name='password' 
                                    placeholder='Enter your password'
                                    value={this.state.password}
                                    onChange={(e) => this.handleOnChangePassword(e)}
                                />
                                <span onClick={() => this.TooglePassword()}>
                                    <i className="far fa-eye" hidden={!this.state.isShowPassword}></i>
                                    <i className="far fa-eye-slash" hidden={this.state.isShowPassword}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12 text-danger'>{this.state.errorMessage}</div>
                        <div className='col-12 btn-login'>
                            <button onClick={() => this.handleLogin()}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password mt-2'>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center mt-2'>
                            <span>Or Login With</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )

       
    }
}

// const Login = () => {

//     const [userName, setUserName] = useState('');
//     const [password, setPassword] = useState('');
//     const [isShowPassword, setIsShowPassword] = useState(false);

//     const handleOnChangeInput = (e) => {
//         setUserName(e.target.value);
//     }


//     const handleOnChangePassword = (e) => {
//         setPassword(e.target.value)
//     }

//     const handleLogin = async () => {
//         console.log('userName: ', userName);
//         console.log('password: ', password);

//         await userService.handleLogin(userName, password);
//     }

//     const TooglePassword = () => {
//         setIsShowPassword(!isShowPassword)
//     }

//     return (
//         <div className='login-background'>
//             <div className='login-container'>
//                 <div className='login-content row'>
//                     <div className='col-12 text-login'>Login</div>
//                     <div className='col-12 form-group'>
//                         <label htmlFor='username'>User Name:</label>
//                         <input 
//                             type='text' 
//                             id='username' 
//                             name='username' 
//                             className='form-control'
//                             placeholder='Enter your username'
//                             value={userName}
//                             onChange={(e) => handleOnChangeInput(e)}
//                         />
//                     </div>
//                     <div className='col-12 form-group'>
//                         <label htmlFor='password'>Password:</label>
//                         <div className='custom-input-password'>
//                             <input 
//                                 className='form-control'
//                                 type={isShowPassword ? 'text' : 'password'} 
//                                 id='password' 
//                                 name='password' 
//                                 placeholder='Enter your password'
//                                 value={password}
//                                 onChange={(e) => handleOnChangePassword(e)}
//                             />
//                             <span onClick={() => TooglePassword()}>
//                                 <i className="far fa-eye" hidden={!isShowPassword}></i>
//                                 <i className="far fa-eye-slash" hidden={isShowPassword}></i>
//                             </span>
//                         </div>
                        
//                     </div>
//                     <div className='col-12 btn-login'>
//                         <button onClick={() => handleLogin()}>Login</button>
//                     </div>
//                     <div className='col-12'>
//                         <span className='forgot-password mt-2'>Forgot your password?</span>
//                     </div>
//                     <div className='col-12 text-center mt-2'>
//                         <span>Or Login With</span>
//                     </div>
//                     <div className='col-12 social-login'>
//                         <i className="fab fa-google-plus-g google"></i>
//                         <i className="fab fa-facebook-f facebook"></i>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
// export default Login
