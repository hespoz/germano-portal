import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Form} from 'semantic-ui-react'
import {searchByExactKeyword} from '../../actions/dictionaryAction'

class GermanWordField extends Component {


    onBlur = () => {
        this.searchWord(this.props.word)
    }

    onKeyPress = (event) => {
        if (event.key == 'Enter') {
            this.searchWord(this.props.word)
        }
    }

    searchWord = () => {
        if (this.props.word !== '') {
            this.props.searchByExactKeyword(this.props.word)
        }
    }

    render() {

        const { word } = this.props

        return <Form>
            <Form.Field>
                <label>New word</label>
                <Form.Input
                    size='small'
                    placeholder='New word...'
                    fluid
                    onChange={this.props.onChange}
                    onKeyPress={this.onKeyPress}
                    onBlur={this.onBlur}
                    value={word}/>
            </Form.Field>
        </Form>
    }
}

const mapStateToProps = (state) => ({
    editIdWord: state.dictionary.editIdWord
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    searchByExactKeyword
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(GermanWordField);
