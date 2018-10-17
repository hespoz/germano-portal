import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import {Modal, Button} from 'semantic-ui-react'
import {closeDeleteSentenceModal, saveBucket} from '../../actions/bucketAction'
import {findIndex} from 'lodash'

class DeleteSentence extends Component {

    onDeleteSentence = () => {
        let sentences = this.props.bucket.sentences
        const index = findIndex(sentences, (s) => s._id === this.props.sentenceIdForDelete)
        if(index !== -1){
            sentences.splice(index, 1)
            this.props.saveBucket({
                _id: this.props.bucket._id,
                sentences
            })
        }
    }

    render() {
        return <Modal size={'tiny'} open={this.props.openDeleteSentenceModal} style={{zIndex: '9999999'}}
                      onClose={this.props.closeDeleteSentenceModal}>
            <Modal.Header>Delete sentence</Modal.Header>
            <Modal.Content>
                <p>Are you sure you want to delete this sentence?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button basic color='red' onClick={this.props.closeDeleteSentenceModal}>No</Button>
                <Button basic color='blue'  content='Yes'
                        onClick={this.onDeleteSentence}/>
            </Modal.Actions>
        </Modal>
    }
}

const mapStateToProps = (state) => ({
    openDeleteSentenceModal: state.buckets.openDeleteSentenceModal,
    sentenceIdForDelete: state.buckets.sentenceIdForDelete
});

const mapDispatchToProps = (dispatch) => bindActionCreators({closeDeleteSentenceModal, saveBucket}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DeleteSentence);
