import React, {Component} from "react";
import { Modal, Button } from 'semantic-ui-react'
import Login from './Login';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';

import {
    toggleAuthForms,
    register,
    login,
    closeAuthModal
} from '../../actions/authAction'
import Register from "./Register";



class AuthModal extends Component {

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

        return (
            <Modal size={'mini'} className={"modal-size"} open={this.props.open} style={{zIndex: '9999999'}} onClose={this.props.onClose}>
                <Modal.Content>
                    <Modal.Description>
                        {showLogin ?
                            <Login onLogin={this.onLogin} errorMessageLogin={errorMessageLogin}  hasToken={hasToken} closeModal={this.props.closeAuthModal} toggleAuthForms={this.toggleAuthForms}/>
                        :
                            <Register register={this.onRegister} errorMessageRegister={errorMessageRegister} hasToken={hasToken} closeModal={this.props.closeAuthModal} toggleAuthForms={this.toggleAuthForms}/>
                        }
                    </Modal.Description>
                </Modal.Content>

            </Modal>
        )
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


export default connect(mapStateToProps, mapDispatchToProps)(AuthModal);
