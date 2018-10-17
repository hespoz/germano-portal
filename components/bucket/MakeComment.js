import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import {Button, Form, Icon, Card, Header, Segment} from 'semantic-ui-react'
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
            this.setState({
                comment: ''
            })
        }
    }

    renderComment = () => {

        const {hasToken, userId, sentenceId} = this.props
        const {comment, commentId} = this.state

        console.log(this.props.comment)
        return <Segment>

            {hasToken && userId === this.props.comment.authorId ?
                <div id="comment-actions">
                    <Icon name='edit' onClick={() => this.setState({showForm: true})}/>
                    <Icon name='trash alternate' onClick={() => this.props.deleteComment({sentenceId, commentId})}/>
                </div>
                :
                null
            }

            <div className={"row"}>
                <div className={"col-md-12"}>
                        <Header as='h5'>{this.props.comment.authorName}</Header>
                        {comment}
                </div>
            </div>

            <style jsx>{`

                  #comment-actions {
                    position: absolute;
                    top: 8%;
                    left: 94%;
                    z-index:100;
                  }

            `}</style>


        </Segment>
    }

    render() {

        const {hasToken, index} = this.props
        const {comment, commentId, showForm} = this.state

        if (!showForm) {
            return this.renderComment()
        }

        return <div>


            <div key={index} className={"row"}>
                <div className={"col-md-12"}>
                    <Form onSubmit={this.onSubmit}>

                        <div className={"row"}>
                            <div className={"col-md-12"}>
                                <Form.TextArea
                                    placeholder='Comment'
                                    name='comment'
                                    value={comment}
                                    onChange={this.handleChange}
                                    disabled={!hasToken}
                                />
                            </div>
                        </div>

                        <div className={"row mt-8"}>
                            <div className={"col-md-12 text-right"}>

                                {hasToken ? <Button basic color='blue' type='submit'>Comentar</Button> :
                                    <a href={"javascript:void(0)"} onClick={this.props.openAuthModal}>Login or registrarse</a>}

                                {commentId ?
                                    <Button basic color='red' type='button' onClick={() => this.setState({showForm: false})}>Cancelar</Button>
                                    :
                                    null
                                }
                            </div>
                        </div>

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

