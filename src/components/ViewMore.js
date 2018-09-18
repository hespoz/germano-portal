import React, {Component} from "react";

import './ViewMore.scss'

class ViewMore extends Component {

    state = {
        height: '1px'
    }

    componentDidMount = () => {
        this.setState({height: this.props.initialHeight})
    }

    render() {

        const { height } = this.state
        const { initialHeight, children } = this.props

        return <div>
            <div id="viewer" style={{height: `${height}`}}>
                {children}
            </div>
            <div id={"toggle"} >
                {height !== 'auto' ?
                    <a href={"javascript:void(0)"} onClick={() => this.setState({height: 'auto'})}>view more</a>
                    :
                    <a href={"javascript:void(0)"} onClick={() => this.setState({height: initialHeight})}>hide</a>
                }

            </div>



        </div>
    }
}

export default ViewMore
