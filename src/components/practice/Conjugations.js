import React, { Component } from 'react'
import { Card, Form, Button, Accordion, Icon } from 'semantic-ui-react'

class Conjugations extends Component {

    state = { activeIndex: 0 }

    handleChangeText = (e, {name, value}) => this.setState({
        [name] : value
    })

    render() {

        return (
            <Form>
                <Form.Input size='small' fluid label='ich' onChange={this.handleChangeText}/>
                <Form.Input size='small' fluid label='du' onChange={this.handleChangeText}/>
                <Form.Input size='small' fluid label='es/sie/es' onChange={this.handleChangeText}/>
                <Form.Input size='small' fluid label='ihr' onChange={this.handleChangeText}/>
                <Form.Input size='small' fluid label='wir' onChange={this.handleChangeText}/>
                <Form.Input size='small' fluid label='Sie' onChange={this.handleChangeText}/>
            </Form>
        );
    }
}

export default Conjugations;
