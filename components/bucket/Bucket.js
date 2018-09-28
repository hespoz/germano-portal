import React, {Component} from 'react'
import { Header, List } from 'semantic-ui-react'
import WordAdded from '../WordAdded'
import ScrollContainer from '../ScrollContainer'
import Sentence from '../bucket/Sentence'
import BucketName from '../bucket/BucketName'


class Bucket extends Component {

    renderSentences = (bucket) => {
        return <List>
            {bucket.sentences.map((sentence, index) => {
                return <List.Item>
                    <Sentence index={index} bucket={bucket} sentence={sentence} editMode/>
                </List.Item>
            })}
        </List>
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

                <Header as='h2'>Sentences</Header>

                {this.renderSentences(bucket)}

            </div>
            <div className={"col-md-4"}>
                {this.renderWordsAdded(bucket.words, bucket)}
            </div>
        </div>

    }

}

export default Bucket