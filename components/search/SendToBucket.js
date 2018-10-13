import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import { Modal, Form, Button, Message } from 'semantic-ui-react'
import { fetchBuckets, closeSendToBucketModal, saveBucket, openBucketModal } from '../../actions/bucketAction'
import { map, find } from 'lodash'

class SendToBucket extends Component {

    state = {
        bucketId: null
    }

    onOpen = () => {
        this.props.fetchBuckets(this.props.userName)
    }

    getOptions = () => {
        const { buckets } = this.props
        return map(buckets, (b) => {
            return {key:b._id, value:b._id, text: b.name}
        })
    }

    onSelectChange = (event, {value}) => {
        this.setState({
            bucketId:value
        })
    }

    getBucket = () => {
        return find(this.props.buckets, (b) => b._id === this.state.bucketId)
    }

    parseWordsIds = (bucket) => {
       return map(bucket.words, (w) => w._id)
    }

    onSubmit = () => {
        if (this.state.bucketId) {
            const bucket = this.getBucket()
            if (bucket) {
                let wordsIds = this.parseWordsIds(bucket)
                wordsIds.push(this.props.wordIdForSendToBucket)
                this.props.saveBucket({
                    _id: this.state.bucketId,
                    wordsIds: wordsIds
                })
            }
        }
    }

    render() {

        const {buckets} = this.props

        console.log("Aver", this.props)

        return <Modal size={'tiny'} open={this.props.openSendToBucketModal} style={{zIndex: '9999999'}} onClose={this.props.closeSendToBucketModal} onOpen={this.onOpen}>
            <Modal.Header>Add to bucket</Modal.Header>
            <Modal.Content>

                {buckets.length === 0 ?

                    <Message>
                        <Message.Header>Oh no tienes buckets, por favor crea uno</Message.Header>
                        <p>
                            <a href={"javascript:void(0)"} onClick={() => this.props.openBucketModal(this.props.wordIdForSendToBucket)}>Create bucket</a>
                        </p>
                    </Message>

                    :

                    <Form onSubmit={this.onSubmit}>
                        <Form.Select name="bucket" options={this.getOptions()} onChange={this.onSelectChange} value={this.state.bucketId}/>
                        <Button type='submit'>Create</Button>
                    </Form>

                }




            </Modal.Content>
        </Modal>
    }
}

const mapStateToProps = (state) => ({
    buckets: state.buckets.buckets,
    userName: state.auth.userName,
    openSendToBucketModal: state.buckets.openSendToBucketModal,
    wordIdForSendToBucket: state.buckets.wordIdForSendToBucket
});

const mapDispatchToProps = (dispatch) => bindActionCreators({fetchBuckets, closeSendToBucketModal, saveBucket, openBucketModal}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SendToBucket);
