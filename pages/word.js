import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import Layout from '../components/Layout';
import WordDescription from '../components/WordDescription'
import { openWordFormModal, searchById } from "../actions/dictionaryAction"

class Word extends Component {

    static async getInitialProps({store, isServer,query}) {

        await store.execSagaTasks(isServer, dispatch => {
            dispatch(searchById(query.wordId));
        })

        return {
            wordReferenceData: store.getState().dictionary.wordReferenceData
        }

    }

    render() {

        const {wordReferenceData} = this.props

        return (
            <Layout>
                <div
                    className={'row justify-content-md-center justify-content-lg-center justify-content-sm-center content-pos'}>
                    <div className={'col-md-7'}>
                        <WordDescription wordItem={wordReferenceData} openWordFormModal={this.props.openWordFormModal} fullHeight/>
                    </div>
                </div>
            </Layout>
        )
    }

}


const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    openWordFormModal
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Word);