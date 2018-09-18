import React, {Component} from "react";
import {Form, Button, Divider, Message} from 'semantic-ui-react'
import validator from 'validator';

class Register extends Component {

    state = {
        email: '',
        email_error: false,
        password: '',
        password_error: false,
        repeatPassword: '',
        repeatPassword_error: false,
        submitTriggered: true,
        notEqualPasswords: false,
        passwordBlur: false
    }

    componentWillReceiveProps = (props) => {
        if(props.hasToken) {
            this.props.closeModal()
        }
    }

    onEmailChange = (e, data) => {
        this.setState({
            email: data.value,
            email_error: !validator.isEmail(data.value) && this.state.submitTriggered
        })
    }

    onPasswordChange = (e, data) => {
        this.setState({
            [data.name]: data.value,
            [`${data.name}_error`]: data.value === '' && this.state.submitTriggered
        }, () => {
            if (this.state.passwordBlur) {
                this.setState({
                    notEqualPasswords: this.state.password !== this.state.repeatPassword
                })
            }
        })
    }

    validate = (callback) => {
        this.setState({
            submitTriggered: true,
            email_error: !validator.isEmail(this.state.email),
            password_error: this.state.password === '',
            repeatPassword_error: this.state.repeatPassword === '',
            notEqualPasswords: this.state.password !== this.state.repeatPassword
        }, () => {
            if (!this.state.email_error && !this.state.password_error && !this.state.notEqualPasswords) {
                callback()
            }
        })
    }

    onSubmit = () => {
        this.validate(() => this.props.register({
            email:this.state.email,
            password:this.state.password,
            type:'user'
        }))
    }

    render() {

        const { errorMessageRegister } = this.props

        return (
            <Form onSubmit={this.onSubmit}>

                {errorMessageRegister ?
                    <Message fluid negative>
                        <p>{errorMessageRegister}</p>
                    </Message>
                    :
                    null
                }

                <Form.Input name='email' label='Email' type='email' error={this.state.email_error}
                            onChange={this.onEmailChange} value={this.state.email}/>
                {this.state.email_error ?
                    <p className={"field_error"}>
                        Invalid email
                    </p>
                    :
                    null
                }
                <Form.Input name='password' label='Password' type='password' error={this.state.password_error}
                            onChange={this.onPasswordChange} value={this.state.password}
                            onBlur={() => this.setState({passwordBlur: true})}/>
                {this.state.password_error ?
                    <p className={"field_error"}>
                        Invalid password
                    </p>
                    :
                    null
                }
                <Form.Input name='repeatPassword' label='Repeat password' type='password'
                            error={this.state.repeatPassword_error} onChange={this.onPasswordChange}
                            value={this.state.repeatPassword}/>
                {this.state.repeatPassword_error ?
                    <p className={"field_error"}>
                        Invalid repeat password
                    </p>
                    :
                    null
                }
                {this.state.notEqualPasswords ?
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

export default Register;
