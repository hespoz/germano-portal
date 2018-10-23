import React, {Component} from "react"

import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import {LOGIN_FORM, REGISTER_FORM, RECOVER_PASSWORD_FORM} from "../../constants"

import {
    setAuthForms,
    register,
    login,
    closeAuthModal,
    recoverPassword
} from '../../actions/authAction'

import Login from './Login'
import Register from "./Register"
import ForgotPassword from './ForgotPassword'



class Auth extends Component {


    onLogin = (data) => {
        this.props.login(data)
    }

    onRegister = (data) => {
        this.props.register(data)
    }

    onRecoverPassword = (data) => {
        this.props.recoverPassword(data.email)
    }

    render() {

        const { errorMessageRegister, hasToken, errorMessageLogin, recoverPasswordSuccess, errorMessageRecoveryPassword, authForm } = this.props

        const LoginComponent = <Login onLogin={this.onLogin} errorMessageLogin={errorMessageLogin}  hasToken={hasToken} closeModal={this.props.closeAuthModal} setAuthForms={this.props.setAuthForms}/>
        switch(authForm) {
            case  LOGIN_FORM:
                return LoginComponent
            case REGISTER_FORM:
                return <Register register={this.onRegister} errorMessageRegister={errorMessageRegister} hasToken={hasToken} closeModal={this.props.closeAuthModal} setAuthForms={this.props.setAuthForms}/>
            case RECOVER_PASSWORD_FORM:
                return <ForgotPassword
                    onRecoverPassword={this.onRecoverPassword}
                    recoverPasswordSuccess={recoverPasswordSuccess}
                    errorMessageRecoveryPassword={errorMessageRecoveryPassword}
                    hasToken={hasToken}
                    closeModal={this.props.closeAuthModal} setAuthForms={this.props.setAuthForms}/>
            default:
                return LoginComponent
        }


    }

}


const mapStateToProps = (state) => ({
    authForm: state.auth.authForm,
    errorMessageRegister: state.auth.errorMessageRegister,
    hasToken: state.auth.hasToken,
    errorMessageLogin: state.auth.errorMessageLogin,
    recoverPasswordSuccess: state.auth.recoverPasswordSuccess,
    errorMessageRecoveryPassword: state.auth.errorMessageRecoveryPassword
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setAuthForms,
    register,
    login,
    recoverPassword,
    closeAuthModal
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Auth);
