import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import { Segment, Divider, Icon} from 'semantic-ui-react'
import {saveBucket} from "../actions/bucketAction"
import {map, filter} from "lodash"

class WordAdded extends Component {

    renderWordByType = (word) => {
        if (word.type === "verb") {
            return `${word.word} - ${word.perfect}`
        } else {
            return `${word.article} ${word.word} - plural: die ${word.plural}`
        }
    }


    onRemove = (id) => {
        let wordsIds = filter(map(this.props.bucket.words, (value) => String(value._id)), (wordId) => wordId !== id)
        this.props.saveBucket({
            _id: this.props.bucket._id,
            wordsIds
        })
    }

    render() {

        const {writePermission} = this.props

        return (
            <Segment>

                <div className={"row"}>
                    <div className={"col-md-12"}>
                        <div id={'container'}>

                            <div id={"description"}>
                                {this.renderWordByType(this.props.word)}
                            </div>

                            {writePermission ?
                                <div id={"btn"}>
                                    <Icon name='trash alternate' onClick={() => this.onRemove(this.props.word._id)}/>
                                </div>
                                :
                                null
                            }

                            <style jsx>{`

                              #container {
                                display: flex;
                                cursor:pointer;
                                align-items: center;
                                justify-content: center;
                                min-height:44px;
                              }

                              #description {
                                width:94%;
                                padding: 3px;
                                text-align: center;
                                height: auto;
                                min-height: 10px;
                                word-wrap: break-word;
                              }

                              #btn {
                                display:flex;
                                flex-direction:column;
                                align-items: center;
                                justify-content: center;
                                padding: 3px;
                              }



                            `}</style>

                        </div>
                    </div>
                </div>

                <Divider />

                <div className={"row"}>
                    <div className={"col-md-12 text-center"}>
                        <a href={"javascript:void(0);"}
                           onClick={() => this.props.showSelected(this.props.word)}>Ver detalles de esta palabra</a>
                    </div>
                </div>

            </Segment>
        )
    }

}

const mapStateToProps = (state) => ({
    buckets: state.buckets.buckets,
    fetchBucketsError: state.buckets.fetchBucketsError
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    saveBucket
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(WordAdded);
