import React, { Component } from 'react'
import { Card, Form, Button } from 'semantic-ui-react'

class Noun extends Component {

    state = {}

    handleChangeArticle = (e, { value }) => this.setState({ value })

    handleChangeText = (e, {name, value}) => this.setState({
        [name] : value
    })

    render() {

        const { value } = this.state

        return (
            <Card fluid>
                <Card.Content header='Baum' />
                <Card.Content>
                    <Card.Description>
                        <Form>
                            <Form.Input size='small' fluid label='Traduccion' placeholder='Traduccion' onChange={this.handleChangeText}/>
                            <Form.Group inline>
                                <label>Articulo</label>
                                <Form.Radio
                                    size='small'
                                    label='der'
                                    value='der'
                                    checked={value === 'der'}
                                    onChange={this.handleChangeArticle}
                                />
                                <Form.Radio
                                    size='small'
                                    label='die'
                                    value='die'
                                    checked={value === 'die'}
                                    onChange={this.handleChangeArticle}
                                />
                                <Form.Radio
                                    size='small'
                                    label='das'
                                    value='das'
                                    checked={value === 'das'}
                                    onChange={this.handleChangeArticle}
                                />
                            </Form.Group>
                            <Form.Input fluid size='small' label='Plural' placeholder='Plural' onChange={this.handleChangeText}/>
                        </Form>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button fluid basic color='blue'>
                        Check
                    </Button>
                </Card.Content>
            </Card>
        );
    }
}

export default Noun;
