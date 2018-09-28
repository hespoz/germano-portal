import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import Layout from '../components/Layout';
import Search from '../components/search/Search';
import WordAdded from '../components/WordAdded'
import ScrollContainer from '../components/ScrollContainer'
import Sentence from '../components/bucket/Sentence'
import BucketName from '../components/bucket/BucketName'
import { Accordion, Icon, List, Header } from 'semantic-ui-react'
import { fetchBuckets, saveBucket } from "../actions/bucketAction"
import {map} from "lodash"
import Bucket from "../components/bucket/Bucket";


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
                                        <Bucket bucket={value}/>
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