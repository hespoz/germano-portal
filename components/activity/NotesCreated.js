import React, {Component} from "react";
import {Segment, List, Header} from "semantic-ui-react";
import moment from "moment"

class NotesCreated extends Component {

    render() {

        const {lastBuckets} = this.props

        return <Segment>

            <div className={"row"}>
                <div className={"col-md-12 text-center"}>
                    <Header as='h2'>Ultimas notas creadas por los usuarios</Header>
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
                                <List.Description as='a'>Creado en {moment().lang("es").format('MMMM DD YYYY')} por <b>{bucket.ownerName}</b></List.Description>
                            </List.Content>
                        </List.Item>
                    })}
                </List>
            </div>
        </div>
        </Segment>
    }
}

export default NotesCreated;
