import React, {Component} from "react"
import {Button, Card} from "semantic-ui-react";
import {Form} from "semantic-ui-react";
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import {saveBucket} from "../../../actions/bucketAction";

class SentenceForm extends Component {

    state = {
        germanSentenceValue: this.props.germanSentence,
        spanishSentenceValue: this.props.spanishSentence
    }

    componentWillReceiveProps = ({germanSentence, spanishSentence}) => {
        this.setState({
            germanSentenceValue: germanSentence,
            spanishSentenceValue: spanishSentence
        })
    }

    handleChange = (e, {name, value}) => this.setState({[name]: value})

    onSentenceUpdate = () => {
        let sentences = this.props.bucket.sentences
        sentences[this.props.index] = {
            germanSentence: this.state.germanSentenceValue,
            spanishSentence: this.state.spanishSentenceValue,
            comments: sentences[this.props.index].comments
        }
        this.props.saveBucket({
            _id: this.props.bucket._id,
            sentences
        })
        this.props.toggleForm()
    }

    onSentenceAdd = () => {
        let sentences = this.props.bucket.sentences || []
        sentences.push({
            germanSentence: this.state.germanSentenceValue,
            spanishSentence: this.state.spanishSentenceValue
        })
        this.props.saveBucket({
            _id: this.props.bucket._id,
            sentences
        })
        this.setState({
            germanSentenceValue: '',
            spanishSentenceValue: ''
        })

    }

    render() {

        const {germanSentenceValue, spanishSentenceValue} = this.state
        const {edit, index} = this.props


        return <Card key={index} fluid>
            <Card.Content>
                <Card.Header>Add new sentence</Card.Header>
                <br/>
                <Form>
                    <Form.TextArea placeholder='Sentence' name='germanSentenceValue' value={germanSentenceValue}
                                   onChange={this.handleChange}/>
                    <Form.TextArea placeholder='Sentence' name='spanishSentenceValue'
                                   value={spanishSentenceValue}
                                   onChange={this.handleChange}/>
                </Form>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                    <Button basic color='blue' onClick={edit ? this.onSentenceUpdate : this.onSentenceAdd}>
                        {edit ? "Actualizar" : "Añadir"}
                    </Button>
                    <Button basic color='red' onClick={this.props.toggleForm}>
                        Cancel
                    </Button>
                </div>
            </Card.Content>
        </Card>
    }

}

const mapStateToProps = (state) => ({buckets: state.buckets.buckets});

const mapDispatchToProps = (dispatch) => bindActionCreators({saveBucket}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(SentenceForm);
