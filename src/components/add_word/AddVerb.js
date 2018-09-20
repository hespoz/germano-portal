import React, {Component} from "react";
import {Table, Form, Button} from 'semantic-ui-react'
import {CATEGORIES} from "../../constants";

import {Field, reduxForm} from 'redux-form'
import {InputField, SelectField} from '../formElement/FormElements'
import {validateNoun, validateVerb} from '../formElement/ValidationForms'

import {connect} from "react-redux"
import {bindActionCreators} from 'redux'

import {get} from 'lodash';

const parseInit = (wordReferenceData) => {
    return {...wordReferenceData,
        translations:get(wordReferenceData, 'translations[0].translation') === undefined ? '' : get(wordReferenceData, 'translations[0].translation').join(","),
        ich: get(wordReferenceData, 'conjugation_present[0].conjugation'),
        du: get(wordReferenceData, 'conjugation_present[1].conjugation'),
        erSieEs: get(wordReferenceData, 'conjugation_present[2].conjugation'),
        ihr: get(wordReferenceData, 'conjugation_present[3].conjugation'),
        wir: get(wordReferenceData, 'conjugation_present[4].conjugation'),
        Sie: get(wordReferenceData, 'conjugation_present[5].conjugation')
    }
}

class AddVerb extends Component {

    onSubmit = (values) => {
        this.props.onSaveWord({
            _id: this.props.initialValues._id,
            word: this.props.word,
            plural: values.plural,
            perfect: values.perfect,
            type: this.props.wordType,
            translations: this.props.parseTranslations(values.translations),
            conjugation_present: [{
                pronoun:'ich',
                conjugation:values.ich
            },{
                pronoun:'du',
                conjugation:values.du
            },{
                pronoun:'er/sie/es',
                conjugation:values.erSieEs
            },{
                pronoun:'ihr',
                conjugation:values.ihr
            },{
                pronoun:'wir',
                conjugation:values.wir
            },{
                pronoun:'Sie',
                conjugation:values.Sie
            }],
            categories: values.categories
        })
    }

    render() {

        const { handleSubmit } = this.props

        return <Form onSubmit={handleSubmit(this.onSubmit)}>


            <Field name='perfect' component={InputField}
                   label={'Perfect'}
                   placeholder='Perfect'/>

            <Field name='translations' component={InputField}
                   label={'Traduccion'}
                   placeholder='Traduccion'/>

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
                            <Field name="ich" size='small' component={InputField}/>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>du</Table.Cell>
                        <Table.Cell>
                            <Field name="du" size='small' component={InputField}/>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>er/sie/es</Table.Cell>
                        <Table.Cell>
                            <Field name="erSieEs" size='small' component={InputField}/>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>ihr</Table.Cell>
                        <Table.Cell>
                            <Field name="ihr" size='small' component={InputField}/>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>wir</Table.Cell>
                        <Table.Cell>
                            <Field name="wir" size='small' component={InputField}/>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Sie</Table.Cell>
                        <Table.Cell>
                            <Field name="Sie" size='small' component={InputField}/>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>



            <Field name="categories"
                   label={'Categories'}
                   options={CATEGORIES}
                   placeholder='Categories' fluid
                   multiple selection component={SelectField}/>


            <Button type='submit'>Add</Button>

        </Form>

    }

}


const mapStateToProps = (state) => ({
    initialValues:parseInit(state.dictionary.wordReferenceData)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'verbForm',
    validate: validateVerb
})(AddVerb));

