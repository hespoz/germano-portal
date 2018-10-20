import React, {Component} from "react"
import { Modal, Button } from 'semantic-ui-react'
import Login from './Login'
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'

import {
    toggleAuthForms,
    register,
    login,
    closeAuthModal
} from '../../actions/authAction'

import Register from "./Register"



class Auth extends Component {

    toggleAuthForms = () => {
        this.props.toggleAuthForms()
    }

    onLogin = (data) => {
        this.props.login(data)
    }

    onRegister = (data) => {
        this.props.register(data)
    }

    render() {

        const { showLogin, errorMessageRegister, hasToken, errorMessageLogin } = this.props

        if (showLogin) {
            return <Login onLogin={this.onLogin} errorMessageLogin={errorMessageLogin}  hasToken={hasToken} closeModal={this.props.closeAuthModal} toggleAuthForms={this.toggleAuthForms}/>
        } else {
            return <Register register={this.onRegister} errorMessageRegister={errorMessageRegister} hasToken={hasToken} closeModal={this.props.closeAuthModal} toggleAuthForms={this.toggleAuthForms}/>
        }

    }

}


const mapStateToProps = (state) => ({
    showLogin: state.auth.showLogin,
    errorMessageRegister: state.auth.errorMessageRegister,
    hasToken: state.auth.hasToken,
    errorMessageLogin: state.auth.errorMessageLogin
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    toggleAuthForms,
    register,
    login,
    closeAuthModal
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Auth);
