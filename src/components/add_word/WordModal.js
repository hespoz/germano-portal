import React, {Component} from "react";
import { Modal } from 'semantic-ui-react'

import NewWordForm from './WordForm';

class WordModal extends Component {

    render() {

        return (
            <Modal size={'tiny'} open={this.props.open} style={{zIndex: '9999999'}} onClose={this.props.onClose}>
                <Modal.Header>Add new word</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <NewWordForm/>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }

}


export default WordModal;