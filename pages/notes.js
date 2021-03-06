import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import Layout from "../components/Layout";
import Search from "../components/search/Search";
import MyNotes from "../components/bucket/notes/MyNotes";
import {fetchBuckets, openBucketModal, openDeleteBucketModal, saveBucket} from "../actions/bucketAction";
import {Message} from 'semantic-ui-react';

class Notes extends Component {

    state = {
        activeIndex: 0,
        newSentence: ""
    }

    static async getInitialProps({store, isServer, query}) {
        await store.execSagaTasks(isServer, dispatch => {
            dispatch(fetchBuckets(query.username));
        })

        return {
            buckets: store.getState().buckets.buckets || [],
            urlUserName: query.username
        }

    }

    handleClick = (index) => {
        const {activeIndex} = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({activeIndex: newIndex})
    }

    onChangeNewSentence = (e, {value}) => this.setState({newSentence: value})


    render() {

        const {buckets, userId, userName, urlUserName, bucketOwnerName, verified} = this.props


        return (
            <Layout>

                <div
                    className={'row justify-content-md-center justify-content-lg-center justify-content-sm-center'}>
                    <div className={'col-12 col-md-6'}>
                        <Search/>
                    </div>
                </div>

                <div className={"mt-16"}>
                    {userName || buckets.length > 0  ?

                        <MyNotes
                            bucketOwnerName={bucketOwnerName}
                            buckets={buckets}
                            userId={userId}
                            userName={userName}
                            urlUserName={urlUserName}
                            openBucketModal={this.props.openBucketModal}
                            openDeleteBucketModal={this.props.openDeleteBucketModal}
                            verified={verified}
                        />

                        :

                        null

                    }
                </div>

            </Layout>
        )
    }

}


const mapStateToProps = (state) => ({
    buckets: state.buckets.buckets,
    lastBuckets: state.buckets.lastBuckets,
    bucketOwnerName: state.buckets.bucketOwnerName,
    fetchBucketsError: state.buckets.fetchBucketsError,
    hasToken: state.auth.hasToken,
    userId: state.auth.userId,
    userName: state.auth.userName,
    verified:state.auth.verified
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    saveBucket, openBucketModal, openDeleteBucketModal, fetchBuckets
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Notes);
