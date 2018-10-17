import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {openAuthModal} from "../../actions/authAction"
import {Header, Segment, Divider} from "semantic-ui-react";

class Welcome extends Component {

    render() {
        return <div
            className={'row justify-content-md-center justify-content-lg-center justify-content-sm-center'}>
            <div className={'col-md-6'}>
                <Segment>

                    <div className={"row"}>
                        <div className={"col-md-12 text-center"}>
                            <Header as='h2'>Bienvenido a Germano</Header>
                        </div>
                    </div>

                    <div className={"row mt-16"}>
                        <div className={"col-md-12 "}>
                            <p id="welcome">
                                Practica aleman creando oraciones y compartiendolas con tus amigos para recibir correcciones.
                                <a href={"javascript:void(0)"} onClick={() => this.props.openAuthModal(true)}> Logueate</a> o
                                <a href={"javascript:void(0)"} onClick={() => this.props.openAuthModal(false)}> crea una cuenta</a>, es gratis!
                            </p>
                        </div>
                    </div>

                    <Divider horizontal>O</Divider>


                </Segment>
            </div>

            <style jsx>{`

                  #welcome {
                    line-height:25px;
                  }


                `}</style>

        </div>
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    openAuthModal
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
