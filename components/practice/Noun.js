import React, { Component } from 'react'
import { Card, Form, Button } from 'semantic-ui-react'
import { includes } from 'lodash'


const initialState = {
    checked:false,
    translation:'',
    translation_error:false,
    article:'',
    article_error:false,
    plural:'',
    plural_error:false,
    points: 0
}

class Noun extends Component {

    state = initialState

    handleChange = (e, {name, value}) => this.setState({
        [name] : value
    })

    calculatePoints = (validTranslation, validArticle, validPlural) => {
        let points = 0
        if(validTranslation) points++
        if(validArticle) points++
        if(validPlural) points++
        return points
    }

    onNext = () => {
        this.setState(initialState)
        this.props.next()
    }

    onCheck = () => {
        //Calculate how many points.
        const { translation, article, plural } = this.state
        const { word } = this.props

        const validTranslation = includes(word.translations[0].translation, translation)
        const validArticle = word.article === article
        const validPlural = word.plural === plural

        this.setState({
            checked:true,
            translation_error: !validTranslation,
            article_error: !validArticle,
            plural_error: !validPlural,
            points: this.calculatePoints(validTranslation, validArticle, validPlural)
        })


    }

    render() {

        const { checked, translation, plural, article, translation_error, article_error, plural_error } = this.state
        const { word } = this.props

        if(!word) return null

        return (
            <Card fluid>
                <Card.Content header={word.word} />
                <Card.Content>
                    <Card.Description>
                        <Form>
                            <Form.Input name='translation' size='small' fluid label='Traduccion' placeholder='Traduccion' onChange={this.handleChange} value={translation}/>
                            {translation_error ? <p className={"answers"}>{word.translations[0].translation.join(',')}</p> : null}
                            <Form.Group inline>
                                <label>Articulo</label>
                                <Form.Radio
                                    name='article'
                                    size='small'
                                    label='der'
                                    value='der'
                                    checked={article === 'der'}
                                    onChange={this.handleChange}
                                />
                                <Form.Radio
                                    name='article'
                                    size='small'
                                    label='die'
                                    value='die'
                                    checked={article === 'die'}
                                    onChange={this.handleChange}
                                />
                                <Form.Radio
                                    name='article'
                                    size='small'
                                    label='das'
                                    value='das'
                                    checked={article === 'das'}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            {article_error ? <p className={"answers"}>{word.article}</p> : null}
                            <Form.Input name='plural' fluid size='small' label='Plural' placeholder='Plural' onChange={this.handleChange} value={plural}/>
                            {plural_error ? <p className={"answers"}>{word.plural}</p> : null}
                        </Form>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    {checked ?
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

export default Noun;
