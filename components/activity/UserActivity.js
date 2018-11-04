import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {Segment, Header} from "semantic-ui-react";
import {get} from "lodash"
import Link from 'next/link';
import {translate} from "react-i18next";

import {
    fetchActivity
} from '../../actions/activityAction'


class UserActivity extends Component {

    componentDidMount = () => {
        this.props.fetchActivity(10)
    }

    renderBucketLink = (activity) => {
        return <Link as={`/bucket/${get(activity, "bucket._id")}`} href={`/bucket/${get(activity, "bucket._id")}`}>{get(activity, "bucket.name")}</Link>
    }

    renderReply = (index, activity) => {

        const {t} = this.props

        return <Segment key={index}>

            <div className={"row"}>
                <div className={"col-md-12"}>
                    <b>{get(activity, "fromUser.username")}</b>{t("comment.was.made")}{this.renderBucketLink(activity)}
                </div>
            </div>

            <div className={"row"}>
                <div className={"col-md-12"}>
                    <p className={"reference-comment"}>{`\"${get(activity, "comment")}\"`}</p>
                </div>
            </div>

        </Segment>
    }

    renderOwnActivity = (index, activity) => {
        const {t} = this.props

        return <Segment key={index}>

            <div className={"row"}>
                <div className={"col-md-12"}>
                    {t("comment.was.made")}{this.renderBucketLink(activity)} {t("of")} <b>{get(activity, "toUser.username")}</b>
                </div>
            </div>

            <div className={"row"}>
                <div className={"col-md-12"}>
                    <p className={"reference-comment"}>{`\"${get(activity, "comment")}\"`}</p>
                </div>
            </div>

        </Segment>
    }


    renderCommentFeed = (index, activity) => {

        if(String(this.props.userId) === String(activity.toUser._id)){
            return this.renderReply(index, activity)
        } else {
            return this.renderOwnActivity(index, activity)
        }

    }


    render() {

        const {activities, t} = this.props

        return <Segment>

            <div className={"row"}>
                <div className={"col-md-12 text-center"}>
                    <Header as='h2'>{t("your.activity")}</Header>
                </div>
            </div>

            <div className={"row mt-16 justify-content-center"}>
                <div className={"col-md-12  "}>

                        {activities && activities.map((activity, index) => {
                            if(activity.type === "COMMENT") {
                                return this.renderCommentFeed(index, activity)
                            } else  if(activity.type === "REPLY") {
                                return <h1/>
                            } else {
                                return <h1>Falta implementarlo</h1>
                            }
                        })}

                </div>
            </div>
        </Segment>
    }
}


const mapStateToProps = (state) => ({
    hasToken: state.auth.hasToken,
    userId: state.auth.userId,
    userName: state.auth.userName,
    activities: state.activity.activities
});

const mapDispatchToProps = (dispatch) => bindActionCreators({fetchActivity}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(translate("translations")(UserActivity));
