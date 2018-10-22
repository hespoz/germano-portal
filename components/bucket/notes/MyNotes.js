import React, {Component} from 'react'
import {Accordion, Icon, Segment, Message} from "semantic-ui-react";
import {get} from "lodash";
import Link from "next/link";
import Bucket from "../Bucket";
import EmptyNotes from "./EmptyNotes";

class MyNotes extends Component {

    state = {
        activeIndex: 0
    }

    handleClick = (index) => {
        const {activeIndex} = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({activeIndex: newIndex})
    }

    renderNotes = () => {
        console.log(this.props.urlUserName, this.props.userName )
        if (this.props.urlUserName === this.props.userName && !this.props.verified) {
            return this.renderWarning()
        } else {
            return this.renderNotesEditor()
        }
    }

    renderWarning = () => {
        return <div
            className={'row justify-content-md-center justify-content-lg-center justify-content-sm-center content-pos'}>
            <div className={'col-md-12'}>
                <Message warning>Necesitas validar tu cuenta para añadir elemento</Message>
            </div>
        </div>
    }

    renderNotesEditor = () => {
        const {activeIndex} = this.state
        const {buckets, userName, urlUserName, verified} = this.props


        if(buckets.length === 0 ) {

            return <EmptyNotes
                userName={userName}
                urlUserName={urlUserName}
                canWrite={this.props.userName === this.props.bucketOwnerName}
                openBucketModal={this.props.openBucketModal}/>

        } else {

            return <Accordion styled fluid>

                {buckets instanceof Array && buckets.map((bucket, index) => {
                    return <div>
                        <Accordion.Title active={activeIndex === index} index={index}>


                            <div className={"row "}>
                                <div className={"col-md-10"} onClick={(e) => this.handleClick(index)}>
                                    <Icon name='dropdown'/>{bucket.name}
                                </div>
                                <div className={"col-md-2 text-right"}>
                                    <a href={"javascript:void(0);"} style={{
                                        color: 'black',
                                        textDecoration: 'none',
                                        backgroundColor: 'none'
                                    }}>
                                        {bucket.ownerId === this.props.userId && verified ?
                                            <Icon size='large' name='trash alternate'
                                                  onClick={() => this.props.openDeleteBucketModal(bucket._id)}/> : null}

                                        <Link as={`/bucket/${bucket._id}`} href={`/bucket/${bucket._id}`}>
                                            <Icon size='large' name='share square'/>
                                        </Link>

                                    </a>
                                </div>
                            </div>


                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === index}>
                            <Bucket bucket={bucket} />
                        </Accordion.Content>
                    </div>
                })}

            </Accordion>

        }
    }

    render() {

        const {userName, verified} = this.props

        return <div
            className={'row justify-content-md-center justify-content-lg-center justify-content-sm-center content-pos'}>
            <div className={'col-md-12'}>

                <div className={'row mb-16'}>

                    <div className={'col-md-10'}>
                        <h3>Notas de {userName}</h3>
                    </div>

                    {this.props.userName === this.props.bucketOwnerName && verified ?
                        <div className={'col-md-2 text-right link'}>
                            <Icon size='large' name='add' onClick={() => this.props.openBucketModal(null)}/>
                            Nueva nota
                        </div>
                        :
                        null
                    }

                </div>


                {this.renderNotes()}

            </div>
        </div>
    }

}

export default MyNotes
