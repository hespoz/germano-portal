import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import Layout from '../components/Layout';
import Search from '../components/search/Search';
import DeleteBucket from '../components/bucket/DeleteBucket'
import {fetchBuckets, saveBucket, openBucketModal, openDeleteBucketModal} from "../actions/bucketAction"
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

        if (query.username) {
            await store.execSagaTasks(isServer, dispatch => {
                dispatch(fetchBuckets(query.username));
            })

            return {
                buckets: store.getState().buckets.buckets || [],
                urlUserName: query.username
            }

        } else {
            return {
                buckets: [],
                urlUserName: null
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


        const {buckets, userId, userName, urlUserName, bucketOwnerName} = this.props

        return (
            <Layout>

                <DeleteBucket/>

                <div
                    className={'row justify-content-md-center justify-content-lg-center justify-content-sm-center'}>
                    <div className={'col-md-6'}>
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

                        <Welcome/>

                    }
                </div>

            </Layout>
        )
    }

}


const mapStateToProps = (state) => ({
    buckets: state.buckets.buckets,
    bucketOwnerName:state.buckets.bucketOwnerName,
    fetchBucketsError: state.buckets.fetchBucketsError,
    hasToken: state.auth.hasToken,
    userId: state.auth.userId,
    userName: state.auth.userName
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    saveBucket, openBucketModal, openDeleteBucketModal, fetchBuckets
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Index);
