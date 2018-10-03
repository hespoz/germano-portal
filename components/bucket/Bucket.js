import React, {Component} from 'react'
import {Header, List, Message} from 'semantic-ui-react'
import WordAdded from '../WordAdded'
import ScrollContainer from '../ScrollContainer'
import Sentence from '../bucket/Sentence'
import BucketName from '../bucket/BucketName'

class Bucket extends Component {

    renderSentences = (bucket) => {
        if (!bucket.sentences || bucket.sentences.length === 0) return <Message color='yellow'>There are not sentences</Message>
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
        return <ScrollContainer size={'100%'}>
            <List>
                {words.map((word) => {
                    return <List.Item>
                        <WordAdded word={word} bucket={bucket}/>
                    </List.Item>
                })}
            </List>
        </ScrollContainer>
    }

    render() {

        const {bucket} = this.props

        return <div className={"row"}>
            <div className={"col-md-8"}>

                <BucketName bucket={bucket}/>

                <Sentence bucket={bucket}/>

                {this.renderSentences(bucket)}

            </div>
            <div className={"col-md-4"}>
                {bucket.words && bucket.words.length > 0 ? this.renderWordsAdded(bucket.words, bucket) :
                    <Message color='yellow'>Search words in the search area and add to this bucket</Message>}
            </div>
        </div>

    }

}

export default Bucket
