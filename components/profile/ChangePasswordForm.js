import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Message} from 'semantic-ui-react'
import {changePassword} from "../../actions/authAction"
import ConfirmationLoginModal from "../../components/auth/ConfirmationLogin";
import PasswordForm from "../auth/PasswordForm";

class ChangePasswordForm extends Component {

    state = {
        params: {},
        openConfirmationModal: false
    }

    onSubmit = params => {
        console.log("buda", params)
        if (this.props.operationAllowed) {
            this.setState({params}, ()=> this.action())
        } else {
            this.setState({params, openConfirmationModal:true})
        }
    }

    onClose = () => this.setState({openConfirmationModal:false})

    action = (currentPassword) => {
        this.props.changePassword({
            currentPassword,
            password:this.state.params.password
        })
    }

    render() {

        const {openConfirmationModal} = this.state
        const {resetPasswordSuccess, errorMessageResetPassword} = this.props

        return (<div>

                <ConfirmationLoginModal
                    open={openConfirmationModal}
                    action={this.action}
                    onClose={this.onClose}/>

                {resetPasswordSuccess ?
                    <Message fluid positive>
                        <p>El password fue actualizado</p>
                    </Message>
                    :
                    null
                }


                {errorMessageResetPassword ?
                    <Message fluid negative>
                        <p>{errorMessageResetPassword}</p>
                    </Message>
                    :
                    null
                }

                <PasswordForm onSubmit={this.onSubmit}/>

            </div>
        )
    }

}


const mapStateToProps = (state) => ({
    resetPasswordSuccess: state.auth.resetPasswordSuccess,
    errorMessageResetPassword: state.auth.errorMessageResetPassword,
    operationAllowed: state.user.operationAllowed
});

const mapDispatchToProps = (dispatch) => bindActionCreators({changePassword}, dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(ChangePasswordForm);
