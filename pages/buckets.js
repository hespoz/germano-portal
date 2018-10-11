import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import Link from 'next/link';
import Layout from '../components/Layout';
import Search from '../components/search/Search';
import DeleteBucket from '../components/bucket/DeleteBucket'
import { Accordion, Icon } from 'semantic-ui-react'
import { fetchBuckets, saveBucket, openBucketModal, openDeleteBucketModal} from "../actions/bucketAction"
import Bucket from "../components/bucket/Bucket";
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
            buckets: store.getState().buckets.buckets,
            urlUserName: query.username
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

                <DeleteBucket/>

                <div
                    className={'row justify-content-md-center justify-content-lg-center justify-content-sm-center'}>
                    <div className={'col-md-6'}>
                        <Search/>
                    </div>
                </div>


                <div
                    className={'row justify-content-md-center justify-content-lg-center justify-content-sm-center content-pos'}>
                    <div className={'col-md-12'}>

                        <div className={'row mb-16'}>

                            <div className={'col-md-8'}>
                                <h3>My buckets</h3>
                            </div>

                            {this.props.userName === this.props.urlUserName ?
                                <div className={'col-md-4 text-right'}>
                                    <Icon size='large' name='add' onClick={this.props.openBucketModal}/>
                                </div>
                                :
                                null
                            }

                        </div>



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
                                                    {value.ownerId === this.props.userId ?  <Icon size='large' name='trash alternate' onClick={() => this.props.openDeleteBucketModal(value._id)}/> : null}

                                                    <Link as={`/bucket/${value._id}`} href={`/bucket/${value._id}`}>
                                                        <Icon size='large' name='share alternate'/>
                                                    </Link>

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
    fetchBucketsError: state.buckets.fetchBucketsError,
    hasToken: state.auth.hasToken,
    userId: state.auth.userId,
    userName: state.auth.userName
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    saveBucket, openBucketModal, openDeleteBucketModal
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Buckets);
