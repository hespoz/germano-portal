import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import {Form} from 'semantic-ui-react'
import {saveBucket} from '../../actions/bucketAction'
import {translate} from "react-i18next"

class BucketName extends Component {

    state = {
        bucketName: this.props.bucket.name
    }

    bucketNameChange = () => {
        this.props.saveBucket({
            _id: this.props.bucket._id,
            name: this.state.bucketName
        })
    }

    onKeyPress = (event) => {
        if (event.key == 'Enter') {
            this.bucketNameChange(this.props.word)
        }
    }

    handleChange = (e, {name, value}) => this.setState({[name]: value})

    render() {

        const {t} = this.props
        const {bucketName} = this.state

        return <Form>
            <Form.Input
                label={t("add.note.name")}
                placeholder={t("add.note.name")}
                name='bucketName' value={bucketName}
                onChange={this.handleChange}
                onKeyPress={this.onKeyPress}
                onBlur={this.bucketNameChange}
            />
        </Form>
    }
}

const mapStateToProps = (state) => ({
    buckets: state.buckets.buckets
});

const mapDispatchToProps = (dispatch) => bindActionCreators({saveBucket}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(translate("translations")(BucketName));
