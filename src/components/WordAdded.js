import React, {Component} from "react";
import {Button} from 'semantic-ui-react'

class WordAdded extends Component {

    render() {

        return (
            <div id={'container'}>
                <div id={"description"}>
                    {`${this.props.article} ${this.props.word}`}
                </div>
                <div id={"btn"}>
                    <Button circular icon='remove' />
                </div>

                <style jsx>{`

                  #container {
                    display: flex;
                    border:1px solid grey;
                    border-radius:3px;
                    cursor:pointer;
                    align-items: center;
                    justify-content: center;
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

export default WordAdded;