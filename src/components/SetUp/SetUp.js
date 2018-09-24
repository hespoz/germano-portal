import React, { Component } from 'react';
import {Form, Dropdown,  Button} from 'semantic-ui-react'
import {CATEGORIES, WORD_TYPES} from '../../constants'

class SetUp extends Component {

    state = {
        types: ['verb','noun', 'modal_verb'],
        categories: ['Todas']
    }

    onOptionChange = (event, {name, value}) => {
        this.setState({
            [name]:value
        })
    }

    render() {
        return (
            <Form>
                <Form.Field>
                    <label>Select word type</label>
                    <Dropdown name="types" placeholder='State' size='small' fluid multiple selection
                              options={WORD_TYPES} value={this.state.types} onChange={this.onOptionChange}/>
                </Form.Field>
                <Form.Field>
                    <label>Select category</label>
                    <Dropdown name="categories" placeholder='State' size='small' fluid multiple selection
                              options={CATEGORIES} value={this.state.categories} onChange={this.onOptionChange}/>
                </Form.Field>
                <Button basic fluid color='blue' onClick={() => this.props.startPractice(this.state)}>
                    Start practice
                </Button>
            </Form>
        );
    }
}

export default SetUp;
