import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import { Header, Tab } from 'semantic-ui-react'
import Layout from '../components/Layout';
import Search from '../components/search/Search';
import SetUp from "../components/setUp/SetUp";
import Vocabulary from "../components/practice/Vocabulary";
import {fetchWords, toggleVocabularyPractice} from "../actions/dictionaryAction";


class Index extends Component {

    state = {activeItem: 'home'}

    /*
    * Here invoke the server middleware (Our server that calls other endpoints) directly and dispatch the store
     */
    static async getInitialProps({store, isServer}) {

        /*await store.execSagaTasks(isServer, dispatch => {
            dispatch(fetchProjects());
        });

        console.log('');
        console.log('###############################');
        console.log('### Fetched today NASA APOD ###');
        console.log('###############################');
        console.log(store.getState().project.projectList);
        console.log('');

        return {
            projectList: store.getState().project.projectList,
            projectDetails: store.getState().project.projectDetails
        };*/
    }

    startPractice = (params) => {
        this.props.toggleVocabularyPractice()
        this.props.fetchWords(params)
    }

    closePractice = () => {
        this.props.toggleVocabularyPractice()
    }

    renderPanes = () => {
       return [
            { menuItem: 'Practice Vocabulary', render: () => <Tab.Pane attached={false}><SetUp startPractice={this.startPractice}/></Tab.Pane> },
            { menuItem: 'Last buckets created', render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane> }
        ]
    }

    render() {


        const { vocabularyPractice, wordsToPractice } = this.props

        return (

            <Layout>


                {!vocabularyPractice ?

                    <div>

                        <div
                            className={'row justify-content-md-center justify-content-lg-center justify-content-sm-center'}>
                            <div className={'col-md-6'}>
                                <Search/>
                            </div>
                        </div>


                        <div
                            className={'row justify-content-md-center justify-content-lg-center justify-content-sm-center content-pos'}>
                            <div className={'col-md-6'}>

                                <div className={'row'}>
                                    <div className={'col-12 col-sm-12 col-md-5 col-lg-6 col-xl-10'}>

                                        <div className={'row'}>
                                            <div className={'col-xl-12 text-center'}>
                                                <Header>Or practice vocabulary</Header>
                                            </div>
                                        </div>


                                        <Tab menu={{ secondary: true }} panes={this.renderPanes()}/>







                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                    :
                    null
                }


                {vocabularyPractice ?
                    <div
                        className={'row justify-content-md-center justify-content-lg-center justify-content-sm-center content-pos'}>
                        <div className={'col-md-7'}>
                            <Vocabulary closePractice={this.closePractice} wordsToPractice={wordsToPractice}/>
                        </div>
                    </div>
                    :
                    null
                }


                <style jsx>{`


                  .content-pos {
                    margin-top: 20px;

                  }

                `}</style>


            </Layout>
        );
    }

}

const mapStateToProps = (state) => ({
    vocabularyPractice: state.dictionary.vocabularyPractice,
    fetchWordsError: state.dictionary.fetchWordsError,
    wordsToPractice: state.dictionary.wordsToPractice
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchWords,
    toggleVocabularyPractice
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Index);
