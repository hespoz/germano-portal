import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Form, Button, Message} from 'semantic-ui-react'
import {Field, formValueSelector, reduxForm} from 'redux-form'
import { InputField } from '../formElement/FormElements'
import {validateResetPassword} from '../formElement/ValidationForms'
import {resetPassword, changePassword} from "../../actions/authAction"

class PasswordForm extends Component {

    submit = params => {
        this.props.onSubmit(params)
    }

    render() {

        const {handleSubmit, password, repeatPassword} = this.props

        return (

                <Form onSubmit={handleSubmit(this.submit)}>

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
                            Passwords tiene que ser igual
                        </p>
                        :
                        null
                    }

                    <Button type={"submit"} color={"blue"} primary fluid>
                        Reset password
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


const mapStateToProps = (state) => ({
    password: formValueSelector("resetPasswordForm")(state, 'password'),
    repeatPassword: formValueSelector("resetPasswordForm")(state, 'repeatPassword')
});

const mapDispatchToProps = (dispatch) => bindActionCreators({resetPassword, changePassword}, dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(reduxForm({
    form: 'resetPasswordForm',
    validate: validateResetPassword
})(PasswordForm));
