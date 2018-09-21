import React, { Component } from 'react'
import { Card, Form, Button, Accordion, Icon } from 'semantic-ui-react'
import Conjugations from "./Conjugations";

class Verb extends Component {

    state = { activeIndex: 0 }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }


    handleChangeText = (e, {name, value}) => this.setState({
        [name] : value
    })

    render() {

        const { activeIndex } = this.state

        return (
            <Card fluid>
                <Card.Content header='Kaufen' />
                <Card.Content>
                    <Card.Description>
                        <Form>
                            <Form.Input size='small' fluid label='Traduccion' placeholder='Traduccion' onChange={this.handleChangeText}/>
                            <Form.Input size='small' fluid label='Perfect' placeholder='Perfect' onChange={this.handleChangeText}/>

                            <Accordion styled fluid>

                                <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                                    <Icon name='dropdown' />
                                    Conjugacion Perfecto
                                </Accordion.Title>
                                <Accordion.Content active={activeIndex === 0}>
                                    <Conjugations/>
                                </Accordion.Content>

                                <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                                    <Icon name='dropdown' />
                                    Conjugacion Prasens
                                </Accordion.Title>
                                <Accordion.Content active={activeIndex === 1}>
                                    <Conjugations/>
                                </Accordion.Content>

                            </Accordion>



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

export default Verb;
