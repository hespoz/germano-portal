import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import {Button, Form, Icon, Card} from 'semantic-ui-react'
import {addComment, editComment, deleteComment} from '../../actions/bucketAction'
import {openAuthModal} from '../../actions/authAction'

class MakeComment extends Component {

    state = {
        commentId: this.props.comment ? this.props.comment._id : null,
        comment: this.props.comment ? this.props.comment.comment : '',
        showForm: this.props.comment ? false : true
    }

    componentWillReceiveProps = (props) => {
        this.setState({
            commentId: props.comment ? props.comment._id : null,
            comment: props.comment ? props.comment.comment : '',
            showForm: props.comment ? false : true
        })
    }

    handleChange = (e, {name, value}) => this.setState({[name]: value})

    onSubmit = () => {
        if (this.state.commentId) {
            //call update
            this.props.editComment({
                sentenceId: this.props.sentenceId,
                commentId: this.state.commentId,
                comment: this.state.comment
            })
        } else {
            //call add
            this.props.addComment({id: this.props.sentenceId, comment: this.state.comment})
        }
    }

    renderRemoveComment = (sentenceId, commentId) => {
        return <div className={"row"}>
            <div className={"col-md-12 text-right"}>
                <Icon size='large' name='trash alternate'
                      onClick={() => this.props.deleteComment({sentenceId, commentId})}/>
            </div>
        </div>
    }

    render() {

        const {hasToken, userId, sentenceId} = this.props
        const {comment, commentId, showForm} = this.state

        if (!showForm) {
            console.log(userId, this.props.comment.authorId)
            return <div>

                {hasToken && userId === this.props.comment.authorId ? this.renderRemoveComment(sentenceId, commentId) : null}

                <div className={"row"}>
                    <div className={"col-md-12"}>
                        <Card fluid>

                            <Card.Header>{this.props.comment.authorName}</Card.Header>
                            <Card.Description>
                                {comment}
                            </Card.Description>

                            {hasToken && userId === this.props.comment.authorId ?

                                <Card.Content extra>
                                    <Button basic color='green' onClick={() => this.setState({showForm:true})}>
                                        Edit
                                    </Button>
                                </Card.Content>
                                :
                                null

                            }



                        </Card>
                    </div>
                </div>

            </div>
        }

        return <div>

            {commentId ?
                this.renderRemoveComment(sentenceId, commentId)
                :
                null
            }


            <div className={"row"}>
                <div className={"col-md-12"}>
                    <Form onSubmit={this.onSubmit}>

                        <Form.TextArea
                            placeholder='Comment'
                            name='comment'
                            value={comment}
                            onChange={this.handleChange}
                            disabled={!hasToken}
                        />

                        {hasToken ? <Button type='submit'>Comment</Button> :
                            <a href={"javascript:void(0)"} onClick={this.props.openAuthModal}>Login or register</a>}


                        {commentId ?
                            <Button type='button' onClick={() => this.setState({showForm:false})}>Cancel</Button>
                            :
                            null
                        }


                    </Form>
                </div>
            </div>


            <style jsx>{`

                  .mb {
                    margin-bottom:6px;
                  }

                `}</style>
        </div>
    }

}

const mapStateToProps = (state) => ({
    hasToken: state.auth.hasToken,
    userName: state.auth.userName,
    userId: state.auth.userId
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    addComment,
    editComment,
    deleteComment,
    openAuthModal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MakeComment);

