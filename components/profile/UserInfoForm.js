import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Form, Button, Message, Checkbox} from 'semantic-ui-react'
import {Field, reduxForm} from 'redux-form'
import {toggleConfirmationModal} from "../../actions/userAction";
import {validateProfile} from "../formElement/ValidationForms";
import {InputField, Toggle} from "../formElement/FormElements";

class UserInfoForm extends Component {

    submit = values => {
        console.log(values)
        //this.props.saveUserInfo({email: values.email, username:values.username})
        this.props.onSaveUserInfo()

    }


    render() {

        const {updateUserInfoSuccess, updateUserInfoError, handleSubmit} = this.props


        return (
            <Form onSubmit={handleSubmit(this.submit)}>

                {updateUserInfoSuccess ?
                    <Message fluid positive>
                        <p>Informacion actualizada</p>
                    </Message>
                    :
                    null
                }

                {updateUserInfoError ?
                    <Message fluid negative>
                        <p>{updateUserInfoError}</p>
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

                <Field name='notifications' component={Toggle}
                       label={'Notificaciones'}/>


                <Button type={"submit"} basic color="blue" fluid>
                    Actualizar
                </Button>

            </Form>
        )


    }


}

const mapStateToProps = (state, ownProps) => {
    return {
        initialValues: {
            email: ownProps.email,
            username: ownProps.username,
            notifications: ownProps.notifications
        },
        updateUserInfoSuccess: state.user.updateUserInfoSuccess,
        updateUserInfoError: state.user.updateUserInfoError
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'userInfoForm',
    validate: validateProfile
})(UserInfoForm));
