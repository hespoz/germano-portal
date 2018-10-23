import React, {Component} from 'react'


class ProfileItem extends Component {

    state = {
        showForm: false
    }

    toggle = () => {
        this.setState({showForm:!this.state.showForm})
    }

    render() {

        const {showForm} = this.state
        const {title, children} = this.props

        return (

            <div>

                {!showForm ?

                    <div id={"profile-item"}>
                        <div id={"title"}>
                            {title}
                        </div>

                        <div id={"edit"}>
                            <a href={"javascript:void(0)"} onClick={this.toggle}>Editar</a>
                        </div>
                    </div>

                    :

                    <div id={"form-item"}>
                        <div id={"close"}><a href={"javascript:void(0)"} onClick={this.toggle}>Close</a></div>
                        <div id={"form"}>{React.cloneElement(children, {toggle: this.toggle})}</div>
                    </div>

                }



                <style jsx>{`

                  #profile-item {
                    display:flex;
                    width:100%;
                    border: 1px solid;
                    padding: 27px;
                  }

                  #title {
                    width:95%
                  }

                  #form-item {
                    display:flex;
                    flex-direction:column;
                    width:100%;
                    border: 1px solid;
                  }

                  #close {
                    margin-left: 91%;
                  }

                  #form {
                    padding: 27px;
                  }


                `}</style>

            </div>

        )
    }

}


export default ProfileItem;
