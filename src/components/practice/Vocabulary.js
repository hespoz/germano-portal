import React, { Component } from 'react';
import Noun from "./Noun";
import Verb from "./Verb";

class Vocabulary extends Component {

    render() {
        return (
            <div>
                <Noun/>
                <Verb/>
            </div>
        );
    }
}

export default Vocabulary;
