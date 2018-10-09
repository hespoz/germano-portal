import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import {Modal, Button, Form} from 'semantic-ui-react'
import {saveBucket, closeDeleteBucketModal, deleteBucket} from '../../actions/bucketAction'

class DeleteBucket extends Component {

    render() {


        return <Modal size={'tiny'} open={this.props.openDeleteBucketModal} style={{zIndex: '9999999'}} onClose={this.props.closeDeleteBucketModal}>
            <Modal.Header>Delete this bucket</Modal.Header>
            <Modal.Content>
                <p>Are you sure you want to delete this bucket?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={this.props.closeDeleteBucketModal}>No</Button>
                <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={() => this.props.deleteBucket(this.props.bucketIdForDelete)}/>
            </Modal.Actions>
        </Modal>
    }
}

const mapStateToProps = (state) => ({
    openDeleteBucketModal: state.buckets.openDeleteBucketModal,
    bucketIdForDelete: state.buckets.bucketIdForDelete
});

const mapDispatchToProps = (dispatch) => bindActionCreators({saveBucket, closeDeleteBucketModal, deleteBucket}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DeleteBucket);