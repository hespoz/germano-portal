import React, {Component} from 'react';
import {Form, Button, Divider, Message} from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import { InputField } from '../formElement/FormElements'
import { validateLogin } from '../formElement/ValidationForms'
import {LOGIN_FORM} from "../../constants"
import {translate} from "react-i18next"

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

        const { recoverPasswordSuccess, errorMessageRecoveryPassword, handleSubmit, submitting, t } = this.props


        return (
            <Form onSubmit={handleSubmit(this.submit)}>

                {recoverPasswordSuccess ?
                    <Message fluid positive>
                        <p>{t("email.sent.recover.password")}</p>
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
                       label={t("email")}
                       placeholder={t("email")}/>

                <Button type={"submit"} primary fluid disabled={submitting}>
                    {t("recover.password")}
                </Button>

                <Divider horizontal>Or</Divider>

                <Button secondary fluid onClick={() => {
                    this.props.setAuthForms(LOGIN_FORM)
                }}>
                    {t("go.to.login")}
                </Button>

            </Form>

        )
    }

}

export default reduxForm({
    form: 'forgotPasswordForm',
    validate: validateLogin
})(translate("translations")(ForgotPassword));
