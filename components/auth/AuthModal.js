import React, {Component} from "react";
import { Modal} from 'semantic-ui-react'
import Auth from "./Auth";

class AuthModal extends Component {


    render() {

        return (
            <Modal size={'mini'} className={"modal-size"} open={this.props.open} style={{zIndex: '9999999'}} onClose={this.props.onClose}>
                <Modal.Content>
                    <Modal.Description>
                        <Auth/>
                    </Modal.Description>
                </Modal.Content>

            </Modal>
        )
    }

}


export default AuthModal;
