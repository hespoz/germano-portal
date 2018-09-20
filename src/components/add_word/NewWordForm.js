import React, {Component} from "react";
import {Form, Message, Button, Table, Dropdown} from 'semantic-ui-react'
import {searchByExactKeyword, addNewWord, addNewWordClear, searchById} from "../../actions/dictionaryAction"
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import WordDescription from '../WordDescription'
import {WORD_TYPES} from "../../constants";

import AddNoun from './AddNoun'
import AddVerb from './AddVerb'

const initialState = {
    keyword: '',
    wordType: null
}

class NewWordForm extends Component {

    state = initialState

    componentDidMount = () => {

        if(this.props.editIdWord) {
            this.props.searchById(this.props.editIdWord)
        }

    }

    componentWillReceiveProps = (props) => {
        if(props.wordReferenceData) {
            this.setState({
                wordType:props.wordReferenceData.type,
                keyword:props.wordReferenceData.word
            })
        }
    }

    onChange = (e, data) => {
        this.setState({keyword: data.value})
    }

    onBlur = () => {
        this.searchWord(this.state.keyword)
    }

    onKeyPress = (event) => {
        if (event.key == 'Enter') {
            this.searchWord(this.state.keyword)
        }
    }

    searchWord = () => {
        if (this.state.keyword !== '') {
            this.props.searchByExactKeyword(this.state.keyword)
        }
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


        const {wordType, keyword} = this.state
        const {exactResult, exactSearchTriggered, errorAddWord, successAddWord, loading, wordReferenceData} = this.props



        if (successAddWord) {
            return <div>
                <Message positive>
                    <Message.Header>Word {this.state.keyword} was added</Message.Header>
                    <a href={"javascript:void(0)"} onClick={this.addOtherWord}>
                        Add new word
                    </a>
                </Message>

                <WordDescription wordItem={exactResult}/>

            </div>
        }

        return <div>
            <div>
                <Form>
                    <Form.Field>
                        <label>New word</label>
                        <Form.Input
                            loading={loading}
                            placeholder='New word...'
                            fluid
                            onChange={this.onChange}
                            onKeyPress={this.onKeyPress}
                            onBlur={this.onBlur}
                            value={this.state.keyword}/>
                    </Form.Field>
                </Form>
            </div>

            <Form>


                {errorAddWord ?
                    <Message negative>
                        <Message.Header>Error saving word</Message.Header>
                    </Message>
                    :
                    null
                }


                {exactResult ?
                    <WordDescription wordItem={exactResult}/>
                    :
                    null
                }

                {(!exactResult && exactSearchTriggered ) || wordReferenceData ?

                    <Form.Field>
                        <label>Type</label>
                        <Form.Select options={WORD_TYPES} placeholder='Type'
                                     onChange={(event, data) => this.setState({wordType: data.value})} value={this.state.wordType}/>
                    </Form.Field>

                    :
                    null
                }

                {wordType === 'noun' ?

                    <AddNoun word={keyword} wordType={wordType} parseTranslations={this.parseTranslations} onSaveWord={this.onSaveWord}/>

                    :
                    null
                }

                {wordType === 'verb' ?

                    <AddVerb word={keyword}  wordType={wordType} parseTranslations={this.parseTranslations} onSaveWord={this.onSaveWord}/>

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
    searchByIdError:state.dictionary.searchByIdError
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    searchByExactKeyword: searchByExactKeyword,
    addNewWordClear: addNewWordClear,
    addNewWord: addNewWord,
    searchById
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(NewWordForm);
