import React, {Component} from "react";
import {Form, Button, Divider, Message} from 'semantic-ui-react'
import validator from 'validator';

class Login extends Component {

    state = {
        email:'',
        email_error:false,
        password:'',
        password_error:false,
        submitTriggered:true
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
        })
    }


    validate = (callback) => {
        this.setState({
            submitTriggered: true,
            email_error: !validator.isEmail(this.state.email),
            password_error: this.state.password === ''
        }, () => {
            if (!this.state.email_error && !this.state.password_error) {
                callback()
            }
        })
    }


    onSubmit = () => {
        this.validate(() => this.props.onLogin({
            email:this.state.email,
            password:this.state.password
        }))
    }

    render() {

        const { errorMessageLogin } = this.props

        return (
            <Form onSubmit={this.onSubmit}>

                {errorMessageLogin ?
                    <Message fluid negative>
                        <p>{errorMessageLogin}</p>
                    </Message>
                    :
                    null
                }


                <Form.Input name='email' label='Email' type='email' error={this.state.email_error} onChange={this.onEmailChange}/>
                {this.state.email_error  ?
                    <p className={"field_error"}>Invalid email</p>
                    :
                    null
                }
                <Form.Input name='password' label='Password' type='password' error={this.state.password_error} onChange={this.onPasswordChange}/>
                {this.state.password_error  ?
                    <p className={"field_error"}>Invalid password</p>
                    :
                    null
                }
                <Button type={"submit"} primary fluid>
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

export default Login;
