import React, { Component } from 'react'
import { Card, Form, Button, Accordion, Icon } from 'semantic-ui-react'
import Conjugations from "./Conjugations";
import { includes } from 'lodash'

const initialState = {
    activeIndex: 0,
    triggerValidationVerb:false,
    checked:false,
    points:0,
    translation:'',
    translation_error:false,
    perfect:'',
    perfect_error:false
}


class Verb extends Component {

    state = initialState

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }


    handleChangeText = (e, {name, value}) => this.setState({
        [name] : value
    })

    calculatePoints = (validTranslation, validPerfect) => {
        let points = 0
        if(validTranslation) points++
        if(validPerfect) points++
        return points
    }

    onNext = () => {
        this.setState(initialState)
        this.props.next()
    }

    onCheck = () => {

        const { translation, perfect } = this.state
        const { word } = this.props

        const validTranslation = includes(word.translations[0].translation, translation)
        const validPerfect = word.perfect === perfect


        this.setState({
            triggerValidationVerb:true,
            translation_error: !validTranslation,
            perfect_error: !validPerfect,
            points: this.calculatePoints(validTranslation, validPerfect)
        })
    }

    updatePoints = (points) => {
        this.setState({points: this.state.points + points})
    }

    render() {

        const { activeIndex, triggerValidationVerb, translation, translation_error, perfect, perfect_error  } = this.state
        const { word } = this.props

        if(!word) return null

        return (
            <Card fluid>
                <Card.Content header={word.word} />
                <Card.Content>
                    <Card.Description>
                        <Form>
                            <Form.Input name='translation' size='small' fluid label='Traduccion' placeholder='Traduccion' onChange={this.handleChangeText} value={translation} error={triggerValidationVerb && translation_error}/>
                            {triggerValidationVerb ? <p className={"answers"}>{word.translations[0].translation.join(',')}</p> : null}

                            <Form.Input name='perfect' size='small' fluid label='Perfect' placeholder='Perfect' onChange={this.handleChangeText} value={perfect} error={triggerValidationVerb && perfect_error}/>
                            {triggerValidationVerb ? <p className={"answers"}>{word.perfect}</p> : null}

                            <Accordion styled fluid>

                                <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                                    <Icon name='dropdown' />
                                    Conjugacion Perfecto
                                </Accordion.Title>
                                <Accordion.Content active={activeIndex === 0}>
                                    <Conjugations triggerValidationVerb={triggerValidationVerb} conjugations={word.conjugation_present} updatePoints={this.updatePoints}/>
                                </Accordion.Content>

                                <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                                    <Icon name='dropdown' />
                                    Conjugacion Prasens
                                </Accordion.Title>
                                <Accordion.Content active={activeIndex === 1}>
                                    <Conjugations triggerValidationVerb={triggerValidationVerb} conjugations={word.conjugation_present} updatePoints={this.updatePoints}/>
                                </Accordion.Content>

                            </Accordion>




                        </Form>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    {triggerValidationVerb ?
                        <Button fluid basic color='blue' onClick={this.onNext}>
                            Next
                        </Button>
                        :
                        <Button fluid basic color='blue' onClick={this.onCheck}>
                            Check
                        </Button>
                    }
                </Card.Content>
                <style jsx>{`

                  .answers {
                    color: red;
                    margin-top: -10px !important;
                  }

                `}</style>
            </Card>
        );
    }
}

export default Verb;
