import React, {Component} from 'react';
import {Form, Button, Divider, Message} from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import { InputField } from '../formElement/FormElements'
import { validateLogin } from '../formElement/ValidationForms'
import {REGISTER_FORM, RECOVER_PASSWORD_FORM} from "../../constants";


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

        const { errorMessageLogin, handleSubmit, submitting } = this.props


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
                       label={'Email'}
                       placeholder='Email'/>

                <Field name='password' component={InputField}
                       type='password'
                       label={'Password'}
                       placeholder='Password'/>

                <div className="link-below">
                    <a href={"javascript:void(0)"} onClick={()  => {
                        this.props.setAuthForms(RECOVER_PASSWORD_FORM)
                    }}>Forgot password?</a>
                </div>


                <br/>
                <Button type={"submit"} primary fluid disabled={submitting}>
                    Login
                </Button>

                <Divider horizontal>Or</Divider>

                <Button secondary fluid onClick={() => {
                    this.props.setAuthForms(REGISTER_FORM)
                }}>
                    Register Now
                </Button>
                <style jsx>{`

                  .field_error {
                    color: red;
                    margin-top: -10px !important;
                  }

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
})(Login);
