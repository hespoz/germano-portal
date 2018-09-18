import React, {Component} from "react";
import {Form, Message, Button, Table} from 'semantic-ui-react'
import {searchByExactKeyword, addNewWord, addNewWordClear} from "../../actions/dictionaryAction"
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import WordDescription from '../WordDescription'

const options = [
    {key: 'noun', text: 'Noun', value: 'noun'},
    {key: 'verb', text: 'Verb', value: 'verb'},
]

const optionsArticle = [
    {key: 'der', text: 'der', value: 'der'},
    {key: 'die', text: 'die', value: 'die'},
    {key: 'das', text: 'das', value: 'das'},
]

const initialState = {
    keyword: '',
    wordType: null,
    article: '',
    article_error: false,
    plural: '',
    plural_error: false,
    esTranslation: '',
    esTranslation_error: false,
    enTranslation: '',
    enTranslation_error: false,
    submitTriggered: false,
    perfect: '',
    conjugation_present: null,
    ich:'',
    ich_error:false,
    du:'',
    du_error:false,
    erSieEs:'',
    erSieEs_error:false,
    ihr:'',
    ihr_error:false,
    wir:'',
    wir_error:false,
    Sie:'',
    Sie_error:false
}

class NewWordForm extends Component {

    state = initialState

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

    parseTranslations = () => {
        return [
            {
                lang: 'es',
                translation: this.state.esTranslation.split(",")
            },
            {
                lang: 'en',
                translation: this.state.enTranslation.split(",")
            }
        ]
    }

    onSubmit = () => {
        if (this.state.wordType === 'noun') {
            this.validateNoun(() => this.props.addNewWord({
                word: this.state.keyword,
                plural: this.state.plural,
                article: this.state.article,
                type: this.state.wordType,
                translations: this.parseTranslations()
            }))
        } else {
            this.validateVerb(() => this.props.addNewWord({
                word: this.state.keyword,
                perfect: this.state.perfect,
                type: this.state.wordType,
                translations: this.parseTranslations(),
                conjugation_present: [{
                    pronoun:'ich',
                    conjugation:this.state.ich
                },{
                    pronoun:'du',
                    conjugation:this.state.du
                },{
                    pronoun:'er/sie/es',
                    conjugation:this.state.erSieEs
                },{
                    pronoun:'ihr',
                    conjugation:this.state.ihr
                },{
                    pronoun:'wir',
                    conjugation:this.state.wir
                },{
                    pronoun:'Sie',
                    conjugation:this.state.Sie
                }]
            }))
        }
    }

    onFormInputChange = (e, data) => {
        this.setState({
            [data.name]: data.value,
            [`${data.name}_error`]: data.value === '' && this.state.submitTriggered
        })
    }

    validateNoun = (callback) => {
        this.setState({
            submitTriggered: true,
            article_error: this.state.article === '',
            plural_error: this.state.plural === '',
            esTranslation_error: this.state.esTranslation === '',
            enTranslation_error: this.state.enTranslation === ''
        }, () => {
            if (!this.state.article_error || !this.state.plural_error || !this.state.esTranslation_error || !this.state.enTranslation_error) {
                callback()
            }
        })
    }

    validateVerb = (callback) => {
        this.setState({
            submitTriggered: true,
            perfect_error: this.state.perfect === '',
            esTranslation_error: this.state.esTranslation === '',
            enTranslation_error: this.state.enTranslation === '',
            ich_error: this.state.ich === '',
            du_error: this.state.du === '',
            erSieEs_error:this.state.erSieEs === '',
            ihr_error:this.state.ich === '',
            wir_error:this.state.wir === '',
            Sie_error:this.state.Sie === ''
        }, () => {
            if (!this.state.perfect_error || !this.state.esTranslation_error ||
                !this.state.enTranslation_error || !this.state.ich_error ||
                !this.state.du_error || !this.state.erSieEs_error ||
                !this.state.ihr_error || !this.state.wir_error || !this.state.Sie_error) {
                callback()
            }
        })
    }

    addOtherWord = () => {
        this.props.addNewWordClear()
        this.setState(initialState)
    }

