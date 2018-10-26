import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {Menu, Image, Message, Dropdown} from 'semantic-ui-react'
import Link from 'next/link';
import AuthModal from './auth/AuthModal'
import NewWordModal from "./add_word/WordModal";
import AddBucket from './bucket/AddBucket'
import {openAuthModal, closeAuthModal, logOut, verificationStatus, resendVerificationEmail} from "../actions/authAction";
import {closeWordFormModal} from "../actions/dictionaryAction";
import {fetchUserInfo} from "../actions/userAction";
import Cookies from "js-cookie"


class Layout extends Component {

    state = {
        logged: null
    }

    componentDidMount = () => {

        if (Cookies.get("token")) {
            this.props.fetchUserInfo()
        }

        this.props.verificationStatus()
    }

    closeDialog = () => this.props.closeWordFormModal()

    render() {

        const {openModal, hasToken, userName, wordFormModalOpen, verified, resendedEmail} = this.props;

        return (
            <div className={'container'}>

                <AddBucket/>
                <AuthModal open={openModal} onClose={() => this.props.closeAuthModal()}/>
                <NewWordModal open={wordFormModalOpen} onClose={this.closeDialog}/>

                <div className={'row'}>
                    <div className={'col-12 col-md-12 col-lg-12'}>
                        <Menu fluid pointing secondary>

                            <Menu.Menu position='left'>

                                <Menu.Item>
                                    <Image className="img-fluid" src='/static/images/logo.png' size='small'/>
                                </Menu.Item>

                            </Menu.Menu>

                            <Menu.Menu position='right'>

                                <Link as={`/`} href={`/`}>
                                    <Menu.Item>
                                        Inicio
                                    </Menu.Item>
                                </Link>


                                {hasToken ?
                                    <Link as={`/notes/${userName}`} href={`/notes/${userName}`}>
                                        <Menu.Item>
                                            Mis notas
                                        </Menu.Item>
                                    </Link>
                                    :
                                    null
                                }

                                {hasToken ?


                                    <Dropdown item text={`Bienvenido, ${userName}`}>
                                        <Dropdown.Menu>
                                            <Link as={`/profile`} href={`/profile`}>
                                            <Dropdown.Item>Profile</Dropdown.Item>
                                            </Link>
                                            <Dropdown.Item onClick={() => {
                                                this.props.logOut()
                                            }}>Log out</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>

                                    :
                                    <Menu.Item onClick={() => {
                                        this.props.openAuthModal(true)
                                    }}>
                                        Sign In
                                    </Menu.Item>
                                }

                            </Menu.Menu>
                        </Menu>
                    </div>
                </div>

                {resendedEmail ?
                    <Message positive>
                        <Message.Header>Email enviado</Message.Header>
                    </Message>
                    :
                    null
                }

                {!verified ?
                    <Message error>
                        <Message.Header>Tienes que verificar tu cuenta para poder usar la aplicacion, te enviamos un email con las instrucciones. <a href={"javascript:void(0)"} onClick={this.props.resendVerificationEmail}>Reenviar</a></Message.Header>
                    </Message>
                    :
                    null
                }


                <div className={'row '}>
                    <div className={'col-12 content-page'}>
                        {this.props.children}
                    </div>
                </div>

                <style jsx>{`

                  .content-page {
                    padding-top:8px;
                  }


                `}</style>

            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    openModal: state.auth.openModal,
    hasToken: state.auth.hasToken,
    userName: state.auth.userName,
    verified:state.auth.verified,
    resendedEmail: state.auth.resendedEmail,
    wordFormModalOpen: state.dictionary.wordFormModalOpen
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    openAuthModal, closeAuthModal, logOut, closeWordFormModal, verificationStatus, resendVerificationEmail, fetchUserInfo
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Layout);
