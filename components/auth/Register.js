import React, {Component} from "react";
import {connect} from 'react-redux'
import {Form, Button, Divider, Message} from 'semantic-ui-react'
import {Field, reduxForm, formValueSelector} from 'redux-form'
import {InputField} from '../formElement/FormElements'
import {validateRegister} from '../formElement/ValidationForms'
import {LOGIN_FORM} from "../../constants"
import {translate} from "react-i18next"


class Register extends Component {

    componentWillReceiveProps = (props) => {
        if (props.hasToken) {
            this.props.closeModal()
        }
    }

    submit = values => {
        this.props.register({
            email: values.email,
            password: values.password,
            username: values.username,
            type: 'user'
        })
    }

    render() {

        const {errorMessageRegister, handleSubmit, password, repeatPassword, t} = this.props

        return (
            <Form onSubmit={handleSubmit(this.submit)}>

                {errorMessageRegister ?
                    <Message fluid negative>
                        <p>{errorMessageRegister}</p>
                    </Message>
                    :
                    null
                }

                <Field name='email' component={InputField}
                       label={t("email")}
                       placeholder={t("email")}/>

                <Field name='username' component={InputField}
                       label={t("username")}
                       placeholder={t("username")}/>

                <Field name='password' component={InputField}
                       type='password'
                       label={t("password")}
                       placeholder={t("password")}/>

                <Field name='repeatPassword' component={InputField}
                       type='password'
                       label={t("repeat.password")}
                       placeholder={t("repeat.password")}/>


                {password !== repeatPassword ?
                    <p className={"error"}>
                        {t("repeat.password.error")}
                    </p>
                    :
                    null
                }

                <Button primary fluid type={"submit"}>
                    {t("register")}
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


export default connect(
    state => ({
        password: formValueSelector("registerForm")(state, 'password'),
        repeatPassword: formValueSelector("registerForm")(state, 'repeatPassword')
    })
)(reduxForm({
    form: 'registerForm',
    validate: validateRegister
})(translate("translations")(Register)));