    render() {

        const {wordType} = this.state
        const {exactResult, exactSearchTriggered, errorAddWord, successAddWord, loading} = this.props

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
                            placeholder='New word...' fluid
                            onChange={this.onChange}
                            onKeyPress={this.onKeyPress}
                            onBlur={this.onBlur}
                            value={this.state.keyword}/>
                    </Form.Field>
                </Form>
            </div>

            <Form onSubmit={this.onSubmit}>


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

                {!exactResult && exactSearchTriggered ?

                    <Form.Field>
                        <label>Type</label>
                        <Form.Select options={options} placeholder='Type'
                                     onChange={(event, data) => this.setState({wordType: data.value})}/>
                    </Form.Field>

                    :
                    null
                }

                {this.state.article_error || this.state.plural_error || this.state.esTranslation_error || this.state.enTranslation_error ||
                this.state.perfect_error || this.state.esTranslation_error ||
                this.state.enTranslation_error || this.state.ich_error ||
                this.state.du_error || this.state.erSieEs_error ||
                this.state.ihr_error || this.state.wir_error || this.state.Sie_error ?
                    <Message negative>
                        <Message.Header>All fields are mandatory</Message.Header>
                    </Message>
                    :
                    null
                }

                {wordType === 'noun' ?

                    <div>

                        <Form.Field>
                            <label>Article</label>
                            <Form.Select name="article"
                                         size='small'
                                         options={optionsArticle} placeholder='Articles'
                                         value={this.state.article} error={this.state.article_error}
                                         onChange={this.onFormInputChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Plural</label>
                            <Form.Input name="plural"
                                        size='small'
                                        placeholder='Plural' value={this.state.plural}
                                        error={this.state.plural_error} onChange={this.onFormInputChange}/>
                        </Form.Field>


                    </div>

                    :
                    null
                }

                {wordType === 'verb' ?

                    <div>

                        <Form.Field>
                            <label>Article</label>
                            <Form.Input name="perfect" placeholder='Perfect' size='small' value={this.state.perfect}
                                        error={this.state.perfect_error} onChange={this.onFormInputChange}/>
                        </Form.Field>


                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Pronoum</Table.HeaderCell>
                                    <Table.HeaderCell>Conjugation</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>ich</Table.Cell>
                                    <Table.Cell>
                                        <Form.Input name="ich" size='small' value={this.state.ich}
                                                    error={this.state.ich_error} onChange={this.onFormInputChange}/>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>du</Table.Cell>
                                    <Table.Cell>
                                        <Form.Input name="du" size='small' value={this.state.du}
                                                    error={this.state.du_error} onChange={this.onFormInputChange}/>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>er/sie/es</Table.Cell>
                                    <Table.Cell>
                                        <Form.Input name="erSieEs" size='small' value={this.state.erSieEs}
                                                    error={this.state.erSieEs_error} onChange={this.onFormInputChange}/>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>ihr</Table.Cell>
                                    <Table.Cell>
                                        <Form.Input name="ihr" size='small' value={this.state.ihr}
                                                    error={this.state.ihr_error} onChange={this.onFormInputChange}/>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>wir</Table.Cell>
                                    <Table.Cell>
                                        <Form.Input name="wir" size='small' value={this.state.wir}
                                                    error={this.state.wir_error} onChange={this.onFormInputChange}/>
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Sie</Table.Cell>
                                    <Table.Cell>
                                        <Form.Input name="Sie" size='small' value={this.state.Sie}
                                                    error={this.state.Sie_error} onChange={this.onFormInputChange}/>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>

                    </div>

                    :
                    null
                }


                {wordType ?
                    <div>
                        <Form.Field>
                            <label>Spanish translation</label>
                            <Form.Input name="esTranslation" size='small' placeholder='Spanish translation'
                                        value={this.state.esTranslation} error={this.state.esTranslation_error}
                                        onChange={this.onFormInputChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>English translation</label>
                            <Form.Input name="enTranslation" size='small' placeholder='English translation'
                                        value={this.state.enTranslation} error={this.state.enTranslation_error}
                                        onChange={this.onFormInputChange}/>
                        </Form.Field>
                    </div>
                    :
                    null
                }

                {!exactResult && wordType !== null && exactSearchTriggered ?
                    <div>
                        <Button type='submit'>Add</Button>
                    </div>
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
    errorAddWord: state.dictionary.errorAddWord
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    searchByExactKeyword: searchByExactKeyword,
    addNewWordClear: addNewWordClear,
    addNewWord: addNewWord
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(NewWordForm);