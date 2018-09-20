import React, {Component} from "react";
import {Form, Button} from 'semantic-ui-react'
import {CATEGORIES, ARTICLES} from "../../constants";
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import {Field, reduxForm} from 'redux-form'
import {InputField, SelectField} from '../formElement/FormElements'
import {validateNoun} from '../formElement/ValidationForms'
import {get} from 'lodash';

const parseInit = (wordReferenceData) => {
    return {...wordReferenceData, translations:get(wordReferenceData, 'translations[0].translation') === undefined ? '' : get(wordReferenceData, 'translations[0].translation').join(",")}
}

class AddNoun extends Component {

    onSubmit = (values) => {
        let payload = {...values, type: this.props.wordType, word: this.props.word, translations: this.props.parseTranslations(values.translations)}
        this.props.onSaveWord(payload)
    }

    render() {

        console.log(this.props.initialValues)

        const { handleSubmit } = this.props

        return <Form onSubmit={handleSubmit(this.onSubmit)}>

            <Field name="article"
                   label={'Articles'}
                   options={ARTICLES}
                   placeholder='Articles'
                   selection component={SelectField}/>

            <Field name='plural' component={InputField}
                   label={'Plural'}
                   placeholder='Plural'/>

            <Field name='translations' component={InputField}
                   label={'Traduccion'}
                   placeholder='Traduccion'/>

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
    form: 'nounForm',
    validate: validateNoun
})(AddNoun));



