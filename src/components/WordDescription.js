import React, {Component} from "react";
import {Card, Flag, Table } from 'semantic-ui-react'
import {get} from 'lodash';

import ViewMore from "./ViewMore";


class WordDescription extends Component {


    generateHeader = (item) => {

        switch (item.type) {
            case 'noun':
                return <div><Flag name={'de'}/> {item.article} {item.word} - plural: die {item.plural} {item.ownerId === localStorage.getItem("userId") ? <a href={"javascript:void(0);"} onClick={()=> this.props.openWordFormModal(item._id)}>Edit</a> : null}</div>
            case 'verb':
                return <div><Flag name={'de'}/> {item.word} - {item.perfect} {item.ownerId === localStorage.getItem("userId") ? <a href={"javascript:void(0);"} onClick={()=> this.props.openWordFormModal(item._id)}>Edit</a> : null}</div>
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

        return <div>

            {get(wordItem, 'translations').map((translation, index) => {
                return <p key={index}><Flag
                        name={'es'}/> {translation.translation.join(",")}</p>
            })}


        </div>


    }

    render() {

        const {wordItem} = this.props

        return (

            <Card fluid>
                <Card.Content header={this.generateHeader(wordItem)}/>
                <Card.Content>

                    {wordItem.type === "verb" ?
                        <ViewMore initialHeight={'145px'}>
                            {this.renderTranslations(wordItem)}
                            {this.renderConjugation(wordItem)}
                        </ViewMore>
                        :
                        <div>
                            {this.renderTranslations(wordItem)}
                        </div>
                    }



                </Card.Content>
            </Card>

        )
    }

}


export default WordDescription;
