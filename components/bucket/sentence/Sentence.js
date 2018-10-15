import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import DeleteSentence from '../DeleteSentence'
import MakeComment from '../MakeComment'
import SentenceForm from './SentenceForm'
import {Header, Icon, Button, Form, Card, Segment, Divider} from 'semantic-ui-react'
import {saveBucket, openDeleteSentenceModal} from '../../../actions/bucketAction'

class Sentence extends Component {

    state = {
        edit: false,
        showAddSentence: false,
        germanSentenceValue: '',
        spanishSentenceValue: '',
        comment: ''
    }

    handleChange = (e, {name, value}) => this.setState({[name]: value})

    onRemoveSentence = (sentenceId) => {
        this.props.openDeleteSentenceModal(sentenceId)
    }

    renderSentence = (sentence) => {
        const {writePermission} = this.props
        return <Segment>

            {writePermission ?

                <div id="sentence-actions">
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


            <div className={"row"}>
                <div style={{wordWrap: 'break-word', padding: '8px'}} className={"col-md-12"}>


                    <div id={"sentence-container"}>

                        <div className={"sentence"}>
                            <Header as='h5'>En aleman</Header>
                            {sentence.germanSentence}
                        </div>

                        <div className={"sentence"}>
                            <Header as='h5'>En tu idioma</Header>
                            {sentence.spanishSentence}
                        </div>


                    </div>


                </div>

            </div>

            <Divider/>


            <Header as='h5'>Comentarios</Header>

            <br/>

            <div className={"row"}>
                <div className={"col-md-12"}>
                    {sentence.comments.map((comment, index) => {
                        return <MakeComment index={index} comment={comment} sentenceId={sentence._id}/>
                    })}
                </div>
            </div>

            <br/>

            <div className={"row"}>
                <div className={"col-md-12"}>
                    <MakeComment sentenceId={sentence._id}/>
                </div>
            </div>


            <style jsx>{`

                  #sentence-container {
                    display: flex;
                    flex-direction:column;
                  }

                  .sentence {
                      margin-top:8px;
                  }

                  #sentence-actions {
                    position: absolute;
                    top: 4%;
                    left: 93%;
                    z-index:99999;
                  }

            `}</style>


        </Segment>
    }

    renderAddMode = () => {

        if (!this.props.writePermission) return null

        const {showAddSentence} = this.state

        if (!showAddSentence) {
            return <Header as='h3' onClick={() => this.setState({showAddSentence: true})}>
                <Icon.Group size='large'>
                    <Icon name='add'/>
                </Icon.Group>
                Add new sentence
            </Header>
        } else {
            return <SentenceForm bucket={this.props.bucket} toggleForm={() => this.setState({showAddSentence: false})}/>
        }

    }


    render() {

        const {edit, germanSentenceValue, spanishSentenceValue} = this.state
        const {index, sentence, editMode, bucket} = this.props

        if (!editMode) {
            return this.renderAddMode()
        }

        return <div>

            <DeleteSentence bucket={bucket}/>

            {edit ?

                <SentenceForm
                    edit
                    index={index}
                    bucket={bucket}
                    germanSentence={germanSentenceValue}
                    spanishSentence={spanishSentenceValue}
                    toggleForm={() => this.setState({edit: false})}/>

                :
                this.renderSentence(sentence)
            }


        </div>

    }
}

const mapStateToProps = (state) => ({buckets: state.buckets.buckets});

const mapDispatchToProps = (dispatch) => bindActionCreators({saveBucket, openDeleteSentenceModal}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Sentence);
