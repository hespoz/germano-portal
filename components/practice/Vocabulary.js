import React, { Component } from 'react';
import Noun from "./Noun";
import Verb from "./Verb";
import {bindActionCreators} from "redux";
import {openAuthModal} from "../../actions/authAction";
import {
    openWordFormModal,
    toggleVocabularyPractice
} from "../../actions/dictionaryAction";


import {connect} from "react-redux";
import {Icon, Message} from "semantic-ui-react";


class Vocabulary extends Component {

    state = {
        currentPosition:0,
        showAddWord: false
    }

    static async getInitialProps({store, isServer}) {
        this.props.fetchWords(this.props.filterParams)
    }


    addNewWord = () => {
        if(this.props.hasToken) {
            this.props.toggleVocabularyPractice()
            this.props.openWordFormModal()
        } else {
            this.props.openAuthModal()
        }
    }

    renderAddWord = () => {
        return <Message fluid>
            <Message.Header>Opss!</Message.Header>
            <p>That word does not exist in our database, please add it!</p>
            <a href={"javascript:void(0)"} onClick={this.addNewWord}>Add keyword</a>
        </Message>
    }

    next = () => {
        if (this.state.currentPosition - 1 < this.props.wordsToPractice.length) {
            this.setState({
                currentPosition: this.state.currentPosition + 1
            },() => console.log(this.state.currentPosition))
        } else {
            this.setState({showAddWord: true})
        }
    }

    renderCard = () => {
        const word = this.props.wordsToPractice[this.state.currentPosition]
        if (word) {
            if (word.type==='verb') {
                return <Verb word={word} next={this.next}/>
            } else {
                return <Noun word={word} next={this.next}/>
            }

        } else {
            this.setState({showAddWord: true})
        }
    }

    render() {
        const {showAddWord} = this.state
        const {wordsToPractice} = this.props


        if(!wordsToPractice) return null;

        return (
            <div>


                <div className={"row"}>
                    <div className={"col-md-12 text-right"}>
                        <Icon name={"close"} size='large' onClick={this.props.closePractice}></Icon>
                    </div>
                </div>


                {showAddWord ? this.renderAddWord() : this.renderCard()}


            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    hasToken: state.auth.hasToken
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    openWordFormModal,
    openAuthModal,
    toggleVocabularyPractice
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Vocabulary);
