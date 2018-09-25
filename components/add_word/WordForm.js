import React, {Component} from "react";
import {Form, Message, Button, Table, Dropdown} from 'semantic-ui-react'
import {searchByExactKeyword, addNewWord, addNewWordClear, searchById, goBackWordForm} from "../../actions/dictionaryAction"
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import WordDescription from '../WordDescription'
import GermanWordField from './GermanWordField'
import {WORD_TYPES} from "../../constants";

import AddNoun from './AddNoun'
import AddVerb from './AddVerb'

const initialState = {
    previousWord: '',
    word: '',
    wordType: null,
    receivedInitValues:false
}

class WordForm extends Component {

    state = initialState

    componentDidMount = () => {

        if (this.props.editIdWord) {
            this.props.searchById(this.props.editIdWord)
        }

    }

    componentWillReceiveProps = (props) => {
        if (!this.state.receivedInitValues && props.wordReferenceData) {
            this.setState({
                wordType: props.wordReferenceData.type,
                word: props.wordReferenceData.word,
                previousWord: props.wordReferenceData.word,
                receivedInitValues: true
            })
        }
    }

    onChange = (e, data) => {
        this.setState({word: data.value})
    }

    parseTranslations = (translation) => {
        return [
            {
                lang: 'es',
                translation: translation.split(",")
            }
        ]
    }

    addOtherWord = () => {
        this.props.addNewWordClear()
        this.setState(initialState)
    }

    onSaveWord = (payload) => {
        this.props.addNewWord(payload)
    }

    render() {


        const {wordType, previousWord, word} = this.state
        const {exactResult, exactSearchTriggered, errorAddWord, successAddWord, editIdWord, wordReferenceData} = this.props



        if (successAddWord) {
            return <div>
                <Message positive>
                    <Message.Header>Word {this.state.word} was added</Message.Header>
                    <a href={"javascript:void(0)"} onClick={this.addOtherWord}>
                        Add new word
                    </a>
                </Message>

                <WordDescription wordItem={exactResult} goBackWordForm={this.props.goBackWordForm}/>

            </div>
        }

        return <div>


            {errorAddWord ?
                <Message negative>
                    <Message.Header>Error saving word</Message.Header>
                </Message>
                :
                null
            }

            {editIdWord && exactResult && exactResult.word !== previousWord ?
                <Message color='yellow'>
                    <Message.Header>This word already exists</Message.Header>
                </Message>
                :
                null
            }


            <GermanWordField word={word} onChange={this.onChange}/>

            <Form>

                {!editIdWord && exactResult ?
                    <WordDescription wordItem={exactResult}/>
                    :
                    null
                }

                {(!exactResult && exactSearchTriggered) || wordReferenceData ?

                    <Form.Field>
                        <label>Type</label>
                        <Form.Select size='small' options={WORD_TYPES} placeholder='Type'
                                     onChange={(event, data) => this.setState({wordType: data.value})}
                                     value={this.state.wordType}/>
                    </Form.Field>

                    :
                    null
                }

                {wordType === 'noun' ?

                    <AddNoun word={word} wordType={wordType} parseTranslations={this.parseTranslations}
                             onSaveWord={this.onSaveWord} disableSubmit={editIdWord && exactResult && exactResult.word !== previousWord}/>

                    :
                    null
                }

                {wordType === 'verb' ?

                    <AddVerb word={word} wordType={wordType} parseTranslations={this.parseTranslations}
                             onSaveWord={this.onSaveWord} disableSubmit={editIdWord && exactResult && exactResult.word !== previousWord}/>

                    :
                    null
                }


            </Form>

            <style jsx>{`

                  div {
                    margin-bottom:10px;
                  }

            `}</style>

        </div>
    }

}

const mapStateToProps = (state) => ({
    exactResult: state.dictionary.exactResult,
    loadingExact: state.dictionary.loadingExact,
    exactSearchTriggered: state.dictionary.exactSearchTriggered,
    successAddWord: state.dictionary.successAddWord,
    errorAddWord: state.dictionary.errorAddWord,
    editIdWord: state.dictionary.editIdWord,
    wordReferenceData: state.dictionary.wordReferenceData,
    searchByIdError: state.dictionary.searchByIdError
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    searchByExactKeyword: searchByExactKeyword,
    addNewWordClear: addNewWordClear,
    addNewWord: addNewWord,
    searchById,
    goBackWordForm
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(WordForm);
