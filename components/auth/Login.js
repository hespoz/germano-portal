import React, {Component} from 'react';
import {Form, Button, Divider, Message, Table} from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import { InputField } from '../formElement/FormElements'
import { validateLogin } from '../formElement/ValidationForms'


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

                <Button type={"submit"} primary fluid disabled={submitting}>
                    Login
                </Button>

                <Divider horizontal>Or</Divider>

                <Button secondary fluid onClick={() => {
                    this.props.toggleAuthForms()
                }}>
                    Register Now
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
    form: 'loginForm',
    validate: validateLogin
})(Login);
