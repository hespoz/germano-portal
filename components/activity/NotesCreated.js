import React, {Component} from "react";
import {Segment, List, Header} from "semantic-ui-react";
import moment from "moment"
import {translate} from "react-i18next";

class NotesCreated extends Component {

    render() {

        const {lastBuckets, t} = this.props

        console.log(lastBuckets)
        return <Segment>

            <div className={"row"}>
                <div className={"col-md-12 text-center"}>
                    <Header as='h2'>{t("last.notes.created.title")}</Header>
                </div>
            </div>

            <div className={"row mt-16 justify-content-center"}>
            <div className={"col-md-8  "}>
                <List divided relaxed>
                    {lastBuckets.map((bucket, index) => {
                        return <List.Item key={index}>
                            <List.Icon name='sticky note outline' size='large' verticalAlign='middle' />
                            <List.Content>
                                <List.Header as='a' href={`/bucket/${bucket._id}`}>{bucket.name}</List.Header>
                                <List.Description as='a'>{t("created.at")} {moment(bucket.time).lang("es").format('MMMM DD YYYY')} {t("created.by")} <b>{bucket.ownerName}</b></List.Description>
                            </List.Content>
                        </List.Item>
                    })}
                </List>
            </div>
        </div>
        </Segment>
    }
}

export default translate("translations")(NotesCreated);
