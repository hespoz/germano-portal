import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Message} from 'semantic-ui-react'
import {formValueSelector, reduxForm} from 'redux-form'
import {validateResetPassword} from '../formElement/ValidationForms'
import {resetPassword, changePassword} from "../../actions/authAction"
import ConfirmationLoginModal from "./ConfirmationLogin";
import PasswordForm from "./PasswordForm";

class ResetPasswordForm extends Component {

    state = {
        params: {},
        openConfirmationModal: false
    }

    onSubmit = params => {
            this.props.resetPassword({recoveryToken: this.props.recoveryToken, password:params.password})

    }

    render() {

        const {openConfirmationModal} = this.state
        const {resetPasswordSuccess, errorMessageResetPassword} = this.props

        if(resetPasswordSuccess){
            return <Message fluid positive>
                <p>Tu password fue reseteado por favor logeate</p>
            </Message>
        }

        return (<div>

                <ConfirmationLoginModal
                    open={openConfirmationModal}
                    action={this.action}
                    onClose={this.onClose}/>

                {errorMessageResetPassword ?
                    <Message fluid negative>
                        <p>{errorMessageResetPassword}</p>
                    </Message>
                    :
                    null
                }

                <PasswordForm onSubmit={this.onSubmit}/>

            </div>
        )
    }

}


const mapStateToProps = (state) => ({
    password: formValueSelector("resetPasswordForm")(state, 'password'),
    repeatPassword: formValueSelector("resetPasswordForm")(state, 'repeatPassword'),
    resetPasswordSuccess: state.auth.resetPasswordSuccess,
    errorMessageResetPassword: state.auth.errorMessageResetPassword,
    operationAllowed: state.user.operationAllowed
});

const mapDispatchToProps = (dispatch) => bindActionCreators({resetPassword, changePassword}, dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(reduxForm({
    form: 'resetPasswordForm',
    validate: validateResetPassword
})(ResetPasswordForm));
