import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import { Header, Icon, Button, Form, Card } from 'semantic-ui-react'
import {saveBucket} from '../../actions/bucketAction'

class Sentence extends Component {

    state = {
        edit: false,
        showAddSentence: false,
        germanSentenceValue: '',
        spanishSentenceValue: ''
    }

    handleChange = (e, {name, value}) => this.setState({[name]: value})

    onSentenceUpdate = () => {
        let sentences = this.props.bucket.sentences
        sentences[this.props.index] = {
            germanSentence: this.state.germanSentenceValue,
            spanishSentence: this.state.spanishSentenceValue
        }
        this.props.saveBucket({
            _id: this.props.bucket._id,
            sentences
        })
        this.setState({edit: false})
    }

    onSentenceAdd = () => {
        let sentences = this.props.bucket.sentences
        sentences.push({
            germanSentence: this.state.germanSentenceValue,
            spanishSentence: this.state.spanishSentenceValue
        })
        this.props.saveBucket({
            _id: this.props.bucket._id,
            sentences
        })
        this.setState({germanSentenceValue: '',
            spanishSentenceValue: ''})

    }


    onRemoveSentence = () => {
        let sentences = this.props.bucket.sentences
        sentences.splice(this.props.index, 1)
        this.props.saveBucket({
            _id: this.props.bucket._id,
            sentences
        })
    }



    renderEdit = (germanSentenceValue, spanishSentenceValue) => {
        return <div className={"row"}>
            <div className={"col-md-12"}>
                <Card fluid>
                    <Card.Content>
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
                            <Button basic color='green' onClick={this.onSentenceUpdate}>
                                Update
                            </Button>
                            <Button basic color='red' onClick={() => this.setState({edit: false})}>
                                Cancel
                            </Button>
                        </div>
                    </Card.Content>
                </Card>
            </div>
        </div>
    }

    renderSentence = (sentence) => {
        return <Card fluid>
            <Card.Content>
                <div className={"row"}>
                    <div style={{wordWrap: 'break-word', padding: '8px'}} className={"col-md-10"}>
                        {sentence.germanSentence} - {sentence.spanishSentence}
                    </div>
                    <div className={"col-md-2 text-right"}>
                        <Icon name='edit' onClick={() => this.setState({
                            edit: true,
                            germanSentenceValue: sentence.germanSentence,
                            spanishSentenceValue: sentence.spanishSentence
                        })}/>
                        <Icon name='trash alternate' onClick={() => this.onRemoveSentence()}/>
                    </div>
                </div>
            </Card.Content>
        </Card>
    }

    renderAddMode = () => {
        const {showAddSentence, germanSentenceValue, spanishSentenceValue} = this.state

        if(!showAddSentence) {
            return <Header as='h3' onClick={() => this.setState({showAddSentence : true})}>
                <Icon.Group size='large'>
                    <Icon name='add' />
                </Icon.Group>
                Add new sentence
            </Header>
        } else {
            return <Card fluid>
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
                        <Button basic color='green' onClick={this.onSentenceAdd}>
                            Add
                        </Button>
                        <Button basic color='red' onClick={() => this.setState({showAddSentence: false})}>
                            Cancel
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        }

    }

    render() {

        const {edit, germanSentenceValue, spanishSentenceValue} = this.state
        const {sentence, editMode} = this.props


        if (!editMode) {
            return this.renderAddMode()
        }

        return <div>


            {edit ? this.renderEdit(germanSentenceValue, spanishSentenceValue) : this.renderSentence(sentence)}

            <style jsx>{`

                  #sentence {
                    border:1px solid grey;
                    border-radius:3px;
                    cursor:pointer;
                  }

            `}</style>
        </div>

    }
}

const mapStateToProps = (state) => ({buckets: state.buckets.buckets});

const mapDispatchToProps = (dispatch) => bindActionCreators({saveBucket}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Sentence);