import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {openAuthModal} from "../../actions/authAction"
import {Header, Segment, Divider, List} from "semantic-ui-react";
import moment from "moment"

class Welcome extends Component {


    render() {

        const {lastBuckets} = this.props

        return <div
            className={'row justify-content-md-center justify-content-lg-center justify-content-sm-center'}>
            <div className={'col-12 col-sm-12 col-md-10 col-lg-8 col-xl-8'}>
                <Segment>

                    <div className={"row"}>
                        <div className={"col-md-12 text-center"}>
                            <Header as='h2'>Bienvenido a Germano</Header>
                        </div>
                    </div>

                    <div className={"row mt-16"}>
                        <div className={"col-md-12 "}>
                            <p id="welcome">
                                Practica aleman creando oraciones y compartiendolas con tus amigos para recibir
                                correcciones.
                                <a href={"javascript:void(0)"}
                                   onClick={() => this.props.openAuthModal(true)}> Logueate</a> o
                                <a href={"javascript:void(0)"} onClick={() => this.props.openAuthModal(false)}> crea una
                                    cuenta</a>, es gratis!
                            </p>
                        </div>
                    </div>

                    <Divider horizontal>O</Divider>


                    <div className={"row"}>
                        <div className={"col-md-12 text-center"}>
                            <Header as='h2'>Explora las notas de otros usuarios</Header>
                        </div>
                    </div>

                    <div className={"row mt-16 justify-content-center"}>
                        <div className={"col-md-8  "}>
                            <List divided relaxed>
                                {lastBuckets.map((bucket, index) => {
                                    return <List.Item key={index}>
                                        <List.Icon name='sticky note outline' size='large' verticalAlign='middle' />
                                        <List.Content>
                                            <List.Header as='a' href={`/bucket/${bucket._id}`}>{bucket.name}</List.Header>
                                            <List.Description as='a'>Creado en {moment().lang("es").format('MMMM DD YYYY')} por <b>{bucket.ownerName}</b></List.Description>
                                        </List.Content>
                                    </List.Item>
                                })}
                            </List>
                        </div>
                    </div>

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
