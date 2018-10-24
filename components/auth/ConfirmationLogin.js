import React, {Component} from 'react'
import { Modal} from 'semantic-ui-react'

class ConfirmationLoginModal extends Component {


    render() {
        return  <Modal size={'mini'} className={"modal-size"} open={this.props.open} style={{zIndex: '9999999'}} onClose={this.props.onClose}>
            <Modal.Content>
                <Modal.Description>
                <h1>login confirm</h1>
                </Modal.Description>
            </Modal.Content>

        </Modal>
    }

}

export default ConfirmationLoginModal
