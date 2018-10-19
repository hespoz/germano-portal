import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import Layout from '../components/Layout';
import Search from '../components/search/Search';
import DeleteBucket from '../components/bucket/DeleteBucket'
import {
    fetchBuckets,
    saveBucket,
    openBucketModal,
    openDeleteBucketModal,
    fetchLastBuckets
} from "../actions/bucketAction"
import MyNotes from "../components/bucket/notes/MyNotes";
import Welcome from "../components/bucket/Welcome";
import {map} from "lodash"
import Cookies from 'js-cookie'


class Index extends Component {

    state = {
        activeIndex: 0,
        newSentence: ""
    }

    static async getInitialProps({store, isServer, query}) {

        await store.execSagaTasks(isServer, dispatch => {
            dispatch(fetchLastBuckets(10));
        })


        if (query.username) {
            await store.execSagaTasks(isServer, dispatch => {
                dispatch(fetchBuckets(query.username));
            })

            return {
                buckets: store.getState().buckets.buckets || [],
                urlUserName: query.username,
                lastBuckets: store.getState().buckets.lastBuckets
            }

        } else {
            return {
                buckets: [],
                urlUserName: null,
                lastBuckets: store.getState().buckets.lastBuckets
            }
        }


    }

    componentDidMount = () => {
        if (!this.props.urlUserName && Cookies.get("userName")) {
            this.props.fetchBuckets(Cookies.get("userName"))
        }
    }

    handleClick = (index) => {
        const {activeIndex} = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({activeIndex: newIndex})
    }

    onChangeNewSentence = (e, {value}) => this.setState({newSentence: value})

    render() {


        const {buckets, userId, userName, urlUserName, bucketOwnerName, lastBuckets} = this.props

        return (
            <Layout>

                <DeleteBucket/>

                <div
                    className={'row justify-content-md-center justify-content-lg-center justify-content-sm-center'}>
                    <div className={'col-12 col-md-6'}> {/*col-12 col-sm-12 col-md-5 col-lg-6 col-xl-12*/}
                        <Search/>
                    </div>
                </div>


                <div className={"mt-16"}>
                    {this.props.urlUserName || userName || buckets.length > 0 ?

                        <MyNotes
                            bucketOwnerName={bucketOwnerName}
                            buckets={buckets}
                            userId={userId}
                            userName={userName}
                            urlUserName={urlUserName}
                            openBucketModal={this.props.openBucketModal}
                            openDeleteBucketModal={this.props.openDeleteBucketModal}
                        />

                        :

                        <Welcome lastBuckets={lastBuckets}/>

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
    userName: state.auth.userName
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    saveBucket, openBucketModal, openDeleteBucketModal, fetchBuckets
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Index);
