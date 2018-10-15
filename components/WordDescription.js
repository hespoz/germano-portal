import React, {Component} from "react";
import {Card, Flag, Table, Icon} from 'semantic-ui-react'
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import Link from 'next/link'
import {get} from 'lodash';

import {openSendToBucketModal} from '../actions/bucketAction'

import ViewMore from "./ViewMore";

class WordDescription extends Component {


    generateHeaderText = (item) => {
        return item.type === 'noun' ? `${item.article} ${item.word} - plural: die ${item.plural}` : `${item.word} - ${item.perfect}`
    }


    generateHeaderContent = (item) => {
        return <div id="header">
            <div id="header-text">
                <Flag name={'de'}/> {this.generateHeaderText(item)}
            </div>

            <div id="header-actions">

                {this.props.hasToken ?
                    <Icon name='add' className="link" onClick={() => this.props.openSendToBucketModal(item._id)}/>
                    :
                    null
                }

                <Link as={`/word/${item._id}`} href={`/word/${item._id}`} className="link" target="_blank">
                    <Icon name='window maximize outline'/>
                </Link>

            </div>

            <style jsx>{`

                        #header {
                            display:flex;
                            flex-direction:row;
                        }

                        #header-text {
                            width:93%;
                        }

                        #header-actions {
                            display:flex;
                            align-items: center;
                            justify-content: center;
                        }

                   `}</style>

        </div>
    }


    renderConjugation = (conjugations) => {

        if (conjugations === undefined || conjugations === null || conjugations.length === 0) {
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
                    <Table.HeaderCell textAlign={'center'}>Language</Table.HeaderCell>
                    <Table.HeaderCell textAlign={'center'}>Translation</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            {get(wordItem, 'translations').map((translation, index) => {
                return <Table.Row key={index}>
                    <Table.Cell textAlign={'center'}><Flag
                        name={'es'}/></Table.Cell>
                    <Table.Cell textAlign={'center'}>{translation.translation.join(",")}</Table.Cell>
                </Table.Row>
            })}


        </Table>


    }

    renderVerb = (fullHeight, wordItem) => {

        const conjugation_present = get(wordItem, 'conjugation_present')
        const conjugation_past = get(wordItem, 'conjugation_past')

        if (fullHeight) {

            return <div>
                {this.renderTranslations(wordItem)}
                {this.renderConjugation(conjugation_present)}
                {this.renderConjugation(conjugation_past)}
            </div>
        } else {
            return <ViewMore initialHeight={'145px'}>
                {this.renderTranslations(wordItem)}
                {this.renderConjugation(conjugation_present)}
                {this.renderConjugation(conjugation_past)}
            </ViewMore>
        }
    }

    render() {

        const {wordItem, fullHeight} = this.props

        if (!wordItem) return null

        return (

            <Card fluid>
                <Card.Content header={this.generateHeaderContent(wordItem)}/>
                <Card.Content>

                    {wordItem.type === "verb" ?

                        this.renderVerb(fullHeight, wordItem)

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


const mapStateToProps = (state) => ({
    hasToken: state.auth.hasToken,
    userId: state.auth.userId
});

const mapDispatchToProps = (dispatch) => bindActionCreators({openSendToBucketModal}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(WordDescription);
