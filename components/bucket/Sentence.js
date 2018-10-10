import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import DeleteSentence from './DeleteSentence'
import MakeComment from './MakeComment'
import { Header, Icon, Button, Form, Card } from 'semantic-ui-react'
import {saveBucket, openDeleteSentenceModal} from '../../actions/bucketAction'

class Sentence extends Component {

    state = {
        edit: false,
        showAddSentence: false,
        germanSentenceValue: '',
        spanishSentenceValue: '',
        comment:''
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
        let sentences = this.props.bucket.sentences || []
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


    onRemoveSentence = (sentenceId) => {
        this.props.openDeleteSentenceModal(sentenceId)
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
        const { writePermission } = this.props
        return <Card fluid>
            <Card.Content>
                <div className={"row"}>
                    <div style={{wordWrap: 'break-word', padding: '8px'}} className={"col-md-10"}>
                        {sentence.germanSentence} - {sentence.spanishSentence}
                    </div>

                    {writePermission ?
                        <div className={"col-md-2 text-right"}>
                            <Icon name='edit' onClick={() => this.setState({
                                edit: true,
                                germanSentenceValue: sentence.germanSentence,
                                spanishSentenceValue: sentence.spanishSentence
                            })}/>
                            <Icon name='trash alternate' onClick={() => this.onRemoveSentence(sentence._id)}/>
                        </div>
                        :
                        null
                    }

                </div>
                <div className={"row"}>
                    <div className={"col-md-12"}>
                        <MakeComment sentenceId={sentence._id}/>

                        {sentence.comments.map((comment, index) => {
                            console.log(comment)
                            return <MakeComment comment={comment} sentenceId={sentence._id}/>
                        })}

                    </div>
                </div>
            </Card.Content>
        </Card>
    }

    renderAddMode = () => {

        if(!this.props.writePermission) return null

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
        const {sentence, editMode, bucket} = this.props

        if (!editMode) {
            return this.renderAddMode()
        }

        return <div>

            <DeleteSentence bucket={bucket}/>

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

const mapDispatchToProps = (dispatch) => bindActionCreators({saveBucket, openDeleteSentenceModal}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Sentence);
