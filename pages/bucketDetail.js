import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {fetchBucketDetails} from "../actions/bucketAction"
import Bucket from "../components/bucket/Bucket";
import Layout from '../components/Layout';
import DeleteBucket from "../components/bucket/DeleteBucket";
import Search from "../components/search/Search";


class BucketsDetails extends Component {

    static async getInitialProps({store, isServer, query}) {
        await store.execSagaTasks(isServer, dispatch => {
            dispatch(fetchBucketDetails(query.bucketId));
        })

        return {
            bucketDetail : store.getState().buckets.bucketDetail
        }
    }

    render() {
        const {bucketDetail} = this.props
        return <Layout>
            <DeleteBucket/>

            <div
                className={'row justify-content-md-center justify-content-lg-center justify-content-sm-center'}>
                <div className={'col-md-6'}>
                    <Search/>
                </div>
            </div>

            <Bucket bucket={bucketDetail}/>
        </Layout>
    }

}

const mapStateToProps = (state) => ({
    bucketDetail: state.buckets.bucketDetail,
    fetchBucketDetailsError: state.buckets.fetchBucketDetailsError,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchBucketDetails
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BucketsDetails);
