import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import {Modal, Button} from 'semantic-ui-react'
import {saveBucket, closeDeleteBucketModal, deleteBucket} from '../../actions/bucketAction'
import {translate} from "react-i18next";

class DeleteBucket extends Component {

    render() {

        const {t} = this.props

        return <Modal size={'tiny'} open={this.props.openDeleteBucketModal} style={{zIndex: '9999999'}} onClose={this.props.closeDeleteBucketModal}>
            <Modal.Header>{t("remove.note.title")}</Modal.Header>
            <Modal.Content>
                <p>{t("delete.note.message")}</p>
            </Modal.Content>
            <Modal.Actions>
                <Button basic color='red' onClick={this.props.closeDeleteBucketModal}>{t("no")}</Button>
                <Button basic color='blue' content={t("yes.delete")} onClick={() => this.props.deleteBucket(this.props.bucketIdForDelete)}/>
            </Modal.Actions>
        </Modal>
    }
}

const mapStateToProps = (state) => ({
    openDeleteBucketModal: state.buckets.openDeleteBucketModal,
    bucketIdForDelete: state.buckets.bucketIdForDelete
});

const mapDispatchToProps = (dispatch) => bindActionCreators({saveBucket, closeDeleteBucketModal, deleteBucket}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(translate("translations")(DeleteBucket));
