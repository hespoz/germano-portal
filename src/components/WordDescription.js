import React, {Component} from "react";
import {Card, Flag, Table, Button, Input, Form} from 'semantic-ui-react'
import {get} from 'lodash';

import ViewMore from "./ViewMore";

const options = [
    {key: 'es', text: 'Spanish', value: 'es'},
    {key: 'en', text: 'English', value: 'en'},
    {key: 'it', text: 'Italian', value: 'it'},
    {key: 'fr', text: 'French', value: 'fr'},
    {key: 'ru', text: 'Russian', value: 'ru'}
]

class WordDescription extends Component {

    state = {
        newTransaltionFormOpen: false
    }

    getFlagCode = (lang) => {
        switch (lang) {
            case 'en':
                return 'gb'
            case 'es':
                return 'es'
            default:
                return 'gb'
        }
    }

    renderAddNewTranslation = () => {
        return <Form onSubmit={() => console.log(1)}>
            <Form.Group widths='equal'>
                <Form.Select label='Language' options={options} placeholder='Select language'/>
                <Form.Field
                    control={Input}
                    label='Translation'
                    placeholder='Translation'
                />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Button content='Submit' />
            </Form.Group>
        </Form>
    }

    generateHeader = (item) => {

        switch (item.type) {
            case 'noun':
                return `${item.article} ${item.word} - plural: die ${item.plural}`
            case 'verb':
                return `${item.word} - ${item.perfect}`
            default:
                return ''
        }
    }

    renderConjugation = (wordItem) => {

        const conjugations = get(wordItem, 'conjugation_present')

        if (conjugations === undefined || conjugations.length === 0) {
            return null
        }

        return <Table celled>

            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell textAlign={'center'}>Pronou</Table.HeaderCell>
                    <Table.HeaderCell textAlign={'center'}>Conjugation</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {conjugations.map((item, index) => {
                    return <Table.Row key={index}>
                        <Table.Cell textAlign={'center'}>{item.pronoun}</Table.Cell>
                        <Table.Cell textAlign={'center'}>{item.conjugation}</Table.Cell>
                    </Table.Row>
                })}
            </Table.Body>

        </Table>
    }

    renderTranslations = (wordItem) => {

        const translations = get(wordItem, 'translations')
        if (translations === undefined) {
            return null
        }

        return <Table celled>

            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Translation</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {get(wordItem, 'translations').map((translation, index) => {
                    return <Table.Row key={index}>
                        <Table.Cell><Flag
                            name={`${this.getFlagCode(translation.lang)}`}/> {translation.translation.join(",")}
                        </Table.Cell>
                    </Table.Row>
                })}
            </Table.Body>

        </Table>

    }

    render() {

        const {wordItem} = this.props

        return (

            <Card fluid>
                <Card.Content header={this.generateHeader(wordItem)}/>
                <Card.Content>

                    <ViewMore initialHeight={'145px'}>
                        {this.renderTranslations(wordItem)}
                        {this.renderConjugation(wordItem)}
                    </ViewMore>

                </Card.Content>
            </Card>

        )
    }

}


export default WordDescription;
