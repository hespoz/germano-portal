import React, {Component} from 'react';
import {Form, Button, Divider, Message} from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import { InputField } from '../formElement/FormElements'
import { validateLogin } from '../formElement/ValidationForms'
import {LOGIN_FORM} from "../../constants"

class ForgotPassword extends Component {

    componentWillReceiveProps = (props) => {
        if(props.hasToken) {
            this.props.closeModal()
        }
    }


    submit = values => {
        this.props.onRecoverPassword(values)
    }

    render() {

        const { recoverPasswordSuccess, errorMessageRecoveryPassword, handleSubmit, submitting } = this.props


        return (
            <Form onSubmit={handleSubmit(this.submit)}>

                {recoverPasswordSuccess ?
                    <Message fluid positive>
                        <p>Email enviado</p>
                    </Message>
                    :
                    null
                }

                {errorMessageRecoveryPassword ?
                    <Message fluid negative>
                        <p>{errorMessageRecoveryPassword}</p>
                    </Message>
                    :
                    null
                }

                <Field name='email' component={InputField}
                       label={'Email'}
                       placeholder='Email'/>

                <Button type={"submit"} primary fluid disabled={submitting}>
                    Recuperar password
                </Button>

                <Divider horizontal>Or</Divider>

                <Button secondary fluid onClick={() => {
                    this.props.setAuthForms(LOGIN_FORM)
                }}>
                    Ir a login
                </Button>
                <style jsx>{`

                  .field_error {
                    color: red;
                    margin-top: -10px !important;
                  }

                `}</style>
            </Form>

        )
    }

}

export default reduxForm({
    form: 'forgotPasswordForm',
    validate: validateLogin
})(ForgotPassword);
