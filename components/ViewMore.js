import React, {Component} from "react";

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
            <div id="viewer">
                {children}
            </div>
            <div id={"toggle"}>
                {height !== 'auto' ?
                    <a href={"javascript:void(0)"} onClick={() => this.setState({height: 'auto'})}>view more</a>
                    :
                    <a href={"javascript:void(0)"} onClick={() => this.setState({height: initialHeight})}>hide</a>
                }

            </div>


            <style jsx>{`

                  #toggle {
                    display:flex;
                    justify-content:center;
                  }

                  #viewer {
                    overflow: hidden;
                    height: ${height};
                    padding:7px;
                  }

                `}</style>


        </div>
    }
}

export default ViewMore
