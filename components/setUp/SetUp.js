import React, { Component } from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {Form, Dropdown,  Button} from 'semantic-ui-react'
import {CATEGORIES, WORD_TYPES} from '../../constants'
import {fetchBuckets} from '../../actions/bucketAction'
import {map, cloneDeep, filter} from "lodash"

class SetUp extends Component {

    state = {
        types: ['all'],
        bucketsSelected: ['all'],
        categories: ['all'],
        wordsFrom:'all',
        bucketList:[]
    }

    componentWillReceiveProps = (props) => {
        let bucketList = cloneDeep(props.buckets)

        bucketList = map(bucketList, (b) => {
            return {key:b._id, value:b._id, text: b.name}
        })

        bucketList.push({key:"all", value:"all", text: "Todos"})

        this.setState({bucketList})
    }

    onOptionChange = (event, {name, value}) => {
        this.setState({
            [name]:value
        })

        if(name === "wordsFrom" && value==="fromMyBuckets"){
            this.props.fetchBuckets(this.props.userName)
        }
    }

    onSelectChange = (event, {name, value}) => {
        if(value.length === 0){
            this.setState({[name] : ['all']})
        } else {
            this.setState({[name]: filter(value, (v) => v !== "all")})
        }
    }

    render() {

        const { wordsFrom, bucketsSelected, bucketList } = this.state

        const { hasToken} = this.props


        return (
            <Form>
                {hasToken ?

                    <Form.Group inline>
                        <Form.Radio
                            name='wordsFrom'
                            size='small'
                            label='All words'
                            value='all'
                            checked={wordsFrom === 'all'}
                            onChange={this.onOptionChange}
                        />
                        <Form.Radio
                            name='wordsFrom'
                            size='small'
                            label='Words added to my buckets'
                            value='fromMyBuckets'
                            checked={wordsFrom === 'fromMyBuckets'}
                            onChange={this.onOptionChange}
                        />
                    </Form.Group>

                    :

                    null

                }

                {wordsFrom === "fromMyBuckets" ?
                    <Form.Field>
                        <label>Select word type</label>
                        <Dropdown name="bucketsSelected" placeholder='Select buckets' size='small' fluid multiple selection
                                  options={bucketList} value={bucketsSelected} onChange={this.onSelectChange}/>
                    </Form.Field>
                    :
                    null
                }

                <Form.Field>
                    <label>Select word type</label>
                    <Dropdown name="types" placeholder='State' size='small' fluid multiple selection
                              options={WORD_TYPES} value={this.state.types} onChange={this.onSelectChange}/>
                </Form.Field>
                <Form.Field>
                    <label>Select category</label>
                    <Dropdown name="categories" placeholder='State' size='small' fluid multiple selection
                              options={CATEGORIES} value={this.state.categories} onChange={this.onSelectChange}/>
                </Form.Field>
                <Button basic fluid color='blue' onClick={() => this.props.startPractice({categories: this.state.categories, types:this.state.types, wordsFrom:this.state.wordsFrom,bucketsSelected: this.state.bucketsSelected})}>
                    Start practice
                </Button>
            </Form>
        );
    }
}

const mapStateToProps = (state) => ({
    hasToken: state.auth.hasToken,
    userName: state.auth.userName,
    buckets: state.buckets.buckets
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchBuckets
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(SetUp);
