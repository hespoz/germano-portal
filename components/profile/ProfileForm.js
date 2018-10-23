import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Form, Button, Message} from 'semantic-ui-react'
import {Field, formValueSelector, reduxForm} from 'redux-form'
import { InputField } from '../formElement/FormElements'
import {validateProfile} from '../formElement/ValidationForms'
import {resetPassword} from "../../actions/authAction"

class ProfileForm extends Component {

    
    submit = values => {
        this.props.resetPassword({recoveryToken: this.props.recoveryToken, password:values.password})
    }

    render() {

        const {resetPasswordSuccess, errorMessageResetPassword, handleSubmit, password, repeatPassword} = this.props

        if(resetPasswordSuccess){
            return <Message fluid positive>
                <p>Tu perfil fue actualizado</p>
            </Message>
        }

        return (
            <Form onSubmit={handleSubmit(this.submit)}>

                {errorMessageResetPassword ?
                    <Message fluid negative>
                        <p>{errorMessageResetPassword}</p>
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


                <Button type={"submit"} primary fluid>
                    Actualizar
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
    repeatPassword: formValueSelector("resetPasswordForm")(state, 'repeatPassword'),
    resetPasswordSuccess: state.auth.resetPasswordSuccess,
    errorMessageResetPassword: state.auth.errorMessageResetPassword
});

const mapDispatchToProps = (dispatch) => bindActionCreators({resetPassword}, dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(reduxForm({
    form: 'profileForm',
    validate: validateProfile
})(ProfileForm));
