import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import Layout from '../components/Layout';
import Search from '../components/search/Search';
import DeleteBucket from '../components/bucket/DeleteBucket'
import {
    fetchLastBuckets
} from "../actions/bucketAction"
import NotesCreated from "../components/activity/NotesCreated";
import UserActivity from "../components/activity/UserActivity";
import Auth from "../components/auth/Auth";

class Index extends Component {

    state = {
        activeIndex: 0,
        newSentence: ""
    }

    static async getInitialProps({store, isServer}) {

        await store.execSagaTasks(isServer, dispatch => {
            dispatch(fetchLastBuckets(10));
        })

        return {
            lastBuckets: store.getState().buckets.lastBuckets
        }

    }

    render() {


        const {lastBuckets, hasToken} = this.props

        return (
            <Layout>

                <DeleteBucket/>

                <div
                    className={'row justify-content-md-center justify-content-lg-center justify-content-sm-center'}>
                    <div className={'col-12 col-md-6'}>
                        <Search/>
                    </div>
                </div>


                <div className={"row mt-16"}>

                    <div className={"col-md-8"}>
                        <NotesCreated lastBuckets={lastBuckets}/>
                    </div>

                    <div className={"col-md-4"}>

                        {hasToken ?
                            <UserActivity/>
                            :
                            <Auth/>
                        }

                    </div>


                </div>


            </Layout>
        )
    }

}


const mapStateToProps = (state) => ({
    lastBuckets: state.buckets.lastBuckets,
    hasToken: state.auth.hasToken,
    userId: state.auth.userId,
    userName: state.auth.userName
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Index);
