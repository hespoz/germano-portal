import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Form, Button, Message} from 'semantic-ui-react'
import {Field, reduxForm} from 'redux-form'
import {validateProfile} from "../formElement/ValidationForms";
import {InputField, Toggle} from "../formElement/FormElements";
import ConfirmationLoginModal from "../auth/ConfirmationLogin";
import {saveUserInfo} from  "../../actions/userAction"

class UserInfoForm extends Component {

    state = {
        params: {},
        openConfirmationModal: false
    }

    submit = params => {
        if (this.props.operationAllowed) {
            this.setState({params}, ()=> this.action())
        } else {
            this.setState({params, openConfirmationModal:true})
        }
    }

    onClose = () => this.setState({openConfirmationModal:false})

    action = () => {
        this.props.saveUserInfo(this.state.params)
    }

    render() {

        const {openConfirmationModal} = this.state
        const {updateUserInfoSuccess, updateUserInfoError, handleSubmit} = this.props


        return (
            <div>

                <ConfirmationLoginModal
                    open={openConfirmationModal}
                    action={this.action}
                    onClose={this.onClose}/>

                <Form onSubmit={handleSubmit(this.submit)}>

                    {updateUserInfoSuccess ?
                        <Message fluid positive>
                            <p>{updateUserInfoSuccess}</p>
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
            </div>
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
        operationAllowed: state.user.operationAllowed,
        updateUserInfoSuccess: state.user.updateUserInfoSuccess,
        updateUserInfoError: state.user.updateUserInfoError
    }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({saveUserInfo}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'userInfoForm',
    validate: validateProfile
})(UserInfoForm));
