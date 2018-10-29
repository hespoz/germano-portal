import React, {Component} from 'react';
import {Form, Button, Divider, Message} from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import { InputField } from '../formElement/FormElements'
import { validateLogin } from '../formElement/ValidationForms'
import {REGISTER_FORM, RECOVER_PASSWORD_FORM} from "../../constants";
import {translate} from "react-i18next";


class Login extends Component {

    componentWillReceiveProps = (props) => {
        if(props.hasToken) {
            this.props.closeModal()
        }
    }


    submit = values => {
        this.props.onLogin(values)
    }

    render() {

        const { errorMessageLogin, handleSubmit, submitting, t } = this.props


        return (
            <Form onSubmit={handleSubmit(this.submit)}>

                {errorMessageLogin ?
                    <Message fluid negative>
                        <p>{errorMessageLogin}</p>
                    </Message>
                    :
                    null
                }

                <Field name='email' component={InputField}
                       label={t("email")}
                       placeholder={t("email")}/>

                <Field name='password' component={InputField}
                       type='password'
                       label={t("password")}
                       placeholder={t("password")}/>

                <div className="link-below">
                    <a href={"javascript:void(0)"} onClick={()  => {
                        this.props.setAuthForms(RECOVER_PASSWORD_FORM)
                    }}>{t("forgot.password")}</a>
                </div>


                <br/>
                <Button type={"submit"} primary fluid disabled={submitting}>
                    {t("login")}
                </Button>

                <Divider horizontal>Or</Divider>

                <Button secondary fluid onClick={() => {
                    this.props.setAuthForms(REGISTER_FORM)
                }}>
                    {t("register")}
                </Button>
                <style jsx>{`

                  .link-below {
                    display:flex;
                    margin-top:-14px;
                  }

                  .link-below a {
                    margin-left: auto;
                  }

                `}</style>
            </Form>

        )
    }

}

export default reduxForm({
    form: 'loginForm',
    validate: validateLogin
})(translate("translations")(Login));
