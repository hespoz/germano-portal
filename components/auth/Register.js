import React, {Component} from "react";
import {connect} from 'react-redux'
import {Form, Button, Divider, Message} from 'semantic-ui-react'
import {Field, reduxForm, formValueSelector} from 'redux-form'
import {InputField} from '../formElement/FormElements'
import {validateRegister} from '../formElement/ValidationForms'


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

        const {errorMessageRegister, handleSubmit, password, repeatPassword} = this.props

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
                       label={'Email'}
                       placeholder='Email'/>

                <Field name='username' component={InputField}
                       label={'Nombre de usuario'}
                       placeholder='Username'/>

                <Field name='password' component={InputField}
                       type='password'
                       label={'Password'}
                       placeholder='Password'/>

                <Field name='repeatPassword' component={InputField}
                       type='password'
                       label={'Repite tu password'}
                       placeholder='Repeat password'/>


                {password !== repeatPassword ?
                    <p className={"field_error"}>
                        Passwords should be the same
                    </p>
                    :
                    null
                }

                <Button primary fluid type={"submit"}>
                    Register
                </Button>

                <Divider horizontal>Or</Divider>

                <Button secondary fluid onClick={() => {
                    this.props.toggleAuthForms()
                }}>
                    Back to login
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


export default connect(
    state => ({
        password: formValueSelector("registerForm")(state, 'password'),
        repeatPassword: formValueSelector("registerForm")(state, 'repeatPassword')
    })
)(reduxForm({
    form: 'registerForm',
    validate: validateRegister
})(Register));


