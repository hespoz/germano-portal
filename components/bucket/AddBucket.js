import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import {Modal, Button, Form} from 'semantic-ui-react'
import {saveBucket, closeBucketModal} from '../../actions/bucketAction'

class AddBucket extends Component {

    state = {
        name: ''
    }

    handleChange = (e, {value}) => {
        this.setState({name: value})
    }

    onSubmit = () => {
        console.log(this.props.wordIdForNewBucket)
        this.props.saveBucket({
            name: this.state.name,
            wordsIds: [this.props.wordIdForNewBucket]
        })
    }

    render() {

        const {name} = this.state

        return <Modal size={'tiny'} open={this.props.openBucketModal} style={{zIndex: '9999999'}} onClose={this.props.closeBucketModal}>
            <Modal.Header>Add new bucket</Modal.Header>
            <Modal.Content image>
                <Modal.Description>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Input
                            label={"Bucket name"}
                            placeholder='Bucket name'
                            name='name'
                            value={name}
                            onChange={this.handleChange}
                        />
                        <Button type='submit'>Create</Button>
                    </Form>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    }
}

const mapStateToProps = (state) => ({
    openBucketModal: state.buckets.openBucketModal,
    wordIdForNewBucket: state.buckets.wordIdForNewBucket
});

const mapDispatchToProps = (dispatch) => bindActionCreators({saveBucket, closeBucketModal}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddBucket);
