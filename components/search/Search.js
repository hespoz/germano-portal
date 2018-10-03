import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import WordDescription from '../WordDescription';
import SendToBucket from './SendToBucket'
import {Form, List, Input, Message } from 'semantic-ui-react'

import {
    searchByKeyword,
    openSearch,
    closeSearch
} from '../../actions/dictionaryAction'
import {openAuthModal} from "../../actions/authAction";
import {openWordFormModal, closeWordFormModal} from "../../actions/dictionaryAction";

class Search extends Component {

    state = {
        keyword: ''
    }

    onSearchInputChange = (e, data) => {
        this.setState({keyword: data.value}, () => {
            this.props.searchByKeyword(this.state.keyword, false)
        })
    }

    onSearchInputFocus = () => {
        this.props.openSearch()
        this.props.searchByKeyword(this.state.keyword, false)
    }

    onClose = (e) => {
        if (e.target.id === "container-results" || e.target.id === "overlay") {
            this.props.closeSearch()
        }
    }

    closeDialog = () => this.props.closeWordFormModal()

    addNewWord = () => {
        if(this.props.hasToken) {
            this.props.closeSearch()
            this.props.openWordFormModal()
        } else {
            this.props.openAuthModal()
        }
    }

    render() {

        const {searchResult, open } = this.props

        return (
            <div>

                <SendToBucket/>

                {open ?
                    <div id={"overlay"} onClick={this.onClose}>
                    </div>
                    :
                    null
                }
                <div>

                    <div className={'row'}>
                        <div className={'col-12 col-sm-12 col-md-5 col-lg-6 col-xl-10'}>
                            <Form>
                                <Form.Field>
                                    <label>Search words added by users in german or spanish</label>
                                    <Input icon='search'
                                           size='small'
                                           placeholder='Search...' fluid
                                           onChange={this.onSearchInputChange}
                                           onFocus={this.onSearchInputFocus}
                                           value={this.state.keyword}/>
                                </Form.Field>
                            </Form>
                        </div>
                    </div>


                    {open ?

                        <div id="container-results" className={'row'} onClick={this.onClose}>
                            <div  className={'col-12 col-sm-12 col-md-6 col-lg-6 col-xl-10'}>
                                {searchResult.length === 0 && this.state.keyword.length > 0 ?

                                    <Message fluid>
                                        <Message.Header>Opss!</Message.Header>
                                        <p>That word does not exist in our database, please add it!</p>
                                        <a href={"javascript:void(0)"} onClick={this.addNewWord}>Add keyword</a>
                                    </Message>

                                    :

                                    <List>

                                        {searchResult.map((item, index) => {
                                            return <WordDescription wordItem={item} openWordFormModal={this.props.openWordFormModal}/>
                                        })}

                                    </List>


                                }
                            </div>
                        </div>

                        :
                        null


                    }




                </div>

                <style jsx>{`

                  #overlay {
                    position: fixed;
                    z-index:9;
                    width: 100%;
                    height: 100%;
                    margin: 0;
                    padding: 0;
                    left: 0;
                    background-color:rgba(0,0,0,0);
                    top: 0;
                  }

                  #container-results {
                    margin-top: 0px;
                    position: absolute;
                    width: 100%;
                    padding-top: 6px;
                    z-index: 111;
                  }

                `}</style>

            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    searchResult: state.dictionary.searchResult,
    open: state.dictionary.open,
    hasToken: state.auth.hasToken
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    searchByKeyword: searchByKeyword,
    closeSearch: closeSearch,
    openSearch: openSearch,
    openAuthModal,
    openWordFormModal,
    closeWordFormModal
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Search);
