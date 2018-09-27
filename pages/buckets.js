import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import Layout from '../components/Layout';
import Search from '../components/search/Search';
import WordDescription from '../components/WordDescription'
import WordAdded from '../components/WordAdded'
import ScrollContainer from '../components/ScrollContainer'
import Sentence from '../components/bucket/Sentence'
import { Accordion, Icon, List, Header } from 'semantic-ui-react'
import { fetchBuckets, saveBucket } from "../actions/bucketAction"
import {map} from "lodash"


class Buckets extends Component {

    state = {
        activeIndex: 0,
        newSentence: ""
    }


    static async getInitialProps({store, isServer, query}) {

        await store.execSagaTasks(isServer, dispatch => {
            dispatch(fetchBuckets(query.username));
        })

        return {
            buckets: store.getState().buckets.buckets
        }

    }

    handleClick = (index) => {
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    onChangeNewSentence = (e, {value}) => this.setState({newSentence:value})

    renderWordDescriptions = (words) => {
        return words.map((word) => {
            return <WordDescription wordItem={word} simple />
        })
    }

    renderSentences = (bucket) => {
        return <List>
            {bucket.sentences.map((sentence, index) => {
                return <List.Item>
                    <Sentence index={index} bucket={bucket} sentence={sentence} editMode/>
                </List.Item>
            })}
        </List>
    }

    renderWordsAdded = (words, bucket) => {
        return <ScrollContainer size={'100%'}>
            <List>
                {words.map((word) => {
                    return <List.Item>
                            <WordAdded word={word} onDeleteWord={this.onDeleteWord} bucket={bucket}/>
                        </List.Item>
                })}
            </List>
        </ScrollContainer>
    }

    parseBucketForSend = (bucket) => {
        const wordsIds = map(bucket.words, (value) => String(value._id))
        return {
            _id:bucket._id,
            name: bucket.name,
            sentences: bucket.sentences,
            wordsIds
        }
    }


    onDeleteWord = (wordsIds, bucket) => {
        let sendBucket = this.parseBucketForSend(bucket)
        sendBucket.wordsIds = wordsIds
        this.props.saveBucket(sendBucket)
    }

    render() {

        const {activeIndex} = this.state
        const {buckets} = this.props


        return (
            <Layout>

                <div
                    className={'row justify-content-md-center justify-content-lg-center justify-content-sm-center'}>
                    <div className={'col-md-6'}>
                        <Search/>
                    </div>
                </div>


                <div
                    className={'row justify-content-md-center justify-content-lg-center justify-content-sm-center content-pos'}>
                    <div className={'col-md-12'}>
                        <h1>My buckets</h1>

                        <Accordion styled fluid>

                            {buckets.map((value,index) => {
                                return <div>
                                    <Accordion.Title active={activeIndex === index} index={index} >


                                        <div className={"row"}>
                                            <div className={"col-md-10"} onClick={(e) => this.handleClick(index)}>
                                                <Icon name='dropdown' />{value.name}
                                            </div>
                                            <div className={"col-md-2 text-right"}>
                                                <a href={"javascript:void(0);"} style={{
                                                    color: 'black',
                                                    textDecoration: 'none',
                                                    backgroundColor: 'none'
                                                }}>
                                                    <Icon size='large' name='play'/>
                                                    <Icon size='large' name='trash alternate'/>
                                                    <Icon size='large' name='share alternate'/>
                                                </a>
                                            </div>
                                        </div>


                                    </Accordion.Title>
                                    <Accordion.Content active={activeIndex === index}>

                                        <div className={"row"}>
                                            <div className={"col-md-8"}>

                                                <Sentence bucket={value}/>

                                                <Header as='h2'>Sentences</Header>

                                                {this.renderSentences(value)}

                                            </div>
                                            <div className={"col-md-4"}>
                                                {this.renderWordsAdded(value.words, value)}
                                            </div>
                                        </div>

                                    </Accordion.Content>
                                </div>
                            })}

                        </Accordion>


                    </div>
                </div>
            </Layout>
        )
    }

}


const mapStateToProps = (state) => ({
    buckets: state.buckets.buckets,
    fetchBucketsError: state.buckets.fetchBucketsError
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    saveBucket
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Buckets);