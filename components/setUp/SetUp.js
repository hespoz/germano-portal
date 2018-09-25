import React, { Component } from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {Form, Dropdown,  Button} from 'semantic-ui-react'
import {CATEGORIES, WORD_TYPES} from '../../constants'

class SetUp extends Component {

    state = {
        types: ['verb','noun', 'modal_verb'],
        categories: ['Todas'],
        bucket:'all'
    }

    onOptionChange = (event, {name, value}) => {
        this.setState({
            [name]:value
        })
    }

    render() {

        const { bucket } = this.state

        const { hasToken } = this.props


        return (
            <Form>
                {hasToken ?

                    <Form.Group inline>
                        <Form.Radio
                            name='bucket'
                            size='small'
                            label='All words'
                            value='all'
                            checked={bucket === 'all'}
                            onChange={this.onOptionChange}
                        />
                        <Form.Radio
                            name='bucket'
                            size='small'
                            label='Favorites words'
                            value='favorite'
                            checked={bucket === 'favorite'}
                            onChange={this.onOptionChange}
                        />
                    </Form.Group>

                    :

                    null

                }

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

const mapStateToProps = (state) => ({
    hasToken: state.auth.hasToken
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(SetUp);
