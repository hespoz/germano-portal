import React, {Component} from 'react'
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import { Modal, Form, Button, Message } from 'semantic-ui-react'
import {confirmLogin} from "../../actions/userAction";

class ConfirmationLoginModal extends Component {

    state = {
        password:'',
        triggered:false
    }

    componentWillReceiveProps = (props) => {
        if (this.state.triggered && props.operationAllowed) {
            this.props.action(this.state.password)
            this.setState({
                password:'',
                triggered:false
            })
            this.props.onClose()
        }
    }

    onSubmit = () => {
        this.props.confirmLogin({email:this.props.email, password: this.state.password})
        this.setState({triggered:true})
    }

    render() {

        const {confirmLoginError} = this.props

        return  <Modal size={'mini'} className={"modal-size"} open={this.props.open} style={{zIndex: '9999999'}} onClose={this.props.onClose}>
            <Modal.Content>
                <Modal.Description>
                    {confirmLoginError ?
                        <Message fluid negative>
                            <p>{confirmLoginError}</p>
                        </Message>
                        :
                        null
                    }

                    <Form onSubmit={this.onSubmit}>
                        <Form.Input label='Password' type='password' onChange={(e, {value})  => this.setState({password: value})} value={this.state.value} />
                        <Button basic fluid color="blue" type='submit'>Login</Button>
                    </Form>
                </Modal.Description>
            </Modal.Content>

        </Modal>
    }

}

const mapStateToProps = (state) => ({
    email:state.auth.email,
    operationAllowed: state.user.operationAllowed,
    confirmLoginError: state.user.confirmLoginError
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    confirmLogin
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationLoginModal);

