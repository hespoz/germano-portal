import React, {Component} from 'react'
import {Header, List, Message, Icon} from 'semantic-ui-react'
import WordAdded from '../WordAdded'
import ScrollContainer from '../ScrollContainer'
import Sentence from '../bucket/Sentence'
import BucketName from '../bucket/BucketName'
import WordDescription from '../WordDescription'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class Bucket extends Component {

    state = {
        showWordDetails: false,
        selectedWord: null
    }

    showSelected = (selectedWord) => {
        this.setState({
            showWordDetails: true,
            selectedWord
        })
    }

    hideSelected = () => {
        this.setState({
            showWordDetails: false,
            selectedWord: null
        })
    }

    renderSentences = (bucket) => {
        if (!bucket.sentences || bucket.sentences.length === 0) return <Message color='yellow'>There are not
            sentences</Message>
        return <div>
            <Header as='h2'>Sentences</Header>
            <List>
                {bucket.sentences.map((sentence, index) => {
                    return <List.Item>
                        <Sentence index={index} bucket={bucket} sentence={sentence} editMode/>
                    </List.Item>
                })}
            </List>
        </div>
    }

    renderWordsAdded = (words, bucket) => {

        if (this.state.showWordDetails) {
            return <div>
                <div className={"row mb"}>
                    <div className={"col-md-12 "}>
                        <Icon size='large' name='close' onClick={this.hideSelected}/>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-md-12"}>
                        <WordDescription wordItem={this.state.selectedWord}/>
                    </div>
                </div>
                <style jsx>{`

                  .mb {
                    margin-bottom:6px;
                  }

                `}</style>
            </div>

        } else {
            return <ScrollContainer size={'100%'}>
                <List>
                    {words.map((word) => {
                        return <List.Item>
                            <WordAdded word={word} bucket={bucket}
                                       writePermission={bucket.ownerId === this.props.userId}
                                       showSelected={this.showSelected}/>
                        </List.Item>
                    })}
                </List>
            </ScrollContainer>
        }


    }

    render() {

        const {bucket, userId} = this.props

        return <div className={"row"}>
            <div className={"col-md-8"}>

                {bucket.ownerId === userId ?
                    <BucketName bucket={bucket}/>
                    :
                    null
                }


                <Sentence bucket={bucket} writePermission={bucket.ownerId === userId}/>

                {this.renderSentences(bucket)}

            </div>
            <div className={"col-md-4"}>
                {bucket.words && bucket.words.length > 0 ? this.renderWordsAdded(bucket.words, bucket) :
                    <Message color='yellow'>Search words in the search area and add to this bucket</Message>}
            </div>



        </div>

    }

}

const mapStateToProps = (state) => ({
    hasToken: state.auth.hasToken,
    userId: state.auth.userId
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Bucket);
