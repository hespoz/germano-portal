import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import {Modal, Button, Form} from 'semantic-ui-react'
import {saveBucket, closeBucketModal} from '../../actions/bucketAction'
import {translate} from "react-i18next";

class AddBucket extends Component {

    state = {
        name: ''
    }

    handleChange = (e, {value}) => {
        this.setState({name: value})
    }

    onSubmit = () => {
        this.props.saveBucket({
            name: this.state.name,
            wordsIds: this.props.wordIdForNewBucket ? [this.props.wordIdForNewBucket] : []
        })
    }

    render() {

        const {t} = this.props
        const {name} = this.state

        return <Modal size={'tiny'} open={this.props.openBucketModal} style={{zIndex: '9999999'}}
                      onClose={this.props.closeBucketModal}>
            <Modal.Header>{t("new.note")}</Modal.Header>
            <Modal.Content image>
                <Modal.Description>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Input
                            label={t("add.note.name")}
                            placeholder={t("add.note.name")}
                            name='name'
                            value={name}
                            onChange={this.handleChange}
                        />
                        <div className={"row"}>
                            <div className={"col-md-12 text-right"}>
                                <Button basic color='blue' type='submit'>{t("create")}</Button>
                            </div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(translate("translations")(AddBucket));
