import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from 'redux'
import {Button} from 'semantic-ui-react'
import {saveBucket} from "../actions/bucketAction"
import {map, filter} from "lodash"

class WordAdded extends Component {

    renderWordByType = (word) => {
        if(word.type === "verb") {
            return `${word.word} - ${word.perfect}`
        } else {
            return `${word.article} ${word.word} - plural: die ${word.plural}`
        }
    }


    onRemove = (id) => {
        let wordsIds = filter(map(this.props.bucket.words, (value) => String(value._id)), (wordId) => wordId !== id)
        this.props.saveBucket({
            _id:this.props.bucket._id,
            wordsIds
        })
    }

    render() {

        const { writePermission } = this.props

        return (
            <div id={'container'}>

                <div id={"description"}>
                    {this.renderWordByType(this.props.word)}
                </div>

                {writePermission ?
                    <div id={"btn"}>
                        <Button circular icon='remove' onClick={() => this.onRemove(this.props.word._id)}/>
                    </div>
                    :
                    null
                }

                <a href={"javascript:void(0);"} onClick={() => this.props.showSelected(this.props.word)}>Details</a>

                <style jsx>{`

                  #container {
                    display: flex;
                    border:1px solid grey;
                    border-radius:3px;
                    cursor:pointer;
                    align-items: center;
                    justify-content: center;
                    min-height:44px;
                  }

                  #description {
                    width:80%;
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
                    width:20%;
                    padding: 3px;
                  }



                `}</style>

            </div>
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
